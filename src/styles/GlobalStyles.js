// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.bgPrimary};
  }

  .wrapper {
    max-width: 100%;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.bgPrimary};
  }

  .container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    width: 100%;
  }

  .loading-text {
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export default GlobalStyles;
