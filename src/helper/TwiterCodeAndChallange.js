import crypto from 'crypto';

export function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateCodeChallenge(codeVerifier) {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return hash.toString('base64url');
}