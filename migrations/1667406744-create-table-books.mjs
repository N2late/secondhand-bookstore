export async function up(sql) {
  await sql`
CREATE TABLE books (
  id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  user_id integer REFERENCES users (id) ON DELETE CASCADE,
  book_condition_id integer REFERENCES book_condition (id),
  language_id integer REFERENCES languages (id),
  publisher VARCHAR(100),
  release_date DATE,
  synopsis VARCHAR(1000),
  img_path VARCHAR(150) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  shipping_costs_included BOOLEAN NOT NULL DEFAULT false,
  sold BOOLEAN NOT NULL DEFAULT false,
  reserved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
`;
}

export async function down(sql) {
  await sql`
DROP TABLE books
`;
}