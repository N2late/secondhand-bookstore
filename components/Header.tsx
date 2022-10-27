import Image from 'next/image';
import Link from 'next/link';
import { styles } from '../styles/layout/header';

function Header() {
  return (
    <header css={styles.header}>
      <div css={styles.container}>
        <div css={styles.logo}>
          <Link href="/">
            <Image src="/icon-512x512.png" alt="logo" width={130} height={80} />
          </Link>
        </div>
        <div css={styles.searchBar}>
          <Image src="/search.png" alt="search" width={20} height={20} />
          <input placeholder="Search for an author or a book title" />
        </div>
        <nav css={styles.nav}>
          <ul css={styles.navList}>
            <li css={styles.navItem}>
              <a href="/buy">Buy</a>
            </li>
            <li css={styles.navItem}>
              <a href="/sell">Sell</a>
            </li>
            <li css={styles.navItem}>
              <a href="/signin">Sign in</a>
            </li>
            <li css={styles.navItem}>
              <a href="/signup">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
