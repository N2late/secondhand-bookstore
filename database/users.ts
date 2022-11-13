import { User } from '../types/user';
import { sql } from './connect';

export async function getUserByUserEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT id, username FROM users WHERE users.email = ${email}
`;
  return user;
}

export async function createUser(
  email: string,
  passwordHash: string,
  username: string,
) {
  const [user] = await sql<{ id: number; username: string }[]>`
  INSERT INTO users (email, password_hash, username) VALUES (${email}, ${passwordHash}, ${username}) RETURNING id, username
`;
  return user;
}

export async function getUserWithPasswordHashByEmail(email: string) {
  if (!email) return undefined;
  const [user] = await sql<
    { id: number; username: string; passwordHash: string }[]
  >`SELECT id, username, password_hash FROM users WHERE users.email = ${email}
`;
  return user;
}

export async function getUserBySessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT users.id, users.username FROM users INNER JOIN sessions ON users.id = sessions.user_id WHERE sessions.token = ${token} AND sessions.expiry_timestamp > NOW()
`;
  return user;
}

export async function getAllUsers() {
  const users = await sql<{ id: number; username: string }[]>`
  SELECT id, username FROM users
`;
  return users;
}

export async function getUserBySessionTokenWithImgEmail(
  token: string | undefined,
) {
  if (!token) return undefined;
  const [user] = await sql<
    { id: number; username: string; email: string; imgPath: string }[]
  >`
  SELECT users.id, users.username, users.email, users.img_path FROM users INNER JOIN sessions ON users.id = sessions.user_id WHERE sessions.token = ${token} AND sessions.expiry_timestamp > NOW()
`;
  return user;
}

// update user
export async function updateUser(
  id: number,
  email: string,
  username: string,
  imgPath: string,
) {
  const [user] = await sql<User[]>`
  UPDATE users SET email = ${email}, username = ${username}, img_path = ${imgPath} WHERE id = ${id} RETURNING id, username, email, img_path
`;
  return user;
}

// delete user
export async function deleteUser(id: number) {
  const [user] = await sql<User[]>`
  DELETE FROM users WHERE id = ${id} RETURNING id, username, email, img_path
`;
  return user;
}
