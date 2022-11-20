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
          ? new Date(
              Date.parse(conversationInfo.createdAt as string),
            ).toLocaleString('de-AT', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            })
          : new Date(
              Date.parse(conversationInfo.createdAt as string),
            ).toLocaleString('de-AT', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            }),
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
            ? new Date(
                Date.parse(conversationHistoryInfo.createdAt as string),
              ).toLocaleString('de-AT', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })
            : new Date(
                Date.parse(conversationHistoryInfo.createdAt as string),
              ).toLocaleString('de-AT', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              }),
      };
    },
  );
  return conversationHistoryResult as Message[];
}
