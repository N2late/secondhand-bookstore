import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getBooksBySearch,
  getBooksByTitleOrAuthorFromHeader,
} from '../../../database/books';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    /* This is checking if the query is empty. If it is, it returns a 400 error. */
    if (_.isEmpty(req.query)) {
      return res.status(400).json({
        errors: [{ message: 'A search term is required' }],
      });
    } else if (_.size(req.query) === 1) {
      /* This is checking if the query has only one parameter. If it does, it will return the books that
    match the search term. */
      const books = await getBooksByTitleOrAuthorFromHeader(
        req.query.search as string,
      );
      return res.status(200).json(books);
    } else if (_.size(req.query) > 1) {
      /* This is checking if the query has more than one parameter. If it does, it will return the books
    that match the search term and/or genre, and/or language. */

      const books = await getBooksBySearch(
        req.query.search as string,
        req.query.genre as string,
        req.query.language as string,
        req.query.price as string,
        req.query.recentlyAdded as string,
        req.query.recentlyReleased as string,
      );

      return res.status(200).json({ books: books });
    }
    return res.status(405).json({
      errors: [{ message: 'Method not allowed' }],
    });
  }
}
