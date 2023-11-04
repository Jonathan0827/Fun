import React from "react";
import { GBtn } from "./Button";
import GoogleAuthLogin from "./GLogin";

export function LoginView() {
  const [title, setTitle] = React.useState("로그인");
  const styles = {
    title: {
      marginBottom: "4vh",
    },
    view: {
      // padding: "5vh",
    },
  };
  return (
    <div style={styles.view}>
      <h1 style={styles.title}>{title}</h1>

      <GoogleAuthLogin title={"구글 로그인"} />
    </div>
  );
}
