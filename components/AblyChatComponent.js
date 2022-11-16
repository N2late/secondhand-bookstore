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
  let inputBox = null;
  const messageEndRef = useRef(null);

  const [messageText, setMessageText] = useState('');
  const [receivedMessages, setReceivedMessages] = useState(conversationHistory);
  const messageTextIsEmpty = messageText.trim().length === 0;

  console.log('receivedMessages', receivedMessages);

  const [channel, ably] = useChannel(
    JSON.stringify(conversation),
    (message) => {
      // Here we're computing the state that'll be drawn into the message history
      // We do that by slicing the last 199 messages from the receivedMessages buffer
      const history = receivedMessages.slice(-199);
      setReceivedMessages([...history, message]);
    },
  );

  async function sendChatMessage() {
    channel.publish({
      name: JSON.stringify(myPersonalData.username),
      data: messageText,
    });
    // for saving the message in the database
    try {
      await fetch(`../api/inbox/message`, {
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

  console.log('receivedMessages', receivedMessages);
  const messages = receivedMessages.map((message) => {
    const sender = message.senderId || message.name.replaceAll('"', '');
    const author =
      sender === myPersonalData.username ||
      message.senderId === myPersonalData.id
        ? 'me'
        : correspondent.username;

    // get last index of message with senderId equals to mypersonaldata.id
    console.log(sender === myPersonalData.username);
    console.log('message.senderId', message.name);
    console.log('myPersonalData:', myPersonalData.username);
    console.log('sender', sender);
    console.log('author', author);
    console.log('correspondent', correspondent);

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
            : new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}{' '}
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
              src="/../public/send-icon.png"
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
