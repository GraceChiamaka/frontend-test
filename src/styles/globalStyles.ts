"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    /* width: 100vw; */
  width: 100%;
  height: 100%;
  font-size: 1rem;
  }
`;

export default GlobalStyle;
