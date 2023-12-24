import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    //background-color: #323336;
    //color: #FFFFFF;
    text-align: center !important;
    align-items: center !important;
    justify-content: center !important;

  }
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5vh;
    background-color: #ffffff;
    color: #000000;
    text-align: center;
    box-shadow: none !important;
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

  .NavBar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 7vh;
    background-color: #ffffff;
    color: #000000;
    box-shadow: none !important;
  }
`;
export default GlobalStyle;
