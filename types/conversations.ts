export type Conversation = {
  id: number;
  sellerId: number;
  buyerId: number;
  bookId: number;
};

export type Message = {
  id: number;
  conversationId: number;
  senderId: number;
  messageBody: string;
  isRead: boolean;
  createdAt: string | Date;
};

export type ConversationInboxInfo = Conversation & {
  imgPath: string;
  username: string;
  bookTitle: string;
  createdAt: string | Date;
};

export type Correspondent = {
  id: number;
  username: string;
  imgPath: string;
};
