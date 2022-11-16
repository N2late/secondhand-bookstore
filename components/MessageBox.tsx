import Link from 'next/link';
import { useState } from 'react';
import { messageBoxStyles } from '../styles/messageBox';

type Props = {
  messageSent: boolean;
  setMessageSent: (value: boolean) => void;
  setSendMessage: (value: boolean) => void;
  bookId: number;
  sellerId: number;
  userId: number;
};

function MessageBox({
  messageSent,
  setMessageSent,
  setSendMessage,
  bookId,
  sellerId,
  userId,
}: Props) {
  const [message, setMessage] = useState('');
  const [messageSentError, setMessageSentError] = useState('');

  const handleOnClick = async () => {
    if (message.length < 10) {
      setMessageSentError('Please write a message');
      return;
    }
    const data = await fetch('/api/inbox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sellerId,
        buyerId: userId,
        bookId,
        messageBody: message,
      }),
    });
    const newMessage = await data.json();
    if (newMessage.errors) {
      setMessageSentError(newMessage.errors[0].message);
      return;
    } else {
      setMessageSent(true);
    }
  };

  return !messageSent ? (
    <div css={messageBoxStyles.container}>
      {messageSentError ? (
        <p css={messageBoxStyles.error}>{messageSentError}</p>
      ) : null}
      <p>Send a message to the seller to arrange and finalize the deal.</p>
      <textarea
        css={messageBoxStyles.textBox}
        placeholder="Write your message here"
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <div css={messageBoxStyles.btnContainer}>
        <button css={messageBoxStyles.button} onClick={handleOnClick}>
          Send
        </button>
        <button
          css={messageBoxStyles.button}
          onClick={() => setSendMessage(false)}
        >
          Back
        </button>
      </div>
    </div>
  ) : (
    <div css={messageBoxStyles.container}>
      <p>Message sent!</p>
      <p>
        Keep browsing for more{' '}
        <Link href="/books/buy">
          <strong>books</strong>
        </Link>
        .
      </p>
    </div>
  );
}

export default MessageBox;
