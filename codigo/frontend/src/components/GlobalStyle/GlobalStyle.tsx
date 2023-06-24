import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
  }

  body * {
    box-sizing: border-box;
    font-family: Inter, 'sans-serif';
  }

  button, input[type="submit"], a, input[type="button"] {
    cursor: pointer;
  }

  input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

`

export default GlobalStyle;