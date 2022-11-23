import { css } from '@emotion/react';

export const ablyChatStyles = {
  chatHolder: css`
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 100%;
    border: 1px solid #e0e0e0;
  `,

  form: css`
    margin-top: 25px;
  `,

  chatText: css`
    height: 80%;
    @media screen and (min-width: 600px) {
      width: 100%;
    }
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    overflow-y: auto;
    overflow-x: hidden;
  `,
  textarea: css`
    width: 80%;
    height: 50px;
    box-sizing: border-box;
    background: #f8fafd;
    border: 1px solid #e7ecf3;
    border-radius: 25px;
    padding-left: 2em;
    padding-top: 1em;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-right: 1em;
    :focus,
    :active {
      outline: none !important;
      border-color: #1b3d5f;
    }
  `,
  button: css`
    border: none;
    font-weight: bold;
    letter-spacing: 4px;
    font-size: 1.4em;
    background: none;
  `,

  textButtonContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    left: 1em;
    margin-bottom: 12px;
  `,

  messageTextStyle: (me: boolean) =>
    css`
      display: flex;
      flex-direction: column;
      font-size: 16px;
      width: 33%;
      height: fit-content;
      background: ${me ? '#92969A' : '#F8FAFD'};
      color: ${me ? '#fff' : '#1D232E'};
      padding: 0.8em;
      border-radius: 10px;
      flex-grow: 0;
      border-bottom-right-radius: ${me ? '0' : '10px'};
      border-bottom-left-radius: ${me ? '10px' : '0'};
      margin-left: ${me ? '7.5em' : 'auto'};
      margin-right: ${me ? 'auto' : '8em'};
      @media screen and (min-device-width: 600px) and (max-device-width: 900px) {
        margin-left: ${me ? '50%' : 'auto'};
        margin-right: ${me ? 'auto' : '50%'};
        width: 50%;
      }
      @media screen and (min-width: 900px) {
        margin-left: ${me ? '60%' : 'auto'};
        margin-right: ${me ? 'auto' : '60%'};
        width: 40%;
      }
      @media screen and (max-width: 600px) {
        margin-left: ${me ? '60%' : 'auto'};
        margin-right: ${me ? 'auto' : '60%'};
        width: 40%;
      }

      line-break: strict;
      overflow-wrap: break-word;
    `,

  time: css`
    margin-top: 8px;
    font-size: 12px;
    text-align: end;
    margin-left: 1em;
  `,
};
