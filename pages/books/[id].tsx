// book details page

import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { CldImage } from 'next-cloudinary';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageBox from '../../components/MessageBox';
import { getBookById } from '../../database/books';
import { getUserBySessionToken } from '../../database/users';
import { bookDetailsStyles } from '../../styles/books/bookDetails';
import { BookWithUserLangConditionGenres } from '../../types/book';
import { User } from '../../types/user';

type Props = {
  user: User;
  book: BookWithUserLangConditionGenres;
};

export default function BookDetails(props: Props) {
  const { user, book } = props;
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [sendMessage, setSendMessage] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    user.id === book.userId ? setIsOwner(true) : setIsOwner(false);
    setLoading(false);
  }, [user.id, book.userId]);

  async function handleBookDelete() {
    const deleteBook = await fetch(`/api/books/${book.id}`, {
      method: 'DELETE',
    });
    const deletedBook = await deleteBook.json();
    if (deletedBook.errors) {
      setErrors(deletedBook.errors[0].message);
      return;
    } else {
      alert('Book deleted');
      await router.push('/');
    }
  }

  return (
    <>
      {loading && <p css={bookDetailsStyles.loading}>Loading...</p>}
      {errors ? (
        <div css={bookDetailsStyles.error}>
          <p>{errors}</p>
        </div>
      ) : null}
      <>
        <Head>
          <title>Add a book for sell</title>
          <meta
            name="description"
            content={`book: ${book.title} by ${book.author} `}
          />
        </Head>
        <main>
          <div css={bookDetailsStyles.container}>
            <div css={bookDetailsStyles.locationFlow}>
              <Link href="/">
                <p>Home</p>
              </Link>
              <Image
                src="/chevron-right.png"
                width={12}
                height={12}
                alt="chevron"
              />
              <Link href="/books/buy">
                <p>Buy</p>
              </Link>
              <Image
                src="/chevron-right.png"
                width={12}
                height={12}
                alt="chevron"
              />
              <p css={bookDetailsStyles.flowBookTitle}>{book.title}</p>
            </div>
            <div css={bookDetailsStyles.bookDetailsContainer}>
              <div css={bookDetailsStyles.bookCover}>
                <div css={bookDetailsStyles.imgContainer}>
                  <CldImage
                    src={book.imgPath.slice(50)}
                    width={300}
                    height={400}
                    alt={`${book.title} book cover`}
                    css={bookDetailsStyles.img}
                  />
                </div>
              </div>
              <div css={bookDetailsStyles.bookInfo}>
                <div css={bookDetailsStyles.bookTitleContainer}>
                  <h1>{book.title}</h1>
                  {book.sold ? <p css={bookDetailsStyles.sold}>Sold</p> : null}
                </div>
                <div css={bookDetailsStyles.authorAndSeller}>
                  <h3>by {book.author}</h3>
                  <p>
                    added by <span>{book.seller}</span>
                  </p>
                </div>
                <p css={bookDetailsStyles.genre}>
                  {' '}
                  {typeof book.genre === 'string'
                    ? book.genre
                    : book.genre.join(', ')}
                </p>
                <div css={bookDetailsStyles.priceStatus}>
                  <h2>{book.price} €</h2>
                  <p>{book.conditionStatus}</p>
                </div>
                {book.shippingIncluded && (
                  <p css={bookDetailsStyles.shippingCosts}>
                    Shipping costs included
                  </p>
                )}
                <div css={bookDetailsStyles.dynamicContainer}>
                  {!sendMessage ? (
                    <div css={bookDetailsStyles.SynopsisAndLangContainer}>
                      <h4>Synopsis</h4>
                      <p>{book.synopsis}</p>
                      <h4>Language</h4>
                      <p>{book.language}</p>
                      {!isOwner ? (
                        !book.sold ? (
                          <button
                            css={bookDetailsStyles.btn}
                            onClick={async () => {
                              if (user.id) {
                                setSendMessage(true);
                              } else {
                                await router.push(
                                  `/login?returnTo=/books/${book.id}`,
                                );
                              }
                            }}
                          >
                            BUY
                          </button>
                        ) : null
                      ) : (
                        <div css={bookDetailsStyles.isOwner}>
                          <button
                            css={bookDetailsStyles.btnEdit}
                            onClick={async () => {
                              await router.push(`/books/edit/${id}`);
                            }}
                          >
                            Edit book details
                          </button>
                          {!deleteConfirmation ? (
                            <button
                              css={bookDetailsStyles.btnDelete}
                              onClick={() => setDeleteConfirmation(true)}
                            >
                              Delete book
                            </button>
                          ) : (
                            <div>
                              <p>Are you sure you want to delete this book?</p>
                              <button
                                css={bookDetailsStyles.btnConfirmDelete}
                                onClick={handleBookDelete}
                              >
                                Yes
                              </button>
                              <button
                                css={bookDetailsStyles.btnCancelDelete}
                                onClick={() => setDeleteConfirmation(false)}
                              >
                                No
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <MessageBox
                      messageSent={messageSent}
                      setMessageSent={setMessageSent}
                      setSendMessage={setSendMessage}
                      bookId={book.id}
                      sellerId={book.userId}
                      userId={user.id}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = await getUserBySessionToken(token);

  const id = context.params?.id;

  const bookObj = await getBookById(id as string);

  if (_.size(bookObj) === 0) {
    return {
      notFound: true,
    };
  }

  const book = bookObj[0];
  book.genre = bookObj.map((b: any) => b.genre);
  book.createdAt = JSON.stringify(book.createdAt);
  book.releaseDate = JSON.stringify(book.releaseDate);

  return {
    props: {
      user: user || 'undefined',
      book,
    },
  };
}
