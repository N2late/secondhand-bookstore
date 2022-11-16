import { css } from '@emotion/react';

export const styles = {
  heroContainer: css`
    margin: 0 auto;
    margin-top: 100px;
    width: 80%;
    height: 220px;
  `,
  heroInnerContainer: css`
    width: 100%;
    height: 220px;
    background-image: url('/banner.jpeg');
    background-repeat: no-repeat;
    border-radius: 12px;
    background-position: 100% 50%;
    background-size: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  `,
  heroLogo: css`
    width: 75%;
    height: 27%;
  `,
  heroText: css`
    margin-left: 5%;
    width: 35%;
    height: 80%;
    h2 {
      color: #a8866e;
      font-size: 28px;
      font-weight: 800;
    }
    @media screen and (max-width: 900px) {
      h2 {
        font-size: 16px;
        margin-top: -10px;
      }
      img {
        margin-top: -10px;
      }
    }
  `,
  btnContainer: css`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
    @media screen and (max-width: 900px) {
      margin-top: 8px;
    }
  `,
  heroButton: css`
    width: 100px;
    height: 130%;
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
    }
    :focus {
      transform: scale(0.9);
    }
    @media screen and (max-width: 900px) {
      width: 50px;
      height: 100%;
    }
  `,

  sectionRecentAdded: css`
    width: 95%;
    margin: 0 auto;
    margin-top: 40px;
    height: fit-content;
  `,

  sectionRecentReleased: css`
    width: 95%;
    margin: 0 auto;
    margin-top: 40px;
    height: 380px;
    background-color: #f1f1f1;
    border-radius: 12px;
    height: fit-content;
  `,
  recentlyAddedTitle: css`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    padding-bottom: 0;
    h3 {
      color: #a8866e;
    }
    p {
      font-size: 14px;
      color: #a8866e;
      font-weight: 700;
    }
  `,
  sectionInnerContainerRecentAdded: css``,
  bookContainer: css`
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    justify-content: space-between;
    margin-top: 20px;
    margin-left: 25px;
    margin-right: 25px;
  `,
};
