import { css } from '@emotion/react';

export const styles = {
  container: css`
    position: relative;
    width: 33%;
    margin: 0 auto;
    margin-top: 2%;
    text-align: center;
    @media screen and (max-width: 600px) {
      margin-top: 200px;
      width: 60%;
      height: 300px;
    }

    h1 {
      margin-top: 24px;
      color: #a8866e;
      font-weight: 700;
      font-size: 2.5rem;
    }
    p {
      margin: 0 auto;
      width: 75%;
      font-weight: 700;
      font-size: 1.1rem;
      color: #a8866e;
      @media screen and (max-width: 600px) {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
  `,
  form: css``,
  userAuthInput: css`
    width: 80%;
    height: 40px;
    margin-top: 12px;
    margin-bottom: 12px;
    padding-left: 12px;
    border: none;
    background-color: #f1f1f1;
    color: #626262;
    font-weight: 500;
    font-size: 14px;
    border-radius: 4px;
    @media screen and (max-width: 600px) {
      margin-bottom: 30px;
      margin-top: 20px;
    }
  `,
  error: css`
    color: red !important;
    font-size: 0.8rem !important;
    margin-top: 4px !important;
  `,
  toggleText: css`
    color: #a8866e;
  `,
  button: css`
    margin-top: 12px;
    width: 50%;
    height: 40px;
    background: #a8866e;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: #f8ede3;
    font-weight: 600;
    flex-grow: 0;
    font-size: 18px;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      margin-top: 30px;
    }

    :hover {
      background: #f8ede3;
      color: #a8866e;
    }
    :focus {
      transform: scale(0.9);
    }
  `,
  createAccountLink: css`
    padding-top: 20px;
    color: #a8866e;
    font-weight: 500;
    font-size: 12px;
    cursor: pointer;
    a {
      color: blue;
      font-size: 16px;
      font-weight: 400;
      text-decoration: none;
    }
  `,
};
