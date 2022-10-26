import { css } from '@emotion/react';

export const styles = {
  header: css`
    position: fixed;
    width: 100%;
    height: 80px;
  `,
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  `,

  logo: css`
    margin-left: 40px;
  `,
  searchBar: css`
    position: relative;
    left: -10%;
    background-color: #f8ede3;
    border-radius: 8px;
    width: 350px;
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    input {
      margin-left: 4px;
      width: 325px;
      height: 40px;
      background-color: #f8ede3;
      border: none;
    }
  `,
  nav: css``,
  navList: css`
    display: flex;
    align-items: center;
    gap: 40px;
    list-style: none;
    font-weight: 700;
    font-size: 20px;
    margin-right: 40px;
    a {
      color: #a8866e;
    }
  `,
  navItem: css`
    margin-right: 12px;
  `,
};
