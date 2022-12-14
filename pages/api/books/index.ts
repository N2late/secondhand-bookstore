import type { NextApiRequest, NextApiResponse } from 'next';
import { createBook, getBooks } from '../../../database/books';
import { insertBookGenre } from '../../../database/genres';
import { getValidSessionByToken } from '../../../database/sessions';
import { validateTokenFromSecret } from '../../../utilis/csrf';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    /* Returning the books. */
    const books = await getBooks();
    return res.status(200).json(books);
  }
  if (req.method === 'POST') {
    const session = await getValidSessionByToken(req.cookies.sessionToken);

    /* This is checking if the user is logged in. If they are not, it will return an error. */
    if (!session) {
      return res.status(400).json({
        errors: [{ message: 'Unauthorized. No valid session token passed' }],
      });
    }

    const { csrfToken } = req.body;

    /* This is checking if the user has passed a CSRF token. If they have not, it will return an error. */

    if (!csrfToken) {
      return res.status(400).json({
        errors: [{ message: 'CSRF token is required' }],
      });
    }

    /* This is checking if the user has passed a valid CSRF token. If they have not, it will return an error. */
    try {
      validateTokenFromSecret(session.csrfSecret, csrfToken);
    } catch (error) {
      return res.status(400).json({
        errors: [{ message: 'Invalid CSRF token' }],
      });
    }

    const { title, author, bookConditionId, languageId, imgPath, price } =
      req.body.book;

    const { genres } = req.body;

    /* This is checking if the user has filled out all the required fields. If they have not, it will return an error. */
    switch (true) {
      case !title:
        return res.status(400).json({
          errors: [{ message: 'Title is required' }],
        });
      case !author:
        return res.status(400).json({
          errors: [{ message: 'Author is required' }],
        });
      case !bookConditionId:
        return res.status(400).json({
          errors: [{ message: 'Book condition is required' }],
        });
      case !languageId:
        return res.status(400).json({
          errors: [{ message: 'Language is required' }],
        });
      case !imgPath:
        return res.status(400).json({
          errors: [{ message: 'Image is required' }],
        });
      case !price:
        return res.status(400).json({
          errors: [{ message: 'Price is required' }],
        });
      case genres.length === 0:
        return res.status(400).json({
          errors: [{ message: 'At least one genre is required' }],
        });
    }

    /* Creating a new book. */
    const newBook = await createBook(req.body.book);

    /* Inserting the genres of the book into the database. */
    genres.map(async (genre: string) => {
      await insertBookGenre(Number(newBook[0].id), Number(genre));
    });
    return res.status(200).json({ book: newBook });
  }

  return res.status(405).json({
    errors: [{ message: 'Method not allowed' }],
  });
}
