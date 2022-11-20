import { createSerializedSignupTokenCookie } from '../cookies';

describe('createSerializedSignupTokenCookie', () => {
  it('should return a serialized cookie', () => {
    const token = '1234567890';
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    const cookie = createSerializedSignupTokenCookie(token);

    expect(cookie).toEqual(
      `sessionToken=1234567890; Max-Age=${maxAge}; Path=/; Expires=${new Date(
        Date.now() + maxAge * 1000,
      ).toUTCString()}; HttpOnly; SameSite=Lax`,
    );
  });
});
