import { css } from '@emotion/react';

export const conversationStyles = {
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
    @media screen and (max-width: 600px) {
      margin-top: 270px;
    }
  `,
  locationFlow: css`
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 14px;
    p :nth-of-type(1) {
      font-weight: 500;
      color: #a8866e;
    }
  `,
  title: css`
    color: black;
  `,
  bookInfoAndChatContainer: css``,
  bookInfoContainer: css`
    width: 95%;
    padding: 20px;
    display: flex;
    @media screen and (max-width: 600px) {
      flex-direction: column;
      justify-content: center;
    }
  `,
  bookInfo: css`
    display: flex;
    width: 30%;
    @media screen and (max-width: 600px) {
      width: 100%;
      margin-bottom: 50px;
    }
    img {
      border-radius: 8px;
    }
  `,
  bookInfoText: css`
    padding-left: 12px;
  `,
  author: css`
    margin-top: -5px;
    padding-bottom: 4px;
  `,
  price: css`
    font-weight: 700;
  `,
  shipping: css`
    font-size: 14px;
    color: green;
    font-size: 500;
  `,
  ablyContainer: css`
    width: 60%;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
    padding: 20px;
    border-radius: 8px;
    border: 2px solid #e6e6e6;
    margin-left: 20px;
  `,
};
