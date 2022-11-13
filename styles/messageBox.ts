import { css } from '@emotion/react';

export const messageBoxStyles = {
  container: css`
    width: 100%;
    height: 100%;
    margin-top: 4px;
  `,
  error: css`
    color: red;
    font-size: 14px;
  `,
  textBox: css`
    margin-top: 12px;
    margin-left: 4px;
    width: 75%;
    height: 200px;
    border: 1px solid #a8866e;
    border-radius: 8px;
    padding: 10px;
  `,

  btnContainer: css`
    width: 100%;
    button {
      margin-right: 12px;
    }
  `,

  button: css`
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
};
