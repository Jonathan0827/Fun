import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    //background-color: #323336;
    //color: #FFFFFF;
    text-align: center;
    margin-top: 10vh
  }

  .btn {
    margin: 10px;
  }

  input {
    padding: 5px 10px;
    border: #8d8d8d 1px solid;
    border-radius: 25px;
    box-shadow: 0 0 5px #8d8d8d;
  }
`;
export default GlobalStyle;
