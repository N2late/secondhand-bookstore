import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  deleteUser,
  getUserBySessionToken,
  updateUser,
} from '../../../database/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const session = await getValidSessionByToken(req.cookies.sessionToken);
    if (!session) {
      res.status(400).json({ errors: [{ message: 'Session is invalid' }] });
      return;
    }

    const user = await getUserBySessionToken(session.token);

    if (_.size(user) === 0) {
      res
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    res.status(200).json({ user: user });
  } else if (req.method === 'PUT') {
    const session = await getValidSessionByToken(req.cookies.sessionToken);
    if (!session) {
      res.status(400).json({ errors: [{ message: 'Session is invalid' }] });
      return;
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
    const session = await getValidSessionByToken(req.cookies.sessionToken);
    if (!session) {
      res.status(400).json({ errors: [{ message: 'Session is invalid' }] });
      return;
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
