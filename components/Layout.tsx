import { css } from '@emotion/react';
import Head from 'next/head';
import { UserIdUsername } from '../types/user';
import Footer from './Footer';
import Header from './Header';

const contentWrap = css`
  padding-bottom: 50px;
`;

type Props = {
  children: React.ReactNode;
  user?: UserIdUsername;
};

function Layout({ children, user }: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={user} />
      <main css={contentWrap}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
