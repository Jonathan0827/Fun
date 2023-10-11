import React from "react";
import Home from "./routes/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Question from "./routes/Question";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/start" exact>
          <Question />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
