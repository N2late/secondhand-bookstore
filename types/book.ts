import { User } from './user';

export type Book = {
  id: number;
  title: string;
  author: string;
  userId: number;
  bookConditionId: number;
  languageId: number;
  publisher: string;
  releaseDate: string;
  synopsis: string;
  imgPath: string;
  price: number;
  shippingCostsIncluded: boolean;
  sold: boolean;
  reserved: boolean;
  createdAt: string;
};

export type BookSmallPreview = Pick<
  Book,
  'id' | 'title' | 'author' | 'imgPath' | 'price'
>;

export type BookWithUserLangConditionGenres = Book & {
  user: User['id'];
  language: string;
  conditionStatus: string;
  genre: string[];
  seller: User['username'];
  shippingIncluded: boolean;
};

export type BookWithUsername = {
  id: number;
  title: string;
  author: string;
  userId: number;
  imgPath: string;
  price: number;
  seller: string;
  shippingIncluded: boolean;
  sold: boolean;
};
