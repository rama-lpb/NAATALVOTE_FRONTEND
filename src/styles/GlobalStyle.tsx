import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: #000000;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    background: #000000;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }
`;
