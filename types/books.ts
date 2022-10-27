export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  path: string;
};

export const books = [
  {
    id: 1,
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    price: 9.99,
    path: '/../public/books/book1.jpg',
  },
  {
    id: 2,
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    price: 10.99,
    path: '/../public/books/book2.jpg',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 9.99,
    path: '/../public/books/book3.jpg',
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 9.99,
    path: '/../public/books/book4.jpg',
  },
];
