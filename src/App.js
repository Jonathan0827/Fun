import React from "react";
import Home from "./routes/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import InstallView from "./routes/Install";
import SignUpView from "./routes/Signup";
import { AppBar, Toolbar } from "@mui/material";
import { FunLogo } from "./components/Logo";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function App() {
  return (
    <Router>
      <GlobalStyle />
      {/*<div className="NavBar">*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      display: "flex",*/}
      {/*      justifyContent: "left",*/}
      {/*      marginLeft: "1vw",*/}
      {/*      fontWeight: "bold",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Link to={"/"}>*/}
      {/*      <FunLogo />*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      display: "flex",*/}
      {/*      justifyContent: "right",*/}
      {/*      marginRight: "1vw",*/}
      {/*      fontWeight: "bold",*/}
      {/*      marginTop: "-3vh",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Button>로그인</Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        {/*<Route path="/install" exact element={<InstallView />}></Route>*/}
        {/*<Route path="/signup" exact>*/}
        {/*  <SignUpView />*/}
        {/*</Route>*/}
        {/*<Route path="/login" exact>*/}
        {/*  <LoginView />*/}
        {/*</Route>*/}
      </Routes>
    </Router>
  );
}

export default App;
