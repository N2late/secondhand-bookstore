export async function up(sql) {
  await sql`
INSERT INTO book_condition (condition_status)
VALUES
  ('New'),
  ('Like New'),
  ('Very Good'),
  ('Good'),
  ('Acceptable'),
  ('Poor');
`;
}

export async function down(sql) {
  await sql`
DELETE FROM book_condition;
`;
}
