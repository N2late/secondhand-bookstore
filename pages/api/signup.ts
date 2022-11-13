import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { createUser, getUserByUserEmail } from '../../database/users';
import { createSerializedSignupTokenCookie } from '../../utilis/cookies';
import { createCsrfSecret } from '../../utilis/csrf';

export type SignupResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponseBody>,
) {
  const { username, password, email } = req.body;
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

    /* Checking if the password is less than 6 characters. */
    if (password.length < 6) {
      res.status(400).json({
        errors: [{ message: 'Password must be at least 6 characters' }],
      });
      return;
    }

    // we check if the user already exist
    const user = await getUserByUserEmail(email);

    if (user) {
      res.status(400).json({
        errors: [{ message: 'Email already exists' }],
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    /* Creating a user in the database. */
    const userWithoutPassword = await createUser(email, passwordHash, username);

    /* Creating a secret for the user. */
    const secret = await createCsrfSecret();

    /* Creating a session for the user with a token that will be used to serialize a cookie */
    const session = await createSession(
      userWithoutPassword.id,
      crypto.randomBytes(80).toString('base64'),
      secret,
    );

    /* Creating a cookie with the token. */
    const serialezedCookie = createSerializedSignupTokenCookie(session.token);

    res
      .status(200)
      .setHeader('Set-Cookie', serialezedCookie)
      .json({ user: { username: userWithoutPassword.username } });
  } else {
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
