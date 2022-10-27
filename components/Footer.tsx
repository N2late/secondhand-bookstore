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
            <li>Classics</li>
            <li>Romance</li>
            <li>Fiction</li>
            <li>Non-Fiction</li>
            <li>Fantasy</li>
            <li>Young Adult</li>
            <li>Children's</li>
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
              <Image
                src="/../public/fb_logo.png"
                alt="Facebook"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div css={styles.socialIcons}>
            <Link href="www.instagram.com">
              <Image
                src="/../public/insta_logo.png"
                alt="Instagram"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div css={styles.socialIcons}>
            <Link href="www.twitter.com">
              <Image
                src="/../public/twitter_logo.png"
                alt="Twitter"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div css={styles.socialIcons}>
            <Link href="www.youtube.com">
              <Image
                src="/../public/youtube_logo.png"
                alt="Youtube"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>
        <Image
          src="/../public/location.png"
          alt="location"
          width={16}
          height={16}
        />
        <span>Austria</span>
        <p>© 2022 | Hand-Me All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
