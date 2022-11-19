import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import {
  get4BooksByCreatedAt,
  get4BooksByReleaseDate,
} from '../database/books';
import { styles } from '../styles/home';
import { BookSmallPreview } from '../types/book';
import { useSearch } from '../utilis/search';

type Props = {
  recentlyAddedBooks: BookSmallPreview[];
  recentlyReleasedBooks: BookSmallPreview[];
};

export default function Home({
  recentlyAddedBooks,
  recentlyReleasedBooks,
}: Props) {
  const { setRecentlyReleased } = useSearch();
  return (
    <>
      <Head>
        <title>Hand-me: secondhand bookstore</title>
        <meta name="description" content="Buy and sell used books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={styles.heroContainer}>
        <div css={styles.heroInnerContainer}>
          <div css={styles.heroText}>
            <img
              src="/Hand-me_nosub.svg"
              alt="Hand-me logo"
              css={styles.heroLogo}
            />
            <h2>The platform to buy and sell used books</h2>
            <div css={styles.btnContainer}>
              <Link href="/books/buy">
                <button css={styles.heroButton}>BUY</button>
              </Link>
              <Link href="/books/add">
                <button css={styles.heroButton}>SELL</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section css={styles.sectionRecentAdded}>
        <div css={styles.sectionInnerContainerRecentAdded}>
          <div css={styles.recentlyAddedTitle}>
            <h3>Recently Added Books</h3>
            <Link href="/books/buy?search=&genre=All&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=desc">
              <p>
                View all{' '}
                <Image
                  src="/chevron-right.png"
                  width={12}
                  height={12}
                  alt="view all icon"
                />
              </p>
            </Link>
          </div>
          <div css={styles.bookContainer}>
            {recentlyAddedBooks.map((book: BookSmallPreview) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      <section css={styles.sectionRecentReleased}>
        <div css={styles.sectionInnerContainerRecentAdded}>
          <div css={styles.recentlyAddedTitle}>
            <h3>Recently Released Books</h3>
            <Link href="/books/buy?search=&genre=All&language=All&recentlyReleased=true%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <p>
                View all{' '}
                <Image
                  src="/chevron-right.png"
                  width={12}
                  height={12}
                  alt="view all icon"
                />
              </p>
            </Link>
          </div>
          <div css={styles.bookContainer}>
            {recentlyReleasedBooks.map((book: BookSmallPreview) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const recentlyAddedBooks = await get4BooksByCreatedAt();
  const recentlyReleasedBooks = await get4BooksByReleaseDate();

  return {
    props: {
      recentlyAddedBooks,
      recentlyReleasedBooks,
    },
  };
}
