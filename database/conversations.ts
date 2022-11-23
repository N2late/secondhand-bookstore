import {
  Conversation,
  ConversationInboxInfo,
  Correspondent,
  Message,
} from '../types/conversations';
import { sql } from './connect';

export async function createConversation(
  sellerId: number,
  buyerId: number,
  bookId: number,
) {
  const [conversation] = await sql<Conversation[]>`
    INSERT INTO conversations (seller_id, buyer_id, book_id)
    VALUES (${sellerId}, ${buyerId}, ${bookId})
    RETURNING *
  `;
  return conversation;
}

export async function createMessage(
  conversationId: number,
  userId: number,
  messageBody: string,
) {
  const [message] = await sql<Message[]>`
    INSERT INTO messages (conversation_id, sender_id, message_body)
    VALUES (${conversationId}, ${userId}, ${messageBody})
    RETURNING *
  `;
  return message;
}

export async function getConversationByUserIdBookId(
  userId: number,
  bookId: number,
) {
  const [conversation] = await sql<Conversation[]>`
    SELECT * FROM conversations
    WHERE  buyer_id = ${userId}
    AND book_id = ${bookId}
  `;
  return conversation;
}

export async function getConversationByConversationIdAndUserId(
  conversationId: number,
  userId: number,
) {
  const [conversation] = await sql<Conversation[]>`
    SELECT * FROM conversations
    WHERE id = ${conversationId}
    AND buyer_id = ${userId} OR seller_id = ${userId}
  `;
  return conversation;
}

export async function getConversationsByUserId(userId: number) {
  const conversations = await sql<Conversation[]>`
    SELECT * FROM conversations
    WHERE seller_id = ${userId} OR buyer_id = ${userId}
  `;
  return conversations;
}

export async function getBuyerConversationsWithUserImgPathUsernameBookTitleLastMessageTimeByConversationId(
  conversationId: number,
) {
  const [conversation] = await sql<ConversationInboxInfo[]>`
    SELECT
      conversations.id,
      conversations.seller_id,
      conversations.buyer_id,
      conversations.book_id,
      users.img_path,
      users.username,
      books.title as book_title,
      messages.created_at
    FROM conversations
    INNER JOIN users ON users.id = conversations.seller_id
    INNER JOIN books ON books.id = conversations.book_id
    INNER JOIN messages ON messages.conversation_id = conversations.id
    WHERE conversations.id = ${conversationId}
    ORDER BY messages.created_at DESC
    LIMIT 1
  `;
  return conversation;
}

export async function getConversationsWithUserImgPathUsernameBookTitleLastMessageTimeByConversationId(
  conversationId: number,
) {
  const [conversation] = await sql<ConversationInboxInfo[]>`
    SELECT
      conversations.id,
      conversations.seller_id,
      conversations.buyer_id,
      conversations.book_id,
      users.img_path,
      users.username,
      books.title as book_title,
      messages.created_at
    FROM conversations
    INNER JOIN users ON users.id = conversations.buyer_id
    INNER JOIN books ON books.id = conversations.book_id
    INNER JOIN messages ON messages.conversation_id = conversations.id
    WHERE conversations.id = ${conversationId}
    ORDER BY messages.created_at DESC
    LIMIT 1
  `;
  return conversation;
}

export async function getConversationByConversationId(conversationId: number) {
  const [conversation] = await sql<Conversation[]>`
    SELECT * FROM conversations
    WHERE id = ${conversationId}
  `;
  return conversation;
}

export async function getCorrespondentById(userId: number) {
  const [correspondent] = await sql<Correspondent[]>`
    SELECT id, username, img_path FROM users
    WHERE id = ${userId}
  `;
  return correspondent;
}

export async function getMessagesByConversationId(conversationId: number) {
  const messages = await sql<Message[]>`
    SELECT * FROM messages
    WHERE conversation_id = ${conversationId}
    ORDER BY created_at ASC
  `;
  return messages as Message[];
}

export async function deleteConversation(conversationId: number) {
  const deletedConversation = await sql`
    DELETE FROM conversations
    WHERE id = ${conversationId}
  `;
  return deletedConversation;
}
