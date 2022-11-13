import { css } from '@emotion/react';

export const profileStyles = {
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
  formContainer: css`
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
  profilePicContainer: css`
    display: flex;
    align-items: flex-end;
    gap: 20px;
    margin-bottom: 20px;
    padding: 18px;
  `,
  profilePic: css``,
  img: css`
    border-radius: 50%;
  `,

  uploadPicInput: css`
    display: none;
  `,

  uploadPicBtn: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    background: #a8866e;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: #f8ede3;
    font-weight: 500;
    flex-grow: 0;

    cursor: pointer;
    :hover {
      background: #f8ede3;
      color: #a8866e;
      font-weight: 700;
    }
    :focus {
      transform: scale(0.9);
    }
  `,
  editOrDeleteProfileContainer: css`
    display: flex;
  `,
  editProfileBtn: css`
    height: 40px;
    margin-right: 18px;
    background-color: white;
    border: 2px solid #a8866e;
    border-radius: 8px;
    color: #a8866e;
    padding: 8px;
    font-weight: 700;
    cursor: pointer;
    :hover {
      background: #f8ede3;
      color: #a8866e;
      font-weight: 700;
    }
    :focus {
      transform: scale(0.9);
    }
  `,
  deleteProfileBtn: css`
    background-color: white;
    border: 2px solid #b00020;
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
      transform: scale(0.9);
    }
  `,

  userInfo: css`
    width: 50%;
    label {
      margin-left: 20px;
      font-size: 16px;
      font-weight: 700;
      color: #a8866e;
    }
    div {
      width: 330px;
      display: flex;
      margin-bottom: 12px;
      align-items: center;
      justify-content: space-between;
    }
  `,

  userTextInfo: css`
    margin-left: 12px;
    width: 200px;
    height: 30px;
    padding: 4px 8px 4px 8px;
    background: #f1f1f1;
  `,
  saveBtn: css`
    margin-top: 20px;
    margin-left: 20px;
    height: 40px;
    margin-right: 18px;
    background-color: white;
    border: 2px solid #a8866e;
    border-radius: 8px;
    color: #a8866e;
    padding: 8px;
    font-weight: 700;
    cursor: pointer;
    :hover {
      background: #f8ede3;
      color: #a8866e;
      font-weight: 700;
    }
    :focus {
      transform: scale(0.9);
    }
  `,
  myBooksContainer: css`
    width: 100%;
    height: fit-content;

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
  myBooks: css`
    margin: 0 auto;
    width: 98%;
    height: fit-content;
  `,
  bookCardContainer: css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-left: 25px;
  `,
  footerMargin: css``,
};
