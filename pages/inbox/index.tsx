import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import InboxSingleConversationCard from '../../components/InboxSingleConversationCard';
import {
  getBuyerConversationsWithUserImgPathUsernameBookTitleLastMessageTimeByConversationId,
  getConversationsByUserId,
  getConversationsWithUserImgPathUsernameBookTitleLastMessageTimeByConversationId,
} from '../../database/conversations';
import { getUserBySessionToken } from '../../database/users';
import { addBookStyles } from '../../styles/books/addBook';
import { inboxStyles } from '../../styles/inbox';
import { ConversationInboxInfo } from '../../types/conversations';
import { conversationsWithTimeFormatted } from '../../utilis/conversations';

type Props = {
  conversations: {
    sellerConversations: ConversationInboxInfo[];
    buyerConversations: ConversationInboxInfo[];
  };
};

export default function Inbox({ conversations }: Props) {
  const { sellerConversations, buyerConversations } = conversations;
  const [selectedTypeOfConversation, setSelectedTypeOfConversation] =
    useState('buyer');
  const [deleteConversationId, setDeleteConversationId] = useState([]);

  return (
    <>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="inbox" />
      </Head>
      <main>
        <div css={inboxStyles.container}>
          <div css={addBookStyles.locationFlow}>
            <Link href="/">
              <p>Home</p>
            </Link>
            <Image
              src="/chevron-right.png"
              width={12}
              height={12}
              alt="chevron"
            />
            <p>inbox</p>
          </div>
          <h1>Inbox</h1>
          <div css={inboxStyles.ConversationsContainer}>
            <h3>My Conversations</h3>
            <div>
              <button
                onClick={() => setSelectedTypeOfConversation('buyer')}
                css={
                  selectedTypeOfConversation === 'buyer'
                    ? inboxStyles.conversationBtnSelected
                    : inboxStyles.conversationsButton
                }
              >
                Buyer
              </button>
              <button
                onClick={() => setSelectedTypeOfConversation('seller')}
                css={
                  selectedTypeOfConversation === 'seller'
                    ? inboxStyles.conversationBtnSelected
                    : inboxStyles.conversationsButton
                }
              >
                Seller
              </button>
            </div>
            <div css={inboxStyles.conversationsInnerContainer}>
              <button css={inboxStyles.deleteConversationsButton}>
                Delete selected messages
              </button>
              {selectedTypeOfConversation === 'buyer'
                ? buyerConversations.map((conversation) => (
                    <InboxSingleConversationCard
                      key={conversation.id}
                      conversation={conversation}
                    />
                  ))
                : sellerConversations.map((conversation) => (
                    <InboxSingleConversationCard
                      key={conversation.id}
                      conversation={conversation}
                    />
                  ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = await getUserBySessionToken(token);

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/inbox',
        permanent: false,
      },
    };
  }

  const userConversations = await getConversationsByUserId(user.id);

  if (!userConversations) {
    return {
      props: {
        conversations: [],
      },
    };
  }

  let buyerConversations = await Promise.all(
    userConversations.map(async (conversation) => {
      if (conversation.sellerId === user.id) {
        return;
      }
      const buyerConversationWithUserImgPathUsernameBookTitleLastMessageTime =
        await getBuyerConversationsWithUserImgPathUsernameBookTitleLastMessageTimeByConversationId(
          conversation.id,
        );
      return buyerConversationWithUserImgPathUsernameBookTitleLastMessageTime;
    }),
  );

  buyerConversations = buyerConversations.filter((conv) => conv !== undefined);

  // sort buyerConversations by createdAt descending

  buyerConversations = buyerConversations.sort((a, b) => {
    return (
      new Date(b?.createdAt as Date).getTime() -
      new Date(a?.createdAt as Date).getTime()
    );
  });

  let sellerConversations = await Promise.all(
    userConversations.map(async (conversation) => {
      if (conversation.buyerId === user.id) {
        return;
      }
      const sellerConversationWithUserImgPathUsernameBookTitleLastMessageTime =
        await getConversationsWithUserImgPathUsernameBookTitleLastMessageTimeByConversationId(
          conversation.id,
        );
      return sellerConversationWithUserImgPathUsernameBookTitleLastMessageTime;
    }),
  );

  sellerConversations = sellerConversations.filter(
    (conv) => conv !== undefined,
  );

  sellerConversations = sellerConversations.filter(
    (conv) => conv !== undefined,
  );

  // sort buyerConversations by createdAt descending

  sellerConversations = sellerConversations.sort((a, b) => {
    return (
      new Date(b?.createdAt as Date).getTime() -
      new Date(a?.createdAt as Date).getTime()
    );
  });

  if (_.size(sellerConversations[0])) {
    sellerConversations = conversationsWithTimeFormatted(
      sellerConversations as ConversationInboxInfo[],
    );
  } else {
    sellerConversations = [];
  }
  if (_.size(buyerConversations[0])) {
    buyerConversations = conversationsWithTimeFormatted(
      buyerConversations as ConversationInboxInfo[],
    );
  } else {
    buyerConversations = [];
  }

  return {
    props: {
      conversations: {
        buyerConversations,
        sellerConversations,
      },
    },
  };
}
