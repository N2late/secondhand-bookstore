import cookie from 'cookie';

export function createSerializedSignupTokenCookie(token: string) {
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24 * 7; // 7 days

  return cookie.serialize('sessionToken', token, {
    maxAge: maxAge, // for new browsers
    expires: new Date(Date.now() + maxAge * 1000), // for old browsers
    httpOnly: true,
    path: '/',
    /* It's a security feature that prevents CSRF attacks. */
    sameSite: 'lax',
    secure: isProduction,
  });
}
