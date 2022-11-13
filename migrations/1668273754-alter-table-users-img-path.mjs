export async function up(sql) {
  await sql`
    ALTER TABLE users
    ADD COLUMN img_path VARCHAR(255) DEFAULT 'https://res.cloudinary.com/diz1cgduk/image/upload/v1668273935/sszdy79mc4gqabw4xa4z.jpg'
  `;
}

export async function down(sql) {
  await sql`
    ALTER TABLE users
    DROP COLUMN img_path
  `;
}
