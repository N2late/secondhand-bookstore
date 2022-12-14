import { css } from '@emotion/react';

export const styles = {
  footer: css`
    background-color: #a8866e;
    width: 100%;
    height: 230px;
    display: flex;
    padding: 40px;
    padding-top: 10px;
    justify-content: space-between;
    font-size: 12px;
    margin-top: auto;
  `,
  info: css`
    display: flex;
    gap: 40px;
    h3 {
      padding-top: 4px;
      width: 150px;
      height: 70px;
      font-size: 14px;
    }
    ul {
      padding: 0;
    }
    li {
      list-style: none;
      margin-bottom: 4px;
      color: #f8ede3;
    }
  `,
  socialContainer: css`
    padding: 40px;
    padding-top: 4px;
    span,
    p {
      color: #f8ede3;
    }
  `,
  social: css`
    display: flex;
    margin-bottom: 12px;
  `,
  socialIcons: css`
    margin-right: 20px;
  `,
};
