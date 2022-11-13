import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { UserIdUsername } from '../types/user';
import { ProvideSearch } from '../utilis/search';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserIdUsername | undefined>(undefined);

  /* A function that is called when the user is logged in. */
  const refreshUserProfile = useCallback(
    async (username: string | undefined) => {
      const profileResponse = await fetch(`/api/users/${username}`);
      const data = await profileResponse.json();
      if ('errors' in profileResponse) {
        setUser(undefined);
      } else {
        setUser({ id: data.user.id, username: data.user.username });
      }
    },
    [],
  );

  /* Calling the refreshUserProfile function and catching any errors. */
  useEffect(() => {
    refreshUserProfile(user?.username).catch(() =>
      console.log('Error refreshing user profile'),
    );
  }, [refreshUserProfile, user?.username]);

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
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      <ProvideSearch>
        <Layout user={user}>
          <Component
            {...pageProps}
            refreshUserProfile={refreshUserProfile}
            setUser={setUser}
          />
        </Layout>
      </ProvideSearch>
    </>
  );
}
