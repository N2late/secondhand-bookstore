import { ConversationInboxInfo, Message } from '../types/conversations';

export function conversationsWithTimeFormatted(
  conversations: ConversationInboxInfo[],
) {
  const today = new Date().toDateString();
  const conversationsResult = conversations.map((conversationInfo) => {
    return {
      id: conversationInfo.id,
      sellerId: conversationInfo.sellerId,
      buyerId: conversationInfo.buyerId,
      bookId: conversationInfo.bookId,
      imgPath: conversationInfo.imgPath,
      username: conversationInfo.username,
      bookTitle: conversationInfo.bookTitle,
      createdAt:
        new Date(
          Date.parse(conversationInfo.createdAt as string),
        ).toDateString() === today
          ? new Date(Date.parse(conversationInfo.createdAt as string))
              .toLocaleTimeString()
              .slice(0, 5)
          : new Date(Date.parse(conversationInfo.createdAt as string))
              .toDateString()
              .slice(3),
    };
  });
  return conversationsResult;
}

export function conversationHistoryWithTimeFormatted(
  conversationHistory: Message[],
) {
  const today = new Date().toDateString();
  const conversationHistoryResult = conversationHistory.map(
    (conversationHistoryInfo) => {
      return {
        id: conversationHistoryInfo.id,
        conversationId: conversationHistoryInfo.conversationId,
        senderId: conversationHistoryInfo.senderId,
        messageBody: conversationHistoryInfo.messageBody,
        isRead: conversationHistoryInfo.isRead,
        createdAt:
          new Date(
            Date.parse(conversationHistoryInfo.createdAt as string),
          ).toDateString() === today
            ? new Date(Date.parse(conversationHistoryInfo.createdAt as string))
                .toLocaleTimeString()
                .slice(0, 5)
            : new Date(Date.parse(conversationHistoryInfo.createdAt as string))
                .toDateString()
                .slice(3),
      };
    },
  );
  return conversationHistoryResult as Message[];
}
