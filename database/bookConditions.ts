import { BookCondition } from '../types/bookConditions';
import { sql } from './connect';

export async function getBookConditions() {
  const bookConditions = await sql<BookCondition[]>`
    SELECT id, condition_status FROM book_condition
  `;

  return bookConditions;
}
