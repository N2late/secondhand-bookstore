import Tokens from 'csrf';

const tokens = new Tokens();

/**
 * It creates a random string of characters that is used to prevent cross-site request forgery (CSRF)
 * attacks.
 * @returns A secret key for the CSRF token.
 */
export function createCsrfSecret() {
  return tokens.secretSync();
}

/**
 * It takes a secret string and returns a token
 * @param {string} secret - The secret key used to sign the token.
 * @returns A token
 */
export function createTokenFromSecret(secret: string | undefined) {
  if (!secret) return;
  return tokens.create(secret);
}

/**
 * It takes a secret and a token, and returns the decoded token if the token is valid, or throws an
 * error if the token is invalid
 * @param {string} secret - The secret key used to sign the token.
 * @param {string} token - The token to validate
 * @returns The token is being returned.
 */
export function validateTokenFromSecret(secret: string, token: string) {
  return tokens.verify(secret, token);
}
