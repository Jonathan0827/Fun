import styles from "../components/App.module.css";
import { Btn, DBtn } from "../components/Button";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, AlertTitle, TextField, Grow, Slide } from "@mui/material";

const sleep = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

// https://raw.githubusercontent.com/Team-WAVE-x/Stop-uncle/master/src/ajegag.json
function Home() {
  const [title, setTitle] = React.useState("시작하기 버튼을 눌러서 시작하세요");
  const [btn, setBtn] = React.useState(true);
  const [problems, setProblems] = React.useState([]);
  const [solved, setSolved] = React.useState([]);
  const [showP, setShowP] = React.useState(false);
  const [correctAns, setCorrectAns] = React.useState(false);
  const [incorrectAns, setIncorrectAns] = React.useState(false);
  const [sAnswer, setSAnswer] = React.useState("");
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [problem, setProblem] = React.useState({});
  const [shownQuests, setShownQuests] = React.useState([]);
  const [corrects, setCorrects] = React.useState(0);
  const [incorrects, setIncorrects] = React.useState(0);
  const [skips, setSkips] = React.useState(0);
  const [disableInput, setDisableInput] = React.useState(false);
  const [isPWA, setIsPWA] = React.useState("Unchecked");

  const reqRandomQuest = () => {
    let randomNum = Math.floor(Math.random() * problems.length);
    while (shownQuests.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * problems.length);
    }

    document.getElementById("answer").value = "";
    setDisableInput(false);
    setProblem(problems[randomNum]);
    setShowAnswer(false);
    setCorrectAns(false);
    setIncorrectAns(false);
    setShownQuests([...shownQuests, randomNum]);
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
            json.problems[Math.floor(Math.random() * problems.length)],
          );

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
        console.log("PWA");
      } else {
        setIsPWA("Not PWA");
        console.log("Not PWA");
      }
    }

    checkPWA().then((r) => console.log("Checked PWA"));
  }, []);
  const checkAnswer = async (event) => {
    // (true);
    event.preventDefault();

    const answer = document.getElementById("answer");
    console.log(answer.value);
    if (answer.value == problem.answer) {
      console.log("correct");
      setCorrectAns(true);
      setIncorrectAns(false);
      setCorrects((current) => current + 1);
      setDisableInput(true);
      await sleep(2);
      console.log("next");
      reqRandomQuest();
      // setTimeout(() => {

      //
      // }, 2000);
    } else {
      console.log("incorrect");
      setIncorrectAns(true);
      setCorrectAns(false);
      setShowAnswer(true);
      setIncorrects((current) => current + 1);
      setDisableInput(true);
      await sleep(2);
      console.log("next");
      reqRandomQuest();
    }
  };
  const revealAnswer = async () => {
    setSkips((current) => current + 1);
    setDisableInput(true);
    setShowAnswer(true);
    setCorrectAns(false);
    setIncorrectAns(false);
    await sleep(2);
    console.log("next");
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
    if (btn) {
      return <Btn title="시작하기" type="contained" onclick={loadQuestion} />;
    } else {
      return (
        <LoadingButton loading variant="contained">
          <span>로딩중...     </span>
        </LoadingButton>
      );
    }
  };
  return (
    <div>
      <h1>{title}</h1>
      {showP ? (
        <Grow in={showP}>
          <div id={"ProblemSolvingView"}>
            <div>
              <h1>{problem.quiz}</h1>
              <h3>{`맞은 문제: ${corrects}, 틀린 문제: ${incorrects}, 넘어간 문제: ${skips}`}</h3>
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
              <Btn title="정답 보기" type="outlined" onclick={revealAnswer} />
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
            &nbsp;
            <div>
              <Btn
                title="다음 문제"
                type="contained"
                onclick={reqRandomQuest}
              />
            </div>
          </div>
        </Grow>
      ) : (
        Btns()
      )}
      <Slide direction="up" in={isPWA == "Not PWA"}>
        <div className={styles.smallAlertContainer}>
          <Link to={"/install"}>
            <Alert severity="info">
              {/*<AlertTitle>*/}
              {/*  <strong>앱 설치</strong>*/}
              {/*</AlertTitle>*/}
              <strong>
                이 페이지는 앱으로 설치할 수 있습니다.
                <br />
                (이 알림을 누르면 설치 페이지로 이동합니다.)
              </strong>
            </Alert>
          </Link>
        </div>
      </Slide>
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
    </div>
  );
}

export default Home;
