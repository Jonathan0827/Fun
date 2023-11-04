import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { TextField, Alert } from "@mui/material";
import GoogleAuthLogin from "../components/GLogin";

function SignUpView() {
  useEffect(() => {
    localStorage.setItem("UserToken", "");
    localStorage.setItem("UserName", "");
    localStorage.setItem("UserEmail", "");
  }, []);

  const [name, setName] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);
  const signUp = (sub, name) => {
    const bodyData = () => {
      return "f";
    };
    // fetch(`http://localhost:4000/signup`, {
    //   mode: "cors",
    //   method: "POST",
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   // },
    //   // headers: {
    //   //   Accept: "application/json",
    //   // },
    //   body: JSON.stringify({
    //     sub: 123,
    //     name: "testUser",
    //   }),
    // }).then((res) => {
    //   console.log(res);
    //   // return res.json();
    // });
    axios
      .post(`http://localhost:4000/signup`, {
        sub: 123,
        name: "testUser",
      })
      .then((res) => {
        console.log(res);
      });

    // .then((json) => {
    //   if (json.wasUser) {
    //     console.log("was user");
    //   } else {
    //     console.log("Sup suc");
    //   }
    // });
  };
  return (
    <div>
      <h1>회원가입</h1>

      {!showForm ? (
        <div>
          <GoogleAuthLogin title="구글로 회원가입" />
        </div>
      ) : (
        <form>
          <TextField
            id="outlined-basic"
            label="이름"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <br />
          <Button
            onClick={() => {
              signUp();
            }}
          >
            Sign Up Test
          </Button>
        </form>
      )}
    </div>
  );
}

export default SignUpView;
