import Image from 'next/image';
import Link from 'next/link';
import { styles } from '../styles/bookCard';
import { Book } from '../types/books';

type Props = {
  book: Book;
};

function BookCard(props: Props) {
  const { book } = props;
  const { title, author, price, path } = book;

  return (
    <div css={styles.bookCardContainer}>
      <div css={styles.bookInnerContainer}>
        <Link href="#abc">
          <Image
            src={path}
            width={150}
            height={175}
            alt={`${title} book cover`}
          />
        </Link>
        <p css={styles.title}>{title}</p>
        <p css={styles.author}>{author}</p>
        <p css={styles.price}>€{price}</p>
      </div>
    </div>
  );
}

export default BookCard;
