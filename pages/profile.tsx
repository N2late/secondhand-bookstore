import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BookCard from '../components/BookCard';
import UploadProfilePic from '../components/UploadProfilePic';
import { getBooksByUserId } from '../database/books';
import { getUserBySessionTokenWithImgEmail } from '../database/users';
import { styles } from '../styles/auth/auth';
import { bookDetailsStyles } from '../styles/books/bookDetails';
import { profileStyles } from '../styles/profile';
import { BookSmallPreview } from '../types/book';
import { User } from '../types/user';

type Props = {
  user: User;
  books: BookSmallPreview[];
  cloudinaryAPI: string;
  refreshUserProfile: (arg: undefined) => void;
  setUser: (arg: undefined) => void;
};

export default function Profile({
  user,
  books,
  cloudinaryAPI,
  refreshUserProfile,
  setUser,
}: Props) {
  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [profilePicture, setProfilePicture] = useState(user.imgPath);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        imgPath: profilePicture,
      }),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors([]);
      setEditProfile(false);
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/users/${user.username}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors([]);
      setUser(undefined);
      alert('Your account has been deleted');
      await router.push('/logout');
    }
  };

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="User private profile" />
      </Head>
      <main>
        <div css={profileStyles.container}>
          <h1>My Profile</h1>
          <form css={profileStyles.formContainer} onSubmit={handleSubmit}>
            <h3>Personal Information</h3>
            <div css={profileStyles.profilePicContainer}>
              <div css={profileStyles.profilePic}>
                <Image
                  src={String(profilePicture)}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  css={profileStyles.img}
                />
              </div>
              {editProfile ? (
                <UploadProfilePic
                  setProfilePicture={setProfilePicture}
                  cloudinaryAPI={cloudinaryAPI}
                />
              ) : (
                <div css={profileStyles.editOrDeleteProfileContainer}>
                  <button
                    type="button"
                    css={profileStyles.editProfileBtn}
                    onClick={() => setEditProfile(true)}
                  >
                    Edit Profile
                  </button>
                  {!deleteConfirmation ? (
                    <button
                      css={profileStyles.deleteProfileBtn}
                      type="button"
                      onClick={() => setDeleteConfirmation(true)}
                    >
                      <Image
                        src="/delete-small.png"
                        width={14}
                        height={14}
                        alt="trash"
                      />
                      Delete Profile
                    </button>
                  ) : (
                    <div>
                      <p>Are you sure you want to delete your account?</p>
                      <button
                        type="button"
                        css={bookDetailsStyles.btnConfirmDelete}
                        onClick={handleDelete}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        css={bookDetailsStyles.btnCancelDelete}
                        onClick={() => setDeleteConfirmation(false)}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.map((error) => {
              return (
                <p css={styles.error} key={error.message}>
                  !Error: {error.message}
                </p>
              );
            })}
            <div css={profileStyles.userInfo}>
              <div>
                <label htmlFor="Username">Username: </label>
                {editProfile ? (
                  <input
                    css={profileStyles.userTextInfo}
                    name="Username"
                    id="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <p css={profileStyles.userTextInfo}>{username}</p>
                )}
              </div>
              <div>
                <label htmlFor="Email">Email: </label>
                {editProfile ? (
                  <input
                    css={profileStyles.userTextInfo}
                    type="email"
                    name="Email"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p css={profileStyles.userTextInfo}>{email}</p>
                )}
              </div>
            </div>
            {editProfile ? (
              <button css={profileStyles.saveBtn}>Save Changes</button>
            ) : null}
          </form>
          <div css={profileStyles.myBooksContainer}>
            <h3>My Books</h3>
            <div css={profileStyles.myBooks}>
              <div css={profileStyles.bookCardContainer}>
                {books.length > 0 ? (
                  books.map((book) => <BookCard key={book.id} book={book} />)
                ) : (
                  <div>
                    <p>You didn't add any book for sell, yet.</p>
                    <p>
                      Start adding books <Link href="/books/add">here</Link>.
                    </p>
                  </div>
                )}
              </div>
              <div css={profileStyles.footerMargin}> </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = await getUserBySessionTokenWithImgEmail(token);

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const cloudinaryAPI = process.env.CLOUDINARY_KEY;
  const books = await getBooksByUserId(String(user.id));

  return {
    props: {
      user,
      books,
      cloudinaryAPI,
    },
  };
}
