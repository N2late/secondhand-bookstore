import type { NextApiRequest, NextApiResponse } from 'next';
import { createBook, getBooks } from '../../../database/books';
import { insertBookGenre } from '../../../database/genres';
import { getValidSessionByToken } from '../../../database/sessions';

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

    console.log('I am here 1');

    /* This is checking if the user is logged in. If they are not, it will return an error. */
    if (!session) {
      return res.status(400).json({
        errors: [{ message: 'Unauthorized. No valid session token passed' }],
      });
    }
    console.log('I am here 2');

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
    console.log('I am here 3');
    /* Creating a new book. */
    const newBook = await createBook(req.body.book);
    console.log('I am here 4');
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
