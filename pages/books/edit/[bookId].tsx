// page to edit/update the book details and delete the book

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Select, { GroupBase, MultiValue, SingleValue } from 'react-select';
import { MonthYearPicker } from '../../../components/Date-picker';
import UploadImage from '../../../components/UploadImage';
import { getBookConditions } from '../../../database/bookConditions';
import { getAllBookInfoById } from '../../../database/books';
import { getGenres } from '../../../database/genres';
import { getLanguages } from '../../../database/languages';
import { getUserBySessionToken } from '../../../database/users';
import { styles } from '../../../styles/auth/auth';
import { addBookStyles } from '../../../styles/books/addBook';
import { Genre } from '../../../types/genres';
import { User } from '../../../types/user';

type Props = {
  genresWithLabel: Genre[];
  languagesWithLabel: GroupBase<{ value: number; label: string }>[];
  bookConditionsWithLabel: GroupBase<{ value: number; label: string }>[];
  cloudinaryAPI: string;
  book: string; // because it is passed as json string due to date values
};

export default function EditBook({
  genresWithLabel,
  languagesWithLabel,
  bookConditionsWithLabel,
  cloudinaryAPI,
  book,
}: Props) {
  const bookEdit = JSON.parse(book);

  let bookGenresArr = [];

  if (typeof bookEdit.genre === 'string') {
    bookGenresArr = [{ value: bookEdit.genreId, label: bookEdit.genre }];
  } else {
    bookGenresArr = bookEdit.genre.map((g: string[], index: number) => {
      return { value: bookEdit.genreId[index], label: g };
    });
  }

  const bookReleaseDate =
    bookEdit.releaseDate === null ? null : new Date(bookEdit.releaseDate);

  const [title, setTitle] = useState(bookEdit.title);
  const [author, setAuthor] = useState(bookEdit.author);
  const [languageId, setLanguageId] = useState<
    SingleValue<{
      value: number;
      label: string;
    }>
  >({
    value: bookEdit.languageId as number,
    label: bookEdit.language as string,
  });
  const [genresList, setGenresList] =
    useState<MultiValue<Genre | undefined>>(bookGenresArr);
  const [publisher, setPublisher] = useState(bookEdit.publisher);
  const [releaseDate, setReleaseDate] = useState(bookReleaseDate);

  const [bookConditionId, setBookConditionId] = useState<
    SingleValue<{
      value: number;
      label: string;
    }>
  >({
    value: bookEdit.bookConditionId as number,
    label: bookEdit.conditionStatus as string,
  });
  const [price, setPrice] = useState(bookEdit.price);
  const [synopsis, setSynopsis] = useState(bookEdit.synopsis);
  const [imgPath, setImgPath] = useState(bookEdit.imgPath);
  const [shippingCostsIncluded, setShippingCostsIncluded] = useState(
    bookEdit.shippingIncluded,
  );
  const [sold, setSold] = useState(bookEdit.sold);
  const [reserved, setReserved] = useState(bookEdit.reserved);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  /**
   * I'm trying to send a POST request to the server with a body that contains a book object and a
   * genres array in order to add a new book to be sold.
   * @param e - React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const genres = genresList.map((genre) => genre?.value);

    const bookObj = {
      id: bookEdit.id,
      title,
      author,
      languageId: Number(languageId?.value),
      publisher: publisher.toLocaleLowerCase(),
      releaseDate,
      bookConditionId: Number(bookConditionId?.value),
      price,
      synopsis,
      imgPath,
      shippingCostsIncluded,
      sold,
      reserved,
    };
    const bodyDataObj = {
      bookObj,
      genres,
    };

    const res = await fetch(`/api/books/${bookEdit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyDataObj),
    });
    const data = await res.json();

    if (data.errors) {
      return setErrors(data.errors);
    } else {
      return await router.push(`/books/${data[0].id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Hand me - Your Secondhand Bookstore</title>
        <meta name="description" content="Edit the details of your book" />
      </Head>
      <main>
        <div css={addBookStyles.container}>
          <div css={addBookStyles.locationFlow}>
            <Link href="/">
              <p>Home</p>
            </Link>
            <Image
              src="/chevron-right.png"
              width={12}
              height={12}
              alt="chevron"
            />
            <p>edit</p>
          </div>
          <h1>Edit your book details</h1>
          <form css={addBookStyles.formContainer} onSubmit={handleSubmit}>
            <h3>Book details</h3>
            {errors.map((error) => {
              return (
                <p css={styles.error} key={error.message}>
                  {error.message}
                </p>
              );
            })}
            <div css={addBookStyles.formGroup}>
              <div css={addBookStyles.formLeftSide}>
                <div>
                  <label css={addBookStyles.requiredField} htmlFor="title">
                    Title
                  </label>
                  <input
                    value={title}
                    id="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label css={addBookStyles.requiredField} htmlFor="author">
                    Author
                  </label>
                  <input
                    value={author}
                    id="author"
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="publisher">Publisher</label>
                  <input
                    value={publisher}
                    id="publisher"
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </div>
                <div css={addBookStyles.languages}>
                  <label css={addBookStyles.requiredField} htmlFor="language">
                    Language
                  </label>
                  <Select
                    value={languageId}
                    id="language"
                    options={languagesWithLabel}
                    onChange={(e) => setLanguageId(e)}
                  />
                </div>
                <div>
                  <label css={addBookStyles.requiredField} htmlFor="genre">
                    Genre
                  </label>
                  <Select
                    defaultValue={undefined}
                    value={genresList}
                    isMulti
                    id="genre"
                    name="genres"
                    options={genresWithLabel}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setGenresList(e)}
                  />
                </div>
                <div>
                  <label
                    css={addBookStyles.requiredField}
                    htmlFor="book condition"
                  >
                    Book Condition
                  </label>
                  <Select
                    value={bookConditionId}
                    id="book condition"
                    options={bookConditionsWithLabel}
                    onChange={(e) => setBookConditionId(e)}
                  />
                </div>

                <div css={addBookStyles.datePicker}>
                  <label htmlFor="releaseDate">Release Date</label>
                  <MonthYearPicker
                    id="releaseDate"
                    setReleaseDate={setReleaseDate}
                    releaseDate={releaseDate}
                  />
                </div>
                <div>
                  <label css={addBookStyles.requiredField} htmlFor="price">
                    Price (€)
                  </label>
                  <input
                    value={price}
                    type="number"
                    id="price"
                    placeholder="€"
                    required
                    min="0"
                    step=".01"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div css={addBookStyles.formRightSide}>
                <label htmlFor="synopsis">Synopsis</label>
                <textarea
                  value={synopsis}
                  id="synopsis"
                  maxLength={1200}
                  onChange={(e) => setSynopsis(e.target.value)}
                />
                <UploadImage
                  imgPath={imgPath}
                  setImgPath={setImgPath}
                  cloudinaryAPI={cloudinaryAPI}
                />
              </div>
            </div>
            <div css={addBookStyles.finalDetails}>
              <div>
                <input
                  checked={shippingCostsIncluded && 'checked'}
                  type="checkbox"
                  id="shipping"
                  onChange={(e) => setShippingCostsIncluded(e.target.checked)}
                />
                <label htmlFor="shipping">Shipping costs included</label>
              </div>
              <div>
                <input
                  checked={sold && 'checked'}
                  type="checkbox"
                  id="sold"
                  onChange={(e) => setSold(e.target.checked)}
                />
                <label htmlFor="sold">Sold</label>
              </div>
              <div>
                <input
                  checked={reserved && 'checked'}
                  type="checkbox"
                  id="reserved"
                  onChange={(e) => setReserved(e.target.checked)}
                />
                <label htmlFor="reserved">Reserved</label>
              </div>
            </div>
            <span css={addBookStyles.requiredField} />
            <span>required field</span>
            <div css={addBookStyles.btnContainer}>
              <button css={addBookStyles.button}>Save changes</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = await getUserBySessionToken(token);
  const bookId = context.params?.bookId;

  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/books/edit/${bookId}`,
        permanent: false,
      },
    };
  }

  const book = await getAllBookInfoById(bookId as string);

  if (!book[0].userId) {
    return {
      notFound: true,
    };
  }

  if (book[0].userId !== user.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const bookWithAllGenres = book[0];
  bookWithAllGenres.genre = book.map((b) => b.genre);
  bookWithAllGenres.genreId = book.map((b) => b.genreId);

  const cloudinaryAPI = process.env.CLOUDINARY_KEY;
  const genres = await getGenres();
  const languages = await getLanguages();
  const bookConditions = await getBookConditions();

  const genresWithLabel = genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.type,
  }));

  const languagesWithLabel = languages.map((language) => ({
    value: language.id.toString(),
    label: language.language,
  }));

  const bookConditionsWithLabel = bookConditions.map((bookCondition) => ({
    value: bookCondition.id.toString(),
    label: bookCondition.conditionStatus,
  }));
  return {
    props: {
      user,
      genresWithLabel,
      languagesWithLabel,
      bookConditionsWithLabel,
      cloudinaryAPI,
      book: JSON.stringify(bookWithAllGenres),
    },
  };
}
