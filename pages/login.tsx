import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styles } from '../styles/auth/auth';

type Props = {
  refreshUserProfile: (username: string) => Promise<void>;
};

function Login({ refreshUserProfile }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  const loginHandler = async () => {
    /* Sending a POST request to the server with the user's credentials. */
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    });
    const loginResponseBody = await loginResponse.json();

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }

    /* A security measure to prevent malicious users from redirecting to a different page. */
    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) &&
      // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      await refreshUserProfile(loginResponseBody.user.username);
      return await router.push(returnTo);
    }

    // refresh the user on state
    await refreshUserProfile(loginResponseBody.user.username);
    // redirect user to user profile
    await router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login new users" />
      </Head>
      <div css={styles.container}>
        <Link href="/">
          <Image src="/icon-512x512.png" alt="logo" width={255} height={80} />
        </Link>
        <h1>Login</h1>
        <p>Login and start buy and / or sell used books </p>
        {errors.map((error) => (
          <p css={styles.error} key={error.message}>
            {error.message}
          </p>
        ))}
        <form
          css={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            await loginHandler();
          }}
        >
          <input
            css={styles.userAuthInput}
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            css={styles.userAuthInput}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button css={styles.button}>Login</button>
          <br />
        </form>
        <p css={styles.createAccountLink}>
          Don't have an account yet? <Link href="/signup">Create one now</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
