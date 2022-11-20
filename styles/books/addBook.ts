import { css } from '@emotion/react';

export const addBookStyles = {
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
  formContainer: css`
    width: 100%;
    h3 {
      font-size: 18px;
      font-weight: 500;
      width: 100%;
      text-align: center;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 12px;
    }
  `,
  formGroup: css`
    width: 100%;
    display: flex;
  `,

  requiredField: css`
    :after {
      color: red;
      content: '*';
    }
  `,

  formLeftSide: css`
    width: 50%;
    padding: 12px;
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    justify-content: space-between;
    label {
      color: #171520;
    }
    input,
    select {
      margin-left: 4px;
      margin-right: 8px;
      width: 140px;
      background-color: #f1f1f1;
      border: none;
      height: 24px;
      margin-bottom: 12px;
      padding: 4px;
    }
  `,
  languages: css`
    input {
      width: 140px;
    }
  `,

  datePicker: css`
    display: flex;
    flex-direction: column;
    input {
      font-size: 16px;
      width: 140px;
      height: 36px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #f1f1f1;
      :hover {
        border: 1px solid lightgrey;
        cursor: pointer;
      }
    }
  `,

  formRightSide: css`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 12px;
    justify-content: center;
    textarea {
      background-color: #f1f1f1;
      border: none;
      padding: 4px;
      margin-bottom: 12px;
      height: 100px;
    }
    input {
      padding: 4px;
    }
    p {
      font-size: 12px;
    }
  `,

  imageContainer: css`
    display: flex;
    div :nth-of-type(1) {
      display: flex;
      flex-direction: column;
      padding-right: 8px;
    }
  `,

  finalDetails: css`
    margin-top: 20px;
    width: 75%;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: space-between;
    input {
      margin-right: 8px;
    }
    div :nth-of-type(2) {
      input {
        margin-left: 8px;
        background-color: #f1f1f1;
        border: none;
        padding: 4px;
        margin-bottom: 12px;
        margin-top: 4px;
      }
    }
  `,

  btnContainer: css`
    width: 100%;
    text-align: center;
    margin-top: 40px;
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
