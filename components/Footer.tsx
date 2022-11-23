import Image from 'next/image';
import Link from 'next/link';
import { styles } from '../styles/layout/footer';

function Footer() {
  return (
    <footer css={styles.footer}>
      <div css={styles.info}>
        <div>
          <h3>Search by Popular Genres</h3>
          <ul>
            <Link href="http://localhost:3000/books/buy?search=&genre=26&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <li>Action </li>
            </Link>
            <Link href="http://localhost:3000/books/buy?search=&genre=30&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <li> Drama</li>
            </Link>
            <Link href="http://localhost:3000/books/buy?search=&genre=31&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <li>Fantasy</li>
            </Link>
            <Link href="http://localhost:3000/books/buy?search=&genre=32&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <li>Historical</li>
            </Link>
            <Link href="http://localhost:3000/books/buy?search=&genre=47&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <li>Memoir</li>
            </Link>
            <Link href="http://localhost:3000/books/buy?search=&genre=50&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <li>Non-Fiction</li>
            </Link>
            <Link href="http://localhost:3000/books/buy?search=&genre=36&language=All&recentlyReleased=false%20%20%20%20%20%20%20%20&price=asc&recentlyAdded=asc">
              <li>Romance</li>
            </Link>
          </ul>
        </div>
        <div>
          <h3>About</h3>
          <ul>
            <li>Contact Us</li>
            <li>About us</li>
          </ul>
        </div>
        <div>
          <h3>Policy</h3>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div css={styles.socialContainer}>
        <div css={styles.social}>
          <div css={styles.socialIcons}>
            <Link href="www.facebook.com">
              <Image src="/fb_logo.png" alt="Facebook" width={32} height={32} />
            </Link>
          </div>
          <div css={styles.socialIcons}>
            <Link href="www.instagram.com">
              <Image
                src="/insta_logo.png"
                alt="Instagram"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div css={styles.socialIcons}>
            <Link href="www.twitter.com">
              <Image
                src="/twitter_logo.png"
                alt="Twitter"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div css={styles.socialIcons}>
            <Link href="www.youtube.com">
              <Image
                src="/youtube_logo.png"
                alt="Youtube"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>
        <Image src="/location.png" alt="location" width={16} height={16} />
        <span>Austria</span>
        <p>© 2022 | Hand-Me All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
