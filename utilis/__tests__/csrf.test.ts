import Tokens from 'csrf';
import { createCsrfSecret, validateTokenFromSecret } from '../csrf';

describe('CsrfSecret', () => {
  const tokens = new Tokens();
  const secret = createCsrfSecret();
  it('should create a random string of characters', () => {
    expect(secret).toHaveLength(24);
  });
  it('it should take a secret and return a token and validate the token from the secret', () => {
    const token = tokens.create(secret);
    expect(token).toHaveLength(36);
    expect(true).toBe(validateTokenFromSecret(secret, token));
  });
});
