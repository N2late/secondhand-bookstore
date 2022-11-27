import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ablyChatStyles } from '../styles/ablyChat';
import { useChannel } from './AblyReactEffect.js';

const AblyChatComponent = ({
  conversation,
  conversationHistory,
  myPersonalData,
  correspondent,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let inputBox = null;
  const messageEndRef = useRef(null);

  const [messageText, setMessageText] = useState('');
  const [receivedMessages, setReceivedMessages] = useState(conversationHistory);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel] = useChannel(JSON.stringify(conversation), (message) => {
    // Here we're computing the state that'll be drawn into the message history
    // We do that by slicing the last 199 messages from the receivedMessages buffer
    const history = receivedMessages.slice(-199);
    setReceivedMessages([...history, message]);
  });

  let hostname;
  if (typeof window !== 'undefined') {
    hostname = window.location.hostname;
  }

  const domain =
    hostname === 'localhost' ? '' : 'https://secondhand-bookstore.fly.dev/';

  async function sendChatMessage() {
    channel.publish({
      name: JSON.stringify(myPersonalData.username),
      data: messageText,
    });
    // for saving the message in the database
    try {
      await fetch(`${domain}../api/inbox/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: conversation.id,
          messageBody: messageText,
        }),
      });
    } catch (err) {
      console.error('Error in sendChatMessage: ', err);
    }
    setMessageText('');
  }

  async function handleFormSubmission(event) {
    event.preventDefault();
    await sendChatMessage();
  }

  async function handleKeyPress(event) {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    event.preventDefault();
    await sendChatMessage();
  }

  /* It's a function that takes the receivedMessages array and maps it to a new array of messages. */
  const messages = receivedMessages.map((message) => {
    const sender = message.senderId || message.name.replaceAll('"', '');
    const author =
      sender === myPersonalData.username ||
      message.senderId === myPersonalData.id
        ? 'me'
        : correspondent.username;

    return (
      <div
        key={message.id}
        css={ablyChatStyles.messageTextStyle(
          sender === myPersonalData.username || sender === myPersonalData.id,
        )}
      >
        <p key={`author-${sender}-${message.id}}`} data-author={author}>
          {message.messageBody && message.messageBody}
          {message.data && message.data}
        </p>
        <p css={ablyChatStyles.time}>
          {' '}
          {author}
          <br />
          {message.createdAt
            ? message.createdAt
            : new Date(message.timestamp).toLocaleString('de-AT', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })}
        </p>
      </div>
    );
  });

  useEffect(() => {
    messageEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [receivedMessages]);

  return (
    <div css={ablyChatStyles.chatHolder}>
      <div css={ablyChatStyles.chatText}>
        {messages}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleFormSubmission} css={ablyChatStyles.form}>
        <div css={ablyChatStyles.textButtonContainer}>
          <textarea
            ref={(element) => {
              inputBox = element;
            }}
            value={messageText}
            placeholder="Type a message..."
            onChange={(event) => setMessageText(event.target.value)}
            onKeyPress={(event) => handleKeyPress(event)}
            css={ablyChatStyles.textarea}
            maxLength={600}
          />
          <button css={ablyChatStyles.button} disabled={messageTextIsEmpty}>
            <Image
              src="/send-icon.png"
              alt="send button"
              width={30}
              height={30}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AblyChatComponent;
