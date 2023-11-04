import styles from "../components/App.module.css";
import { Btn, DBtn, LBtn } from "../components/Button";
import React, { useEffect } from "react";
import {
  TextField,
  Grow,
  Modal,
  Box,
  Fade,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import { LoginView } from "../components/Login";
import { SnackbarProvider, useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import axios from "axios";

const jwt = require("jsonwebtoken");

// https://raw.githubusercontent.com/Team-WAVE-x/Stop-uncle/master/src/ajegag.json
function Home() {
  // check if development
  const { enqueueSnackbar } = useSnackbar();
  const [showSignView, setShowSignView] = React.useState(false);
  const [title, setTitle] = React.useState("시작하기 버튼을 눌러서 시작하세요");
  const [btn, setBtn] = React.useState(true);
  const [problems, setProblems] = React.useState([]);
  const [solved, setSolved] = React.useState([]);
  const [showP, setShowP] = React.useState(false);
  const [hideP, setHideP] = React.useState(true);
  const [correctAns, setCorrectAns] = React.useState(false);
  const [incorrectAns, setIncorrectAns] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [problem, setProblem] = React.useState({});
  const [shownQuests, setShownQuests] = React.useState([]);
  const [corrects, setCorrects] = React.useState(0);
  const [incorrects, setIncorrects] = React.useState(0);
  const [skips, setSkips] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [disableInput, setDisableInput] = React.useState(false);
  const [isPWA, setIsPWA] = React.useState("Unchecked");
  const [openAccount, setOpenAccount] = React.useState(false);
  const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
  const [score, setScore] = React.useState(0);
  const apiPath = () => {
    if (process.env.NODE_ENV == "development") {
      return "http://localhost:4000";
    } else {
      return "https://api.reacts.kro.kr";
    }
  };
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      axios
        .get(`${apiPath()}/getscore?sub=${localStorage.getItem("UserSub")}`, {
          headers: {
            Authorization: jwt.sign(
              { type: "JWT", sub: localStorage.getItem("UserToken") },
              AUTH_KEY,
              {
                expiresIn: "10s",
                issuer: "FunGoogleLogin",
              },
            ),
          },
        })
        .then((res) => {
          setScore(res.data.score);
        });
    }
  }, []);
  const addScore = async () => {
    if (localStorage.getItem("UserToken")) {
      axios
        .post(
          `${apiPath()}/addscore`,
          {
            sub: localStorage.getItem("UserSub"),
          },
          {
            headers: {
              Authorization: jwt.sign(
                { type: "JWT", sub: localStorage.getItem("UserToken") },
                AUTH_KEY,
                {
                  expiresIn: "10s",
                  issuer: "FunGoogleLogin",
                },
              ),
            },
          },
        )
        .then((res) => {
          setScore(res.data.score);
        });
    }
  };
  const minusScore = async (score) => {
    if (localStorage.getItem("UserToken")) {
      axios
        .post(
          `${apiPath()}/downscore`,
          {
            sub: localStorage.getItem("UserSub"),
            score: score,
          },
          {
            headers: {
              Authorization: jwt.sign(
                { type: "JWT", sub: localStorage.getItem("UserToken") },
                AUTH_KEY,
                {
                  expiresIn: "10s",
                  issuer: "FunGoogleLogin",
                },
              ),
            },
          },
        )
        .then((res) => {
          setScore(res.data.score);
        });
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    backgroundColor: "background.paper",
    border: "none",
    borderRadius: "10px",

    boxShadow: 24,
    p: 4,
  };
  const reqRandomQuest = async () => {
    await sleep(2);
    setShowP(false);
    // await sleep(0.2);
    let randomNum = Math.floor(Math.random() * problems.length);
    let questArray = [];
    questArray = problems.filter((quest) => {
      return !shownQuests.includes(quest);
    });
    // let rIndex =
    while (shownQuests.includes(randomNum)) {
      if (questArray.length == 0) {
        alert("모든 문제를 풀었습니다!");
        console.log("모든 문제를 풀었습니다!");
        break;
      }
      randomNum = Math.floor(Math.random() * problems.length);
    }
    if (questArray.length == 0) {
      alert("모든 문제를 풀었습니다!");
      console.log("모든 문제를 풀었습니다!");
    }
    document.getElementById("answer").value = "";
    setDisableInput(false);
    setShowAnswer(false);
    setCorrectAns(false);
    setIncorrectAns(false);
    setShownQuests([...shownQuests, randomNum]);
    await sleep(0.5);
    setProblem(problems[randomNum]);

    setShowP(true);
  };
  const loadQuestion = () => {
    sleep(0.2).then(() => {
      setBtn(false);
      setTitle("로딩중...");
      fetch(
        `https://raw.githubusercontent.com/Team-WAVE-x/Stop-uncle/master/src/ajegag.json`,
      )
        .then((res) => res.json())
        .then((json) => {
          setProblems(json.problems);
          setProblem(
            json.problems[Math.floor(Math.random() * json.problems.length)],
          );
          setHideP(false);
          setShowP(true);
          setTitle("");
        });
    });
  };

  function sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }

  useEffect(() => {
    async function checkPWA() {
      await sleep(1);
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsPWA("PWA");
      } else {
        setIsPWA("Not PWA");
      }
    }

    checkPWA().then((r) => null);
  }, []);
  const checkAnswer = async (event) => {
    // (true);
    event.preventDefault();

    const answer = document.getElementById("answer");

    if (answer.value == problem.answer) {
      setCorrectAns(true);
      setIncorrectAns(false);
      setCorrects((current) => current + 1);
      setDisableInput(true);
      await addScore();
      reqRandomQuest();
      // setTimeout(() => {

      //
      // }, 2000);
    } else {
      setIncorrectAns(true);
      setCorrectAns(false);
      setShowAnswer(true);
      setIncorrects((current) => current + 1);
      setDisableInput(true);
      await minusScore(0.5);
      reqRandomQuest();
    }
  };
  const revealAnswer = async () => {
    setSkips((current) => current + 1);
    setDisableInput(true);
    setShowAnswer(true);
    setCorrectAns(false);
    setIncorrectAns(false);
    await minusScore(0.5);
    reqRandomQuest();
  };
  // const submitAnswer = (event) => {
  //   event.preventDefault();
  //   checkAnswer();
  // };
  const addSolved = (num) => {
    setSolved([...solved, num]);
  };
  const Btns = () => {
    // if (btn) {
    return (
      <>
        {!Btn ? (
          <div>
            <LBtn />
          </div>
        ) : null}
        <Grow in={btn}>
          <div>
            <Btn title="시작하기" type="contained" onclick={loadQuestion} />
            {!localStorage.getItem("UserToken") ? (
              <Btn
                title={"로그인"}
                type={"contained"}
                onclick={() => {
                  setShowSignView(true);
                }}
              />
            ) : (
              <div>
                <Button
                  onClick={(e) => {
                    setOpenAccount(true);
                    setAnchorEl(e.currentTarget);
                  }}
                  aria-controls={"aMenu"}
                  aria-haspopup={"true"}
                  area-expanded={openAccount ? "true" : undefined}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                    padding: "7px",
                    borderRadius: "20px",
                    width: "fit-content",
                    textTransform: "none",
                  }}
                >
                  <Stack direction={"row"} spacing={1}>
                    <img
                      src={localStorage.getItem("ProfilePic")}
                      alt={"Profile"}
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      }}
                    />
                    <Stack
                      spacing={-0.8}
                      style={{
                        textAlign: "left",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    >
                      <h4>{`${localStorage.getItem("UserName")}`}</h4>
                      <h5
                        style={{
                          fontWeight: "normal",
                        }}
                      >
                        으로 로그인 됨
                      </h5>
                    </Stack>
                  </Stack>
                </Button>
                <Menu
                  open={openAccount}
                  onClose={() => setOpenAccount(false)}
                  id="aMenu"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("UserToken");
                      localStorage.removeItem("UserName");
                      localStorage.removeItem("UserEmail");
                      localStorage.removeItem("ProfilePic");
                      window.location.reload();
                      enqueueSnackbar("Done", { variant: "success" });
                    }}
                  >
                    로그아웃
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenAccount(false);
                      window.alert("준비중입니다.");
                    }}
                  >
                    계정 정보
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </Grow>
      </>
    );
    // } else {
    //   return (
    // <LoadingButton loading variant="contained">
    //   <span>로딩중...     </span>
    // </LoadingButton>

    // );
    // }
  };
  return (
    <div>
      <h1>Fun</h1>
      <SnackbarProvider maxSnack={3}></SnackbarProvider>
      <h1>{title}</h1>
      <div>
        <Modal open={showSignView} onClose={() => setShowSignView(false)}>
          <Fade in={showSignView}>
            <Box sx={style}>
              <Grow in={showSignView}>
                <div>
                  <LoginView />
                </div>
              </Grow>
            </Box>
          </Fade>
        </Modal>
      </div>
      {!hideP ? (
        <Grow in={showP}>
          <div id={"ProblemSolvingView"}>
            <div>
              <h1>{problem.quiz}</h1>
              <h3>{`맞은 문제: ${corrects}, 틀린 문제: ${incorrects}, 넘어간 문제: ${skips}`}</h3>
              <h3>
                계정점수: {localStorage.getItem("UserToken") ? score : null}점
              </h3>
            </div>
            <form onSubmit={checkAnswer}>
              <div>
                <TextField
                  id="answer"
                  label="여기에 정답을 입력하세요"
                  variant="standard"
                  disabled={disableInput}
                />
                {/*<input*/}
                {/*  placeholder="여기에 정답을 적으세요."*/}
                {/*  id="answer"*/}
                {/*  disabled={disableInput}*/}
                {/*/>*/}
              </div>
            </form>
            <div>
              {/*<br />*/}
              <Btn
                title="정답 확인하기"
                type="contained"
                onclick={checkAnswer}
              />
              <Btn title="정답보기" type="outlined" onclick={revealAnswer} />
              <br />
              <Btn
                title="돌아가기"
                type="outlined"
                onclick={() => {
                  window.location.reload();
                }}
              />

              {showAnswer ? (
                <div>
                  <h3>
                    {problem.answer.map((ans) => {
                      return `"${ans}" `;
                    })}
                  </h3>
                </div>
              ) : null}
              {correctAns ? (
                <div>
                  <h3>맞았습니다!</h3>
                </div>
              ) : null}
              {incorrectAns ? (
                <div>
                  <h3>틀렸습니다!</h3>
                </div>
              ) : null}
            </div>
          </div>
        </Grow>
      ) : null}
      {showP ? null : Btns()}

      {/*<Slide direction="up" in={isPWA == "Not PWA"}>*/}
      {/*  <div className={styles.smallAlertContainer}>*/}
      {/*    <Link to={"/install"}>*/}
      {/*      <Alert severity="info">*/}
      {/*        /!*<AlertTitle>*!/*/}
      {/*        /!*  <strong>앱 설치</strong>*!/*/}
      {/*        /!*</AlertTitle>*!/*/}
      {/*        <strong>*/}
      {/*          이 페이지는 앱으로 설치할 수 있습니다.*/}
      {/*          <br />*/}
      {/*          (이 알림을 누르면 설치 페이지로 이동합니다.)*/}
      {/*        </strong>*/}
      {/*      </Alert>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</Slide>*/}
      <h3>
        참고로 여기 나오는 문제들은 제가 출제하지 <mark>않았습니다</mark>.
        <br />
        <a
          href="https://github.com/Team-WAVE-x/Stop-uncle"
          className={styles.greyLink}
        >
          여기에서 가져옴
        </a>
      </h3>
      {/*<div>*/}
      {/*  <Btn*/}
      {/*    title={"Clear Login Info"}*/}
      {/*    type={"outlined"}*/}
      {/*    onclick={() => {*/}
      {/*      localStorage.removeItem("UserToken");*/}
      {/*      localStorage.removeItem("UserName");*/}
      {/*      localStorage.removeItem("UserEmail");*/}
      {/*      localStorage.removeItem("ProfilePic");*/}
      {/*      window.location.reload();*/}
      {/*      enqueueSnackbar("Done", { variant: "success" });*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Btn*/}
      {/*    title={"Score Test"}*/}
      {/*    type={"outlined"}*/}
      {/*    onclick={() => {*/}
      {/*      // fetch(`${apiPath()}/score`, {*/}
      {/*      //   method: "POST",*/}
      {/*      //   headers: {*/}
      {/*      //     Authorization: jwt.sign(*/}
      {/*      //       { type: "JWT", sub: localStorage.getItem("UserToken") },*/}
      {/*      //       AUTH_KEY,*/}
      {/*      //       {*/}
      {/*      //         expiresIn: "10s",*/}
      {/*      //         issuer: "FunGoogleLogin",*/}
      {/*      //       },*/}
      {/*      //     ),*/}
      {/*      //   },*/}
      {/*      //   body: JSON.stringify({*/}
      {/*      //     sub: localStorage.getItem("UserSub"),*/}
      {/*      //   }),*/}
      {/*      // })*/}
      {/*      //   .then((res) => res.json())*/}
      {/*      //   .then((json) => {*/}
      {/*      //     console.log(json);*/}
      {/*      //   });*/}
      {/*     */}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
}

export default Home;
