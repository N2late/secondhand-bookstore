import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createMessage,
  getConversationByConversationId,
  getConversationByConversationIdAndUserId,
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

    const { conversationId, messageBody } = req.body;

    /* Checking if the conversation exists. */
    const checkConversationExists =
      await getConversationByConversationIdAndUserId(conversationId, user.id);

    if (_.size(checkConversationExists) === 0) {
      res.status(400).json({ errors: [{ message: 'Conversation not found' }] });
      return;
    }

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
  }
  return res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
}
