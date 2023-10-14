import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    //background-color: #323336;
    //color: #FFFFFF;
    text-align: center !important;
    margin-top: 10vh
  }

  .btn {
    margin: 10px;
  }

  a {
    text-decoration: none !important;
    color: #118bee !important;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .ProblemSolvingView {
    animation: fadeIn 0.5s forwards;
    animation-delay: 0.1s;
  }
`;
export default GlobalStyle;
