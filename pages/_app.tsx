import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            text-decoration: none;
          }
          body {
            font-family: 'Nunito', sans-serif;
            font-size: 16px;
            line-height: 1.4;
          }
        `}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
