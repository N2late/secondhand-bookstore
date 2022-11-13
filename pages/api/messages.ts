import type { NextApiRequest, NextApiResponse } from 'next';
import { createMessage } from '../../database/messages';
import { getValidSessionByToken } from '../../database/sessions';
import { getUserBySessionToken } from '../../database/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const session = await getValidSessionByToken(req.cookies.sessionToken);
    if (!session) {
      res.status(400).json({ errors: [{ message: 'Session is invalid' }] });
      return;
    }

    const user = await getUserBySessionToken(session.token);

    if (!user) {
      res
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    const message = await createMessage(
      req.body.bookId,
      user.id,
      req.body.recipientId,
      req.body.messageBody,
    );
    if (!message.id) {
      res.status(400).json({ errors: [{ message: 'Message not created' }] });
      return;
    }
    res.status(200).json({ message });
  } else {
    res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
