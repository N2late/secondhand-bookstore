import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  deleteUser,
  getUserBySessionToken,
  updateUser,
} from '../../../database/users';
import { validateTokenFromSecret } from '../../../utilis/csrf';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getValidSessionByToken(req.cookies.sessionToken);
  if (!session) {
    res.status(400).json({ errors: [{ message: 'Session is invalid' }] });
    return;
  }

  if (req.method === 'GET') {
    const user = await getUserBySessionToken(session.token);

    if (_.size(user) === 0) {
      res
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    res.status(200).json({ user: user });
  } else if (req.method === 'PUT') {
    const { csrfToken } = req.body;

    /* This is checking if the user has passed a CSRF token. If they have not, it will return an error. */

    if (!csrfToken) {
      return res.status(400).json({
        errors: [{ message: 'CSRF token is required' }],
      });
    }

    /* This is checking if the user has passed a valid CSRF token. If they have not, it will return an error. */
    try {
      validateTokenFromSecret(session.csrfSecret, csrfToken);
    } catch (error) {
      return res.status(400).json({
        errors: [{ message: 'Invalid CSRF token' }],
      });
    }

    const user = await getUserBySessionToken(session.token);

    if (!user) {
      res.status(400).json({ errors: [{ message: 'Session not valid' }] });
      return;
    }

    if (
      typeof req.body.email !== 'string' ||
      typeof req.body.username !== 'string' ||
      !req.body.email ||
      !req.body.username
    ) {
      res.status(400).json({
        errors: [{ message: 'Username and email are required' }],
      });
      return;
    }

    const updatedUserInfo = await updateUser(
      user.id,
      req.body.email,
      req.body.username,
      req.body.imgPath,
    );

    if (_.size(updatedUserInfo) === 0) {
      res.status(400).json({ errors: [{ message: 'User not updated' }] });
      return;
    }

    return res.status(200).json({ user: updatedUserInfo });
  } else if (req.method === 'DELETE') {
    const { csrfToken } = req.body;

    /* This is checking if the user has passed a CSRF token. If they have not, it will return an error. */

    if (!csrfToken) {
      return res.status(400).json({
        errors: [{ message: 'CSRF token is required' }],
      });
    }

    /* This is checking if the user has passed a valid CSRF token. If they have not, it will return an error. */
    try {
      validateTokenFromSecret(session.csrfSecret, csrfToken);
    } catch (error) {
      return res.status(400).json({
        errors: [{ message: 'Invalid CSRF token' }],
      });
    }

    const user = await getUserBySessionToken(session.token);

    if (!user) {
      res.status(400).json({ errors: [{ message: 'Session not valid' }] });
      return;
    }

    const deletedUser = await deleteUser(user.id);

    if (_.size(deletedUser) === 0) {
      res.status(400).json({ errors: [{ message: 'User not deleted' }] });
      return;
    }

    res.status(200).json({
      user: {
        username: deletedUser.username,
      },
    });
  } else {
    return res
      .status(405)
      .json({ errors: [{ message: 'Method not allowed' }] });
  }
}
