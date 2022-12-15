import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { getUserWithPasswordHashByEmail } from '../../database/users';
import { createSerializedSignupTokenCookie } from '../../utilis/cookies';
import { createCsrfSecret, createTokenFromSecret } from '../../utilis/csrf';

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string; csrfToken: string | undefined } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseBody>,
) {
  const { email, password } = req.body;
  if (req.method === 'POST') {
    /* Checking if the username and password are strings and if they are not empty. */
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email ||
      !password
    ) {
      res.status(400).json({
        errors: [{ message: 'Username and password are required' }],
      });
      return;
    }

    /* Getting the user from the database. */
    const user = await getUserWithPasswordHashByEmail(email);

    if (!user) {
      res.status(400).json({
        errors: [{ message: 'Email does not exist' }],
      });
      return;
    }

    /* Comparing the password that the user entered with the password hash that is stored in the
    database. */
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      res.status(400).json({
        errors: [{ message: 'Password is incorrect' }],
      });
      return;
    }

    /* Creating a secret for the CSRF token. */
    const secret = await createCsrfSecret();

    /* Creating a session for the user. */
    const session = await createSession(
      user.id,
      crypto.randomBytes(80).toString('base64'),
      secret,
    );

    const csrfToken = createTokenFromSecret(secret);

    /* Creating a cookie with the session token. */
    const serialezedCookie = createSerializedSignupTokenCookie(session.token);

    res
      .status(200)
      .setHeader('Set-Cookie', serialezedCookie)
      .json({
        user: {
          username: user.username,
          csrfToken: csrfToken,
        },
      });
  } else {
    res.status(401).json({
      errors: [{ message: 'Method not allowed' }],
    });
  }
}
