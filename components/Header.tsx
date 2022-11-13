import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styles } from '../styles/layout/header';
import { UserIdUsername } from '../types/user';
import { useSearch } from '../utilis/search';

type Props = {
  user?: UserIdUsername;
};

export function Anchor({
  children,
  ...restProps
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...restProps}>{children}</a>;
}

function Header({ user }: Props) {
  const { handleSearchOnKeyPress, handleOnChangeSearch, setSearch, setFilter } =
    useSearch();
  const router = useRouter();
  const page = router.pathname;

  async function handleHeaderOnKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      if (target.value) {
        await handleSearchOnKeyPress(e);
      }
    }
  }

  return page !== '/login' && page !== '/signup' ? (
    <header css={styles.header}>
      <div css={styles.container}>
        <div css={styles.logo}>
          <Link href="/">
            <Image src="/icon-512x512.png" alt="logo" width={180} height={60} />
          </Link>
        </div>
        {page !== '/books/buy' && (
          <div css={styles.searchBar}>
            <Image src="/search.png" alt="search" width={20} height={20} />
            <input
              onChange={handleOnChangeSearch}
              placeholder="Search for an author or a book title"
              onKeyPress={handleHeaderOnKeyPress}
            />
          </div>
        )}
        <nav css={styles.nav}>
          <ul css={styles.navList}>
            <li css={styles.navItem}>
              <Link
                href="/books/buy"
                onClick={() => {
                  setSearch('');
                  setFilter({ genre: 'All', language: 'All' });
                }}
              >
                Buy
              </Link>
            </li>
            <li css={styles.navItem}>
              <Link href="/books/add">Sell</Link>
            </li>
            {!user ? (
              <>
                <li css={styles.navItem}>
                  <Link href="/signup">Sign up</Link>
                </li>
                <li css={styles.navItem}>
                  <Link href="/login">Login</Link>
                </li>{' '}
              </>
            ) : (
              <>
                <li css={styles.navItem}>
                  <Link href="#abc">
                    <Image
                      src="/email_icon.png"
                      alt="inbox"
                      width={20}
                      height={20}
                    />
                  </Link>
                </li>
                <li css={styles.navItem}>
                  <Link href="/profile">
                    <Image
                      src="/profile_icon.png"
                      alt="profile"
                      width={20}
                      height={20}
                    />
                  </Link>
                </li>{' '}
                <li css={styles.navItem}>
                  <Anchor href="/logout">
                    <Image
                      src="/logout.png"
                      alt="logout"
                      width={20}
                      height={20}
                      title="Logout"
                    />
                  </Anchor>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  ) : null;
}

export default Header;
