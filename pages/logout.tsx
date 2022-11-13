import cookie from 'cookie';
import { GetServerSideProps } from 'next';
import { deleteSessionByToken } from '../database/sessions';

export default function Logout() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.sessionToken;

  /* Deleting the session token from the database and then deleting the cookie from the browser. */
  if (token) {
    await deleteSessionByToken(token);
    context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
