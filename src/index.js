import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import styles from "./Root.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
class Root extends React.Component {
  render() {
    return (
      // <div id={styles.root}>
      <App />
      // </div>
    );
  }
}

const rootDiv = document.getElementById("root");
const root = ReactDOM.createRoot(rootDiv);
root.render(<Root />);
// ReactDOM.render(<Root />, rootDiv);
