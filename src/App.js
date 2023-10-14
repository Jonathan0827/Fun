import React from "react";
import Home from "./routes/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
// import Question from "./routes/Question";
import InstallView from "./routes/Install";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/install" exact>
          <InstallView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
