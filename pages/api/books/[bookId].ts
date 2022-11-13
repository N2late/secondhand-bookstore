import type { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteBookById,
  getBookById,
  updateBookById,
  updateBooksGenresByBookId,
} from '../../../database/books';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

// book with id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const id = req.query.bookId;

    if (!id) {
      return res.status(400).json({ errors: [{ message: 'Missing book id' }] });
    }
    const book = await getBookById(id as string);
    if (book.length === 0) {
      return res.status(404).json({ errors: [{ message: 'Book not found' }] });
    }

    const bookNew = book[0];
    bookNew.genre = book.map((b) => b.genre);

    return res.status(200).json(bookNew);
  }
  if (req.method === 'PUT') {
    // update book
    const id = req.query.bookId;
    if (!id) {
      return res.status(400).json({ errors: [{ message: 'Missing book id' }] });
    }

    const session = await getValidSessionByToken(req.cookies.sessionToken);
    if (!session) {
      res.status(400).json({ errors: [{ message: 'Session is invalid' }] });
      return;
    }

    const user = await getUserBySessionToken(session.token);

    if (!user) {
      res
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    const book = await getBookById(req.query.bookId as string);
    if (book.length === 0) {
      return res.status(404).json({ errors: [{ message: 'Book not found' }] });
    }
    if (book[0].userId !== user.id) {
      return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
    }

    const { title, author, bookConditionId, languageId, imgPath, price } =
      req.body.bookObj;

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

    const updatedBook = await updateBookById(req.body.bookObj);

    genres.map(async (genre: string) => {
      await updateBooksGenresByBookId(req.query.bookId as string, genre);
    });

    return res.status(200).json(updatedBook);
  }
  if (req.method === 'DELETE') {
    // delete book
    const id = req.query.bookId;
    if (!id) {
      return res.status(400).json({ errors: [{ message: 'Missing book id' }] });
    }

    const session = await getValidSessionByToken(req.cookies.sessionToken);
    if (!session) {
      res.status(400).json({ errors: [{ message: 'Session is invalid' }] });
      return;
    }

    const user = await getUserBySessionToken(session.token);

    if (!user) {
      res
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    const book = await getBookById(req.query.bookId as string);
    if (book.length === 0) {
      return res.status(404).json({ errors: [{ message: 'Book not found' }] });
    }
    if (book[0].userId !== user.id) {
      return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
    }
    const deletedBook = await deleteBookById(req.query.bookId as string);
    if (!deletedBook) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Book not deleted' }] });
    }
    return res.status(200).json({ message: 'Book deleted' });
  }
  return res.status(405).json({
    errors: [{ message: 'Method not allowed' }],
  });
}
