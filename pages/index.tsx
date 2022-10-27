import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import { styles } from '../styles/home';
import { Book, books } from '../types/books';

export default function Home() {
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
              <Link href="/buy">
                <button css={styles.heroButton}>BUY</button>
              </Link>
              <Link href="/sell">
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
            <p>
              View all{' '}
              <Image
                src="/chevron-right.png"
                width={12}
                height={12}
                alt="view all icon"
              />
            </p>
          </div>
          <div css={styles.bookContainer}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      <section css={styles.sectionRecentReleased}>
        <div css={styles.sectionInnerContainerRecentAdded}>
          <div css={styles.recentlyAddedTitle}>
            <h3>Recently Released Books</h3>
            <p>
              View all{' '}
              <Image
                src="/chevron-right.png"
                width={12}
                height={12}
                alt="view all icon"
              />
            </p>
          </div>
          <div css={styles.bookContainer}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
