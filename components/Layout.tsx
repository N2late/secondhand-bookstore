import { css } from '@emotion/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
