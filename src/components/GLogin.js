import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect } from "react";
import { Btn, GBtn } from "./Button";
import axios from "axios";
import { Alert, Backdrop } from "@mui/material";

const jwt = require("jsonwebtoken");

const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;

function GoogleAuthLogin({ title }) {
  const [showLoading, setShowLoading] = React.useState(false);

  const apiPath = () => {
    if (process.env.NODE_ENV == "development") {
      return "http://localhost:4000";
    } else {
      return "https://api.reacts.kro.kr";
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${credentialResponse.access_token}`,
          },
        },
      );
      const uInfo = userInfo.data;
      console.log(uInfo);
      const subId = uInfo.sub;
      fetch(`${apiPath()}/login?sub=${subId}`, {
        headers: {
          Authorization: jwt.sign({ type: "JWT", sub: subId }, AUTH_KEY, {
            expiresIn: "10s",
            issuer: "FunGoogleLogin",
          }),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (!json.isUser) {
            if (window.confirm("회원가입을 하려면 OK 버튼을 눌러주세요.")) {
              console.log(subId);
              axios
                .post(`${apiPath()}/signup`, {
                  // body: {
                  sub: subId,
                  // },
                })
                .then((res) => {
                  console.log(res.data.wasUser);
                  window.location.reload();
                  localStorage.setItem(
                    "UserToken",
                    credentialResponse.access_token,
                  );
                  localStorage.setItem("UserName", uInfo.name);
                  localStorage.setItem("UserEmail", uInfo.email);
                  localStorage.setItem("ProfilePic", uInfo.picture);
                  localStorage.setItem("UserSub", uInfo.sub);
                });
              // .then((json) => {
              //   if (json.isRegistered) {
              //     alert("회원가입이 완료되었습니다.");
              //   } else {
              //     alert("회원가입에 실패했습니다.");
              //   }
              // });
            } else {
              window.location.reload();
            }
          } else {
            localStorage.setItem("UserToken", credentialResponse.access_token);
            localStorage.setItem("UserName", uInfo.name);
            localStorage.setItem("UserEmail", uInfo.email);
            localStorage.setItem("ProfilePic", uInfo.picture);
            localStorage.setItem("UserSub", uInfo.sub);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          window.location.reload();
          // alert("오류가 발생했습니다. 다시 시도해주세요.");
        });
    },
  });
  return (
    <div>
      {showLoading ? (
        <h2>로딩중</h2>
      ) : (
        <GBtn
          title={"구글로 로그인"}
          onclick={() => {
            setShowLoading(true);
            googleLogin();
          }}
        />
      )}
    </div>
  );
}

export default GoogleAuthLogin;
