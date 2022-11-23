import { Genre } from '../types/genres';
import { sql } from './connect';

export async function getGenres() {
  const genres = await sql<Genre[]>`
    SELECT id, type FROM genres
    ORDER BY type ASC
  `;

  return genres;
}
export async function insertBookGenre(bookId: number, genreId: number) {
  const bookGenre = await sql`
    INSERT INTO books_genres (book_id, genre_id)
    VALUES (${bookId}, ${genreId})
    RETURNING *
  `;

  return bookGenre;
}
