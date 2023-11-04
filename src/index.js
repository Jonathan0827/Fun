import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

class Root extends React.Component {
  render() {
    return (
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
        onScriptLoadError={() => console.log("실패")}
        onScriptLoadSuccess={() => console.log("성공")}
      >
        <App />
      </GoogleOAuthProvider>
    );
  }
}

const rootDiv = document.getElementById("root");
const root = ReactDOM.createRoot(rootDiv);
root.render(<Root />);
// ReactDOM.render(<Root />, rootDiv);
