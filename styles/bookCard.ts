import { css } from '@emotion/react';

export const styles = {
  bookCardContainer: css`
    padding-top: 2%;
    width: 200px;
    height: 300px;
    box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.2);
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: white;
    cursor: pointer;
    &:hover {
      border: 1px solid #a8866e;
      transform: scale(1.02);
    }
  `,
  bookInnerContainer: css`
    height: 100%;
    position: relative;
  `,
  title: css`
    font-weight: 500;
  `,
  author: css`
    font-size: 14px;
    color: #626262;
  `,
  price: css`
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    bottom: 0;
    width: 100%;
  `,
};
