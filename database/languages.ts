import { Language } from '../types/languages';
import { sql } from './connect';

export async function getLanguages() {
  const languages = await sql<Language[]>`
    SELECT id, language FROM languages
  `;

  return languages;
}
