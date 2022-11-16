import { css } from '@emotion/react';

export const inboxStyles = {
  container: css`
    margin: 0 auto;
    margin-top: 100px;
    width: 95%;
    height: fit-content;
    h1 {
      font-size: 28px;
      font-weight: 800;
      color: #a8866e;
      padding: 8px;
    }
  `,
  ConversationsContainer: css`
    width: 100%;
    h3 {
      padding: 18px;
      font-size: 18px;
      font-weight: 500;
      width: 100%;
      text-align: start;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 12px;
    }
  `,
  conversationsButton: css`
    width: 60px;
    margin-right: 18px;
    background-color: white;
    border: 2px solid #a8866e;
    border-radius: 8px;
    color: #a8866e;
    padding: 8px;
    font-weight: 500;
    cursor: pointer;
    :hover {
      background: #f8ede3;
      color: #a8866e;
      font-weight: 700;
    }
    :focus {
      transform: scale(1.05);
      background: #f8ede3;
      color: #a8866e;
      font-weight: 700;
    }
  `,

  conversationBtnSelected: css`
    transform: scale(1.05);
    color: #a8866e;
    font-weight: 700;
    width: 60px;
    margin-right: 18px;
    border: 2px solid #a8866e;
    border-radius: 8px;
    padding: 8px;
    background-color: #f1f1f1;
    cursor: pointer;
  `,
  conversationsInnerContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,

  deleteConversationsButton: css`
    width: 185px;
    margin-bottom: 20px;
    align-self: flex-end;
    margin-left: 20px;
    background-color: white;
    border: 1px solid #b00020;
    border-radius: 8px;
    color: #b00020;
    padding: 8px;
    font-weight: 500;
    cursor: pointer;
    :hover {
      background: white;
      font-weight: 700;
      color: #b00020;
    }
    :focus {
      transform: scale(1.05);
    }
  `,

  link: css`
    text-decoration: none;
    color: black;
  `,

  conversationsBox: css`
    padding: 12px;
    display: flex;
    width: 600px;
    height: 80px;
    margin-left: 20px;
    margin-bottom: 12px;
    background-color: #f1f1f1;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
  `,
  conversationsBoxInner: css`
    display: flex;
    align-items: center;
    gap: 5px;
  `,

  conversationsBoxAvatar: css`
    padding-left: 4px;

    img {
      border-radius: 50px;
    }
  `,
};
