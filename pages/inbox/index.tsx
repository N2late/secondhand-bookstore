import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Anchor } from '../../components/Header';
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
  let { sellerConversations, buyerConversations } = conversations;
  const [sellerConversationsState, setSellerConversationsState] =
    useState(sellerConversations);
  const [buyerConversationsState, setBuyerConversationsState] =
    useState(buyerConversations);
  const [selectedTypeOfConversation, setSelectedTypeOfConversation] =
    useState('buyer');
  const [deleteConversationId, setDeleteConversationId] = useState([]);

  async function handleDeleteConversations() {
    const res = await fetch('/api/inbox', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationIds: deleteConversationId,
      }),
    });
    if (res.ok) {
      const conversationsDeleted = await res.json();

      const newSellerConversations = sellerConversationsState.filter(
        (conversation) => !conversationsDeleted.includes(conversation.id),
      );
      const newBuyerConversations = buyerConversationsState.filter(
        (conversation) => !conversationsDeleted.includes(conversation.id),
      );
      setSellerConversationsState(newSellerConversations);
      setBuyerConversationsState(newBuyerConversations);
      buyerConversations = newBuyerConversations;
      sellerConversations = newSellerConversations;

      setDeleteConversationId([]);
    } else {
      console.log('error deleting conversations');
    }
  }

  return (
    <>
      <Head>
        <title>Hand me - Your Secondhand Bookstore</title>
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
              <button
                css={inboxStyles.deleteConversationsButton}
                onClick={handleDeleteConversations}
              >
                Delete selected messages
              </button>

              {selectedTypeOfConversation === 'buyer' ? (
                _.size(buyerConversations) === 0 ||
                buyerConversationsState.length === 0 ? (
                  <p>You don't have any conversations ongoing as a buyer</p>
                ) : (
                  buyerConversationsState.map((conversation) => (
                    <InboxSingleConversationCard
                      key={conversation.id}
                      conversation={conversation}
                      setDeleteConversationId={
                        setDeleteConversationId as (
                          prev: any,
                        ) => (string | number)[]
                      }
                    />
                  ))
                )
              ) : _.size(sellerConversations) === 0 ||
                sellerConversationsState.length === 0 ? (
                <p>You don't have any conversations ongoing as a seller</p>
              ) : (
                sellerConversationsState.map((conversation) => (
                  <InboxSingleConversationCard
                    key={conversation.id}
                    conversation={conversation}
                    setDeleteConversationId={
                      setDeleteConversationId as (
                        prev: any,
                      ) => (string | number)[]
                    }
                  />
                ))
              )}
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

  if (_.size(userConversations) === 0) {
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
