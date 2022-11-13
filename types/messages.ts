export type Message = {
  id: number;
  bookId: number;
  senderId: number;
  recipientId: number;
  messageBody: string;
  createdAt: Date;
};
