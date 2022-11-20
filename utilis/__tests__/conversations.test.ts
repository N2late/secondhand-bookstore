import { conversationsWithTimeFormatted } from '../conversations';

describe('conversationsWithTimeFormatted', () => {
  it('should return a formatted date', () => {
    const conversations = [
      {
        id: 1,
        sellerId: 1,
        buyerId: 1,
        bookId: 1,
        imgPath: 'imgPath',
        username: 'username',
        bookTitle: 'bookTitle',
        createdAt: '2021-01-01T00:00:00.000Z',
      },
    ];

    const result = conversationsWithTimeFormatted(conversations);

    expect(result[0].createdAt).toEqual(' Jan 01 2021');
  });
});
