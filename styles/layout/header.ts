import { css } from '@emotion/react';

export const styles = {
  header: css`
    position: fixed;
    top: 0;
    width: 95%;
    height: 80px;
    @media screen and (max-width: 600px) {
      height: 170px;
      margin-top: 30px;
    }
    margin-left: 2.5%;
    margin-right: 2.5%;
    z-index: 1;
    background-color: white;
  `,
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin-right: 2%;
    @media screen and (max-width: 600px) {
      flex-direction: column;
      justify-content: center;
      gap: 1em;
    }
  `,

  logo: css``,
  searchBar: css`
    width: 27%;
    @media screen and (max-width: 600px) {
      width: 50%;
      left: 0;
    }
    position: relative;
    left: -5%;
    background-color: #f8ede3;
    border-radius: 8px;
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    input {
      margin-left: 4px;
      width: 100%;
      height: 100%;
      background-color: #f8ede3;
      border: none;
    }
  `,
  nav: css`
    width: 35%;
    @media screen and (max-width: 600px) {
      width: 45%;
    }
  `,
  navList: css`
    width: 100%;
    display: flex;
    align-items: center;
    list-style: none;
    font-weight: 700;
    font-size: 20px;
    margin-right: 40px;
    a {
      color: #a8866e;
    }
    @media screen and (max-width: 600px) {
      margin-right: 0;
    }
  `,
  navItem: css`
    flex: 1;
    margin-right: 8px;
    @media screen and (max-width: 600px) {
      margin-right: 0;
    }
  `,
};
