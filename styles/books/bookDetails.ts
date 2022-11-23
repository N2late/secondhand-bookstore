import { css } from '@emotion/react';

export const bookDetailsStyles = {
  loading: css`
    width: 100vw;
    margin-top: 150px;
    text-align: center;
    color: #a8866e;
    font-size: 1.5rem;
  `,
  error: css`
    width: 100vw;
    margin-top: 150px;
    text-align: center;
    color: #a8866e;
    p {
      color: #171520;
    }
  `,
  container: css`
    margin: 0 auto;
    margin-top: 100px;
    width: 95%;
    height: fit-content;
    @media screen and (max-width: 600px) {
      margin-top: 250px;
      width: 90%;
      min-height: 100vh;
    }
  `,
  locationFlow: css`
    padding-top: 20px;
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 14px;
    p {
      font-weight: 500;
      color: #a8866e;
    }
  `,
  flowBookTitle: css`
    color: black !important;
  `,

  bookDetailsContainer: css`
    width: 100%;
    display: flex;
    margin-top: 24px;
    @media screen and (max-width: 600px) {
    }
  `,

  bookCover: css`
    width: 50%;
    text-align: center;
  `,

  imgContainer: css`
    margin: 0 auto;
    > div {
      position: unset !important;
    }
  `,

  img: css`
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
    max-height: 500px;
    @media screen and (max-width: 600px) {
      width: 300px !important;
    }
  `,

  bookInfo: css`
    width: 50%;
  `,

  bookTitleContainer: css`
    display: flex;
  `,

  sold: css`
    color: red;
    font-size: 18px;
    font-weight: 700;
    margin-left: 10px;
  `,

  authorAndSeller: css`
    display: flex;
    justify-content: space-between;
    margin-right: 12px;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 500;
      font-size: 20px;
    }
  `,
  genre: css`
    margin-bottom: 24px;
    color: grey;
  `,
  priceStatus: css`
    display: flex;
    h2 {
      margin-right: 24px;
    }
    p {
      width: 100px;
      height: 25px;
      align-self: center;
      font-size: 18px;
      font-weight: 700;
      border-radius: 8px;
      color: #a8866e;
      background-color: #f1f1f1;
      text-align: center;
    }
  `,
  shippingCosts: css`
    font-size: 14px;
    color: green;
    font-size: 500;
    padding-bottom: 24px;
    border-bottom: 2px solid #f1f1f1;
  `,
  dynamicContainer: css``,
  SynopsisAndLangContainer: css`
    margin-top: 4px;
    margin-bottom: 12px;
    text-align: justify;
    p {
      white-space: pre-wrap;
      font-size: 14px;
      margin-bottom: 12px;
    }
  `,
  isOwner: css`
    display: flex;
    justify-content: center;
  `,
  btnEdit: css`
    width: 20%;
    height: 40px;
    background: #a8866e;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: #f8ede3;
    font-weight: 500;
    flex-grow: 0;
    margin: 0 auto;
    cursor: pointer;
    :hover {
      background: #f8ede3;
      color: #a8866e;
    }
    :focus {
      transform: scale(0.9);
    }
  `,

  btnDelete: css`
    width: 20%;
    height: 40px;
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 1px solid #a8866e;
    color: red;
    font-weight: 500;
    flex-grow: 0;
    margin: 0 auto;
    cursor: pointer;
    :hover {
      background: #f8ede3;
      font-weight: 700;
      color: red;
    }
    :focus {
      transform: scale(0.9);
    }
  `,

  btn: css`
    width: 20%;
    height: 40px;
    background: #a8866e;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: #f8ede3;
    font-weight: 500;
    flex-grow: 0;
    margin: 0 auto;
    cursor: pointer;
    :hover {
      background: #f8ede3;
      color: #a8866e;
    }
    :focus {
      transform: scale(0.9);
    }
  `,
  btnConfirmDelete: css`
    width: 20%;
    height: 40px;
    background: #ff8484;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: white;
    font-weight: 500;
    flex-grow: 0;
    margin: 0 auto;
    margin-right: 24px;
    cursor: pointer;
    :hover {
      background: white;
      color: red;
      font-weight: 700;
    }
    :focus {
      transform: scale(0.9);
    }
  `,
  btnCancelDelete: css`
    width: 20%;
    height: 40px;
    background: #f1f1f1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: black;
    font-weight: 500;
    flex-grow: 0;
    margin: 0 auto;
    cursor: pointer;
    :hover {
      background: white;
      color: black;
    }
    :focus {
      transform: scale(0.9);
    }
  `,
};
