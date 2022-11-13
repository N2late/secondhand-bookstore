import { Book, BookSmallPreview } from '../types/book';
import { sql } from './connect';

// create book
export function createBook(book: Book) {
  const newBook = sql`
    INSERT INTO books (title, author, user_id, book_condition_id, language_id, publisher, release_date, synopsis, img_path, price, shipping_included, sold, reserved)
    VALUES (${book.title}, ${book.author}, ${book.userId}, ${book.bookConditionId}, ${book.languageId}, ${book.publisher}, ${book.releaseDate}, ${book.synopsis}, ${book.imgPath}, ${book.price}, ${book.shippingCostsIncluded}, ${book.sold}, ${book.reserved})
    RETURNING id AS "id", title AS "title", author AS "author", user_id AS "userId", book_condition_id AS "bookConditionId", language_id AS "languageId", publisher AS "publisher", release_date AS "releaseDate", synopsis AS "synopsis", img_path AS "imgPath", price AS "price", shipping_included AS "shippingCostsIncluded", sold AS "sold", reserved AS "reserved", created_at AS "createdAt"
  `;
  return newBook;
}

// get books
export function getBooks() {
  const books = sql`
    SELECT * FROM books
    WHERE sold = false
    ORDER by price ASC, created_at ASC;
  `;
  return books;
}

export function getBookById(bookId: string) {
  const book = sql`
    SELECT books.id, books.title, books.author, books.user_id, books.publisher, books.release_date, books.synopsis, books.img_path, books.price, books.shipping_included, books.sold, books.reserved, books.created_at, users.username AS seller, languages.language, book_condition.condition_status, genres.type AS genre
    FROM books
    INNER JOIN users ON books.user_id = users.id
    INNER JOIN languages ON books.language_id = languages.id
    INNER JOIN book_condition ON books.book_condition_id = book_condition.id
    INNER JOIN books_genres ON books.id = books_genres.book_id
    INNER JOIN genres ON books_genres.genre_id = genres.id
    WHERE books.id = ${bookId}
  `;

  return book;
}

// get books that contain the query on title or author from the header search bar
export function getBooksByTitleOrAuthorFromHeader(query: string) {
  const books = sql`
    SELECT * FROM books
    WHERE title ILIKE ${`%${query}%`} OR author ILIKE ${`%${query}%`}
    AND sold = false
    Order by price ASC, created_at ASC;
  `;
  return books;
}

// one function to all the search logic
export function getBooksBySearch(
  query: string,
  genre: string,
  language: string,
  priceOrder: string,
  createdAtOrder: string,
  recentlyReleased: string,
) {
  const books = sql`
    SELECT * FROM books
    WHERE id IN (
      SELECT book_id FROM books_genres
      ${genre !== 'All' ? sql`WHERE genre_id = ${genre}` : sql``}
    )

    AND id IN
    (SELECT id FROM books
      ${language !== 'All' ? sql`WHERE language_id = ${language}` : sql``}
    )
    AND id IN
    (SELECT id FROM books
      ${
        recentlyReleased === 'true'
          ? sql`WHERE release_date > NOW() - INTERVAL '18 months'`
          : sql``
      }
      )
      AND (title ILIKE ${`%${query}%`} OR author ILIKE ${`%${query}%`})
      AND sold = false
    ORDER BY
    CASE WHEN ${priceOrder} = 'asc' THEN price END ASC,
    CASE WHEN ${priceOrder} = 'desc' THEN price END DESC,
    CASE WHEN ${createdAtOrder} = 'asc' THEN created_at END ASC,
    CASE WHEN ${createdAtOrder} = 'desc' THEN created_at END DESC
  `;
  return books;
}

// update book
export function updateBookById(book: Book) {
  const updatedBook = sql`
    UPDATE books
    SET title = ${book.title}, author = ${book.author}, book_condition_id = ${book.bookConditionId}, language_id = ${book.languageId}, publisher = ${book.publisher}, release_date = ${book.releaseDate}, synopsis = ${book.synopsis}, img_path = ${book.imgPath}, price = ${book.price}, shipping_included = ${book.shippingCostsIncluded}, sold = ${book.sold}, reserved = ${book.reserved}
    WHERE id = ${book.id}
    RETURNING *
  `;
  return updatedBook;
}

// update books_genres table
export function updateBooksGenresByBookId(bookId: string, genreId: string) {
  const updatedBooksGenres = sql`
    UPDATE books_genres
    SET genre_id = ${genreId}
    WHERE book_id = ${bookId}
    RETURNING *
  `;
  return updatedBooksGenres;
}

// delete book by id
export function deleteBookById(id: string) {
  if (!id) return;
  const book = sql`
    DELETE FROM books
    WHERE id = ${id}
    RETURNING *
  `;
  return book;
}

export function getAllBookInfoById(bookId: string) {
  const book = sql`
    SELECT books.id, books.title, books.author, books.user_id, books.publisher, books.release_date, books.synopsis, books.img_path, books.price, books.shipping_included, books.sold, books.reserved, books.created_at, users.username AS seller, languages.language, books.language_id, book_condition.condition_status, genres.type AS genre, books.book_condition_id,
    genres.id AS genre_id
    FROM books
    INNER JOIN users ON books.user_id = users.id
    INNER JOIN languages ON books.language_id = languages.id
    INNER JOIN book_condition ON books.book_condition_id = book_condition.id
    INNER JOIN books_genres ON books.id = books_genres.book_id
    INNER JOIN genres ON books_genres.genre_id = genres.id
    WHERE books.id = ${bookId}
  `;

  return book;
}

export function getBooksByUserId(userId: string) {
  const books = sql<BookSmallPreview[]>`
    SELECT id, title, author, price, img_path FROM books
    WHERE user_id = ${userId}
    ORDER by price ASC, created_at ASC
  `;
  return books;
}
