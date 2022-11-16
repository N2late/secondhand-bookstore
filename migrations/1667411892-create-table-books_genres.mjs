export async function up(sql) {
  await sql`
CREATE TABLE books_genres (
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  book_id integer REFERENCES books (id) ON DELETE CASCADE,
  genre_id integer REFERENCES genres (id))
`;
}

export async function down(sql) {
  await sql`
DROP TABLE books_genres
`;
}