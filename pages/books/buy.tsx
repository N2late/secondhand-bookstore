import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';
import { getGenres } from '../../database/genres';
import { getLanguages } from '../../database/languages';
import { buyStyles } from '../../styles/books/buy';
import { BookSmallPreview } from '../../types/book';
import { Genre } from '../../types/genres';
import { Language } from '../../types/languages';
import { useSearch } from '../../utilis/search';

type Props = {
  genres: Genre[];
  languages: Language[];
  books: BookSmallPreview[];
};

export default function Buy({ genres, languages, books }: Props) {
  const {
    search,
    handleSearchOnKeyPress,
    handleFilter,
    handleOnChangeSearch,
    handleSort,
    handleOnSubmit,
    handleCheckbox,
    filter,
    setFilter,
    recentlyReleased,
    setRecentlyReleased,
  } = useSearch();

  const [maxBooks, setMaxBooks] = useState(8);
  const router = useRouter();

  const booksVisible = books.length > maxBooks ? maxBooks : books.length;
  let bookCount = 0;

  useEffect(() => {
    if (router.query.genre) {
      setFilter({
        language: router.query.language as string,
        genre: router.query.genre as string,
      });
      setRecentlyReleased(router.query.recentlyReleased);
    } else {
      return setFilter({
        genre: 'All',
        language: 'All',
      });
    }
  }, []); // otherwise it will run infinitely. I need this to run only once when a page is loaded.

  return (
    <>
      <Head>
        <title>Buy a book</title>
        <meta name="description" content="Search and buy used books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form css={buyStyles.searchContainer} onSubmit={handleOnSubmit}>
          <div css={buyStyles.searchBar}>
            <Image src="/search.png" alt="search" width={20} height={20} />
            <input
              value={search}
              placeholder="Search for an author or a book title"
              onChange={handleOnChangeSearch}
              onKeyPress={handleSearchOnKeyPress}
            />
          </div>
          <div css={buyStyles.filterContainer}>
            <h3>Filter by:</h3>
            <div css={buyStyles.filterRow}>
              <div css={buyStyles.filterItem}>
                <label htmlFor="genre">Genre</label>
                <select
                  name="genre"
                  id="genre"
                  onChange={(e) => {
                    handleFilter(e);
                    router.query.genre = e.target.value;
                  }}
                  value={router.query.genre || filter.genre}
                >
                  <option value="All">All</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.type}
                    </option>
                  ))}
                </select>
              </div>
              <div css={buyStyles.filterItem}>
                <label htmlFor="sort">Sort by:</label>
                <div>
                  <select name="price" id="sort" onChange={handleSort}>
                    <option value="asc">Price - Ascendent</option>
                    <option value="desc">Price - Descendent</option>
                  </select>
                  <select name="recentlyAdded" id="sort" onChange={handleSort}>
                    <option value="asc">Recently added - Ascendent</option>
                    <option value="desc">Recently added - Descendent</option>
                  </select>
                </div>
              </div>
            </div>
            <div css={buyStyles.filterRow}>
              <div css={buyStyles.filterItem}>
                <label htmlFor="language">Language</label>
                <select
                  name="language"
                  id="language"
                  onChange={(e) => {
                    handleFilter(e);
                    router.query.language = e.target.value;
                  }}
                  value={router.query.language || filter.language}
                >
                  <option value="All">All</option>
                  {languages.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.language}
                    </option>
                  ))}
                </select>
              </div>
              <div css={buyStyles.filterItem}>
                <label htmlFor="RecentlyReleased">Recently Released</label>
                <input
                  checked={recentlyReleased}
                  type="checkbox"
                  name="RecentlyReleased"
                  id="RecentlyReleased"
                  onChange={handleCheckbox}
                />
              </div>
            </div>
          </div>
          <div css={buyStyles.btnContainer}>
            <button css={buyStyles.searchBtn}>Search</button>
          </div>
        </form>

        <section css={buyStyles.resultsContainer}>
          <h1>Books</h1>
          <p>
            Showing {booksVisible} of {books.length} books
          </p>
          <div css={buyStyles.results}>
            <div css={buyStyles.bookCardContainer}>
              {books.map((book) => {
                if (bookCount < booksVisible) {
                  bookCount++;
                  return <BookCard key={book.id} book={book} />;
                } else {
                  return null;
                }
              })}
            </div>
            {booksVisible < books.length && (
              <div css={buyStyles.btnContainer}>
                <button
                  css={buyStyles.searchBtn}
                  onClick={() => {
                    setMaxBooks(maxBooks + 10);
                  }}
                >
                  See More
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query;
  const domain = context.req.headers.host;
  const genres = await getGenres();
  const languages = await getLanguages();

  if (_.isEmpty(query)) {
    const res = await fetch(`http://${domain}/api/books`);
    const books = await res.json();
    return {
      props: {
        genres,
        languages,
        books,
      },
    };
  } else if (_.size(query) > 1) {
    const recentlyReleased = query.recentlyReleased as string;
    const res = await fetch(
      `http://${domain}/api/books/search?search=${query.search}&genre=${
        query.genre
      }&language=${
        query.language
      }&recentlyReleased=${recentlyReleased.trim()}&price=${
        query.price
      }&recentlyAdded=${query.recentlyAdded}`,
    );

    const { books } = await res.json();
    return {
      props: {
        genres,
        languages,
        books,
      },
    };
  } else if (query.search) {
    // get books that contain the query on title or author from the header search bar
    const res = await fetch(
      `http://${domain}/api/books/search?search=${query.search} `,
      undefined,
    );

    const books = await res.json();
    return {
      props: {
        genres,
        languages,
        books,
      },
    };
  }
  return {
    props: {
      genres,
      languages,
      books: [],
    },
  };
}
