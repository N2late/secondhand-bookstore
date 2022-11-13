import { Session } from '../types/session';
import { User } from '../types/user';
import { sql } from './connect';

export async function createSession(
  userId: User['id'],
  token: Session['token'],
  csrfSecret: Session['csrfSecret'],
) {
  const [session] = await sql<Session[]>`
    INSERT INTO sessions (user_id, token, csrf_secret) VALUES (${userId}, ${token}, ${csrfSecret})
    RETURNING id, token, csrf_secret
  `;

  await deleteExpiredSessions();
  return session;
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry_timestamp < NOW()
  `;
}

export async function deleteSessionByToken(token: Session['token']) {
  if (!token) return undefined;
  await sql`
    DELETE FROM sessions WHERE token = ${token}
  `;
}

export async function getValidSessionByToken(
  token: Session['token'] | undefined,
) {
  if (!token) return undefined;
  const [session] = await sql<Session[]>`
    SELECT id, token, csrf_secret FROM sessions WHERE token = ${token} AND expiry_timestamp > NOW()
  `;

  return session;
}
