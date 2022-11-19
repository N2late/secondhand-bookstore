import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { CldImage } from 'next-cloudinary';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getBookByIdWithUsername } from '../../database/books';
import {
  getConversationByConversationId,
  getCorrespondentById,
  getMessagesByConversationId,
} from '../../database/conversations';
import {
  getUserByIdWithImgPath,
  getUserBySessionToken,
} from '../../database/users';
import { conversationStyles } from '../../styles/conversation';
import { BookWithUsername } from '../../types/book';
import {
  Conversation,
  Correspondent,
  Message,
} from '../../types/conversations';
import { User } from '../../types/user';
import { conversationHistoryWithTimeFormatted } from '../../utilis/conversations';

/* A way to import a component that is not server side rendered. */
// eslint-disable-next-line @typescript-eslint/naming-convention
const AblyChatComponent = dynamic(
  () => import('../../components/AblyChatComponent'),
  { ssr: false },
);

type Props = {
  conversationInfo: Conversation;
  book: BookWithUsername;
  correspondent: Correspondent;
  myPersonalData: User;
  conversationHistory: Message[];
};

export default function ConversationPage({
  conversationInfo,
  book,
  correspondent,
  myPersonalData,
  conversationHistory,
}: Props) {
  return (
    <>
      <Head>
        <title>Inbox: conversation</title>
        <meta name="conversation" content="conversation with a user" />
      </Head>
      <main>
        <div css={conversationStyles.container}>
          <div css={conversationStyles.locationFlow}>
            <Link href="/">
              <p>Home</p>
            </Link>
            <Image
              src="/chevron-right.png"
              width={12}
              height={12}
              alt="chevron"
            />
            <Link href="/inbox">
              <p>Inbox</p>
            </Link>
            <Image
              src="/chevron-right.png"
              width={12}
              height={12}
              alt="chevron"
            />
            <p>{book.title}</p>
          </div>
          <h1>
            Your conversation with{' '}
            <span css={conversationStyles.title}>{correspondent.username}</span>
          </h1>
          <div css={conversationStyles.bookInfoAndChatContainer}>
            <div css={conversationStyles.bookInfoContainer}>
              <div css={conversationStyles.bookInfo}>
                <CldImage
                  src={book.imgPath.slice(50)}
                  width={80}
                  height={120}
                  alt="book cover"
                />
                <div css={conversationStyles.bookInfoText}>
                  <h2>{book.title}</h2>
                  <p css={conversationStyles.author}>{book.author}</p>
                  <p css={conversationStyles.price}>€ {book.price}</p>
                  {book.shippingIncluded ? (
                    <p css={conversationStyles.shipping}>Shipping Included</p>
                  ) : null}
                  <p>Seller: {book.seller}</p>
                </div>
              </div>
              <div css={conversationStyles.ablyContainer}>
                <AblyChatComponent
                  conversation={conversationInfo}
                  conversationHistory={conversationHistory}
                  myPersonalData={myPersonalData}
                  correspondent={correspondent}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { conversationId } = context.query;
  const token = context.req.cookies.sessionToken;
  const user = await getUserBySessionToken(token);

  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/inbox/${conversationId}`,
        permanent: false,
      },
    };
  }

  const conversationInfo = await getConversationByConversationId(
    Number(conversationId),
  );

  if (_.size(conversationInfo) === 0) {
    return {
      notFound: true,
    };
  }

  const book = await getBookByIdWithUsername(conversationInfo.bookId);

  const myPersonalData = await getUserByIdWithImgPath(user.id);

  const correspondent = await getCorrespondentById(
    book.seller === user.username ? conversationInfo.buyerId : book.userId,
  );

  let conversationHistory = await getMessagesByConversationId(
    Number(conversationId),
  );

  conversationHistory = conversationHistoryWithTimeFormatted(
    conversationHistory as any,
  );

  return {
    props: {
      conversationInfo,
      book,
      correspondent,
      myPersonalData,
      conversationHistory,
    },
  };
}
