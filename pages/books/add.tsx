import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { MonthYearPicker } from '../../components/Date-picker';
import UploadImage from '../../components/UploadImage';
import { getBookConditions } from '../../database/bookConditions';
import { getGenres } from '../../database/genres';
import { getLanguages } from '../../database/languages';
import { getUserBySessionToken } from '../../database/users';
import { styles } from '../../styles/auth/auth';
import { addBookStyles } from '../../styles/books/addBook';
import { BookCondition } from '../../types/bookConditions';
import { Genre } from '../../types/genres';
import { Language } from '../../types/languages';
import { User } from '../../types/user';

type Props = {
  genresWithLabel: Genre[];
  languagesWithLabel: Language[];
  bookConditionsWithLabel: BookCondition[];
  user: User;
  cloudinaryAPI: string;
};

export default function AddBookForSell({
  genresWithLabel,
  languagesWithLabel,
  bookConditionsWithLabel,
  user,
  cloudinaryAPI,
}: Props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [languageId, setLanguageId] = useState<SingleValue<Language>>();
  const [genresList, setGenresList] = useState<MultiValue<Genre | undefined>>(
    [],
  );
  const [publisher, setPublisher] = useState('');
  const [releaseDate, setReleaseDate] = useState(null);
  const [bookConditionId, setBookConditionId] =
    useState<SingleValue<BookCondition>>();
  const [price, setPrice] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [shippingCostsIncluded, setShippingCostsIncluded] = useState(false);
  const [sold, setSold] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  let hostname;
  if (typeof window !== 'undefined') {
    hostname = window.location.hostname;
  }

  const domain =
    hostname === 'localhost' ? '' : 'https://secondhand-bookstore.fly.dev';

  /**
   * I'm trying to send a POST request to the server with a body that contains a book object and a
   * genres array in order to add a new book to be sold.
   * @param e - React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const genres = genresList.map((genre) => genre?.value);

    const book = {
      title,
      author,
      userId: user.id,
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
      book,
      genres,
    };

    const res = await fetch(`${domain}/api/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyDataObj),
    });

    const data = await res.json();
    if (data.errors) {
      return setErrors(data.errors);
    } else {
      return await router.push(`/books/${data.book[0].id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Add a book for sell</title>
        <meta name="description" content="Add a book for sell" />
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
            <p>sell</p>
          </div>
          <h1>Add a book for sell</h1>
          <form css={addBookStyles.formContainer} onSubmit={handleSubmit}>
            <h3>Book details</h3>
            {errors.map((error) => {
              return (
                <p css={styles.error} key={error.message}>
                  !Error: {error.message}
                </p>
              );
            })}
            <div css={addBookStyles.formGroup}>
              <div css={addBookStyles.formLeftSide}>
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="author">Author</label>
                  <input
                    id="author"
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="publisher">Publisher</label>
                  <input
                    id="publisher"
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </div>
                <div css={addBookStyles.languages}>
                  <label htmlFor="language">Language</label>
                  <Select
                    id="language"
                    options={languagesWithLabel}
                    onChange={(e) => setLanguageId(e)}
                  />
                </div>
                <div>
                  <label htmlFor="genre">Genre</label>
                  <Select
                    defaultValue={undefined}
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
                  <label htmlFor="book condition">Book Condition</label>
                  <Select
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
                  <label htmlFor="price">Price (€)</label>
                  <input
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
                  id="synopsis"
                  maxLength={1000}
                  onChange={(e) => setSynopsis(e.target.value)}
                />
                <UploadImage
                  setImgPath={setImgPath}
                  imgPath={null}
                  cloudinaryAPI={cloudinaryAPI}
                />
              </div>
            </div>
            <div css={addBookStyles.finalDetails}>
              <div>
                <input
                  type="checkbox"
                  id="shipping"
                  onChange={(e) => setShippingCostsIncluded(e.target.checked)}
                />
                <label htmlFor="shipping">Shipping costs included</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="sold"
                  onChange={(e) => setSold(e.target.checked)}
                />
                <label htmlFor="sold">Sold</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="reserved"
                  onChange={(e) => setReserved(e.target.checked)}
                />
                <label htmlFor="reserved">Reserved</label>
              </div>
            </div>
            <div css={addBookStyles.btnContainer}>
              <button css={addBookStyles.button}>Add book</button>
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

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/books/add',
        permanent: false,
      },
    };
  }
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
    },
  };
}
