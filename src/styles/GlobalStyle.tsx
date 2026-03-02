import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    background: #f5f5f5;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }
`;
