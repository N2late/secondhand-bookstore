import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { styles } from '../styles/bookCard';
import { BookSmallPreview } from '../types/book';

type Props = {
  book: BookSmallPreview;
};

function BookCard(props: Props) {
  const { book } = props;
  const { title, author, price } = book;

  return (
    <div css={styles.bookCardContainer}>
      <div css={styles.bookInnerContainer}>
        <Link href={`/books/${book.id}`}>
          <CldImage
            src={book.imgPath.slice(50)}
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
