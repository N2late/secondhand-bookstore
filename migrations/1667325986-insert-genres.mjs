export async function up(sql) {
  await sql`
    INSERT INTO genres (type)
    VALUES
      ('Action'),
      ('Adventure'),
      ('Comedy'),
      ('Crime'),
      ('Drama'),
      ('Fantasy'),
      ('Historical'),
      ('Horror'),
      ('Mystery'),
      ('Political'),
      ('Romance'),
      ('Saga'),
      ('Satire'),
      ('Science fiction'),
      ('Social'),
      ('Speculative'),
      ('Thriller'),
      ('Urban'),
      ('Western'),
      ('Poetry'),
      ('Essay'),
      ('Memoir'),
      ('Autobiography'),
      ('Biography'),
      ('Non-fiction')
  `;
}

export async function down(sql) {
  await sql`
    DELETE FROM genres
  `;
}
