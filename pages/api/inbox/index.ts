import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createConversation,
  createMessage,
  getConversationByUserIdBookId,
} from '../../../database/conversations';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

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

    const { sellerId, buyerId, bookId, messageBody } = req.body;

    /* Checking if the conversation exists. */
    const checkConversationExists = await getConversationByUserIdBookId(
      user.id,
      bookId,
    );

    /* Checking if the conversation exists. If it does, it creates a message. */

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (checkConversationExists !== undefined) {
      const message = await createMessage(
        checkConversationExists.id,
        user.id,
        messageBody,
      );

      if (!message.id) {
        res.status(400).json({ errors: [{ message: 'Message not created' }] });
        return;
      }
      return res
        .status(200)
        .json({ conversation: checkConversationExists, message: message });
    }

    /* Creating a conversation between two users and inserting a new message. */
    const conversation = await createConversation(sellerId, buyerId, bookId);

    if (!conversation.id) {
      res
        .status(400)
        .json({ errors: [{ message: 'Conversation not created' }] });
      return;
    }

    const message = await createMessage(conversation.id, user.id, messageBody);

    if (!message.id) {
      res.status(400).json({ errors: [{ message: 'Message not created' }] });
      return;
    }
    res.status(200).json({ conversation: conversation, message: message });
  } else {
    res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
