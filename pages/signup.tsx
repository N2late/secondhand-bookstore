import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styles } from '../styles/auth/auth';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

function SignUp({ refreshUserProfile }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [toggle, setToggle] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  const signUpHandler = async () => {
    /* Sending a POST request to the server with the user's credentials. */
    const signUpResponse = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
        email: email.toLowerCase(),
      }),
    });
    const signUpResponseBody = await signUpResponse.json();
    if (signUpResponseBody.errors) {
      setErrors(signUpResponseBody.errors);
      return console.log(signUpResponseBody.errors);
    }

    /* A security measure to prevent malicious users from redirecting to a different page. */
    const returnTo = router.query.returnTo as string;
    if (
      returnTo &&
      // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await refreshUserProfile();
    // redirect user to user profile
    await router.push('/');
  };

  return (
    <>
      <Head>
        <title>Hand me - Your Secondhand Bookstore</title>
        <meta
          name="description"
          content="Sing up into Hand-me secondhand bookstore account"
        />
      </Head>
      <div css={styles.container}>
        <Link href="/">
          <Image src="/icon-512x512.png" alt="logo" width={255} height={80} />
        </Link>
        <h1>Sign up</h1>
        <p>Sign up and start buy and / or sell used books </p>
        {errors.map((error) => {
          return (
            <p css={styles.error} key={error.message}>
              {error.message}
            </p>
          );
        })}
        <form
          css={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            if (toggle !== 'checked') {
              setErrors([
                {
                  message:
                    'You need to agree to the terms and conditions in order to create an account',
                },
              ]);
              return;
            }
            if (confPassword !== password) {
              setErrors([{ message: 'Passwords do not match' }]);
              return;
            }
            // setErrors([]);
            await signUpHandler();
          }}
        >
          <input
            css={styles.userAuthInput}
            value={email}
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            css={styles.userAuthInput}
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            css={styles.userAuthInput}
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            value={confPassword}
            css={styles.userAuthInput}
            type="password"
            placeholder="confirm password"
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <br />
          <input
            type="checkbox"
            onChange={() =>
              toggle === 'checked'
                ? setToggle('not checked')
                : setToggle('checked')
            }
          />{' '}
          <span css={styles.toggleText}>
            I agree to the terms and conditions
          </span>
          <br />
          <button css={styles.button}>Sign up</button>
        </form>
        <p css={styles.createAccountLink}>
          Already have an account? <Link href="/login">Login </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
