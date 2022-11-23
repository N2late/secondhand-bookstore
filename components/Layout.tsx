import { css } from '@emotion/react';
import Head from 'next/head';
import { UserIdUsername } from '../types/user';
import Footer from './Footer';
import Header from './Header';

const contentWrap = css`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  @media screen and (max-width: 600px) {
    min-height: 1220px;
  }
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
