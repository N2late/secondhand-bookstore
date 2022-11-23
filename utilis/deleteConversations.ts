import _ from 'lodash';
import {
  deleteConversation,
  getConversationByConversationIdAndUserId,
} from '../database/conversations';

export async function deleteConversations(
  conversationsIds: string[],
  userId: number,
) {
  const deletedConversations = await Promise.all(
    conversationsIds.map(async (conversationId) => {
      const conversation = await getConversationByConversationIdAndUserId(
        Number(conversationId),
        userId,
      );

      if (_.size(conversation) !== 0) {
        await deleteConversation(conversation.id);
        return conversation.id;
      } else {
        return { error: 'Conversation not found' };
      }
    }),
  );
  return deletedConversations;
}
