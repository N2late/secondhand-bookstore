import { css } from '@emotion/react';

export const buyStyles = {
  searchContainer: css`
    margin: 0 auto;
    margin-top: 125px;
    width: 95%;
    height: 220px;
  `,
  searchBar: css`
    margin: 0 auto;
    background-color: #f8ede3;
    border-radius: 8px;
    width: 600px;
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

  filterContainer: css`
    width: 600px;
    margin: 0 auto;
    padding: 16px;
    h3 {
      font-size: 18px;
      font-weight: 500;
      color: #a8866e;
      margin-bottom: 8px;
    }
  `,
  filterRow: css`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    label {
      font-weight: 700;
      color: #a8866e;
      width: 140px;
    }
    select {
      width: 140px;
      background-color: #f1f1f1;
      border: none;
      height: 24px;
      padding: 4px;
      color: #a8866e;
    }
  `,
  filterItem: css`
    display: flex;
    justify-content: space-between;
    width: 40%;
    gap: 4px;
    input {
      margin-right: 10px;
    }
    select :first-child {
      margin-bottom: 8px;
    }
  `,
  btnContainer: css`
    width: 100%;
    text-align: center;
    margin-top: 8px;
  `,

  searchBtn: css`
    width: 100px;
    height: 40px;
    background: #a8866e;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    font-size: 20px;
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

  resultsContainer: css`
    margin: 0 auto;
    margin-top: 70px;
    width: 95%;
    h1 {
      color: #a8866e;
    }
  `,

  bookCardContainer: css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-left: 25px;
  `,
  results: css``,
};
