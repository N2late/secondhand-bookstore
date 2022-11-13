import { Message } from '../types/messages';
import { sql } from './connect';

export async function createMessage(
  bookId: number,
  senderId: number,
  recipientId: number,
  messageBody: string,
) {
  const [message] = await sql<Message[]>`
  INSERT INTO messages (book_id, sender_id, recipient_id, message_body) VALUES (${bookId}, ${senderId}, ${recipientId}, ${messageBody}) RETURNING *
`;
  return message;
}
