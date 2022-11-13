export async function up(sql) {
  await sql`
    CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      book_id INTEGER NOT NULL REFERENCES books(id),
      sender_id INTEGER NOT NULL REFERENCES users(id),
      recipient_id INTEGER NOT NULL REFERENCES users(id),
      message_body TEXT NOT NULL,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE messages
  `;
}
