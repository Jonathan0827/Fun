import styles from "../components/App.module.css";
import { Btn, DBtn } from "../components/Button";
import ReactModal from "react-modal";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
// import BtnInHome from "../components/ButtonInHome";

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
          // console.log(
          //   json.problems[Math.floor(Math.random() * json.problems.length)]
          // );
          setProblems(json.problems);
          // reqRandomQuest();
          setProblem(
            json.problems[Math.floor(Math.random() * problems.length)],
          );

          console.log(json.problems);
          setShowP(true);
          setTitle("");
        });
    });
  };

  function sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  } // 함수정의
  // function sleep(ms) {
  //   const wakeUpTime = Date.now() + ms;
  //   while (Date.now() < wakeUpTime) {}
  // }

  const checkAnswer = async () => {
    // (true);
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
      setIncorrects((current) => current + 1);
      setDisableInput(true);
      await sleep(2);
      console.log("next");
      reqRandomQuest();
    }
  };
  const revealAnswer = () => {
    setShowAnswer(true);
    setCorrectAns(false);
    setIncorrectAns(false);
  };
  const submitAnswer = (event) => {
    event.preventDefault();
    setSAnswer(event.target.value);
    checkAnswer();
  };
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
  const handleKeyPress = (event) => {
    // if (e.key === "Enter") {
    //   submitAnswer();
    // }
    console.log(event);
  };
  return (
    <div>
      {/*<link*/}
      {/*  rel="stylesheet"*/}
      {/*  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"*/}
      {/*/>*/}
      <h1>{title}</h1>
      {showP ? (
        <div>
          <div>
            <h1>{problem.quiz}</h1>
            <h2>{`맞은 문제: ${corrects}, 틀린 문제: ${incorrects}, 넘어간 문제: ${skips}`}</h2>
          </div>
          <form onSubmit={submitAnswer}>
            <div>
              <input
                placeholder="여기에 정답을 적으세요."
                // type=
                // value={}
                id="answer"
                disabled={disableInput}
                // onKeyDown={(event) => console.log(event.target.value)}
              />
            </div>
          </form>
          <div>
            <br />
            <Btn title="정답 확인하기" type="contained" onclick={checkAnswer} />
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
            <Btn title="다음 문제" type="contained" onclick={reqRandomQuest} />
          </div>
        </div>
      ) : (
        Btns()
      )}
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
      {/*<span className="material-symbols-outlined">arrow_downward</span>*/}
    </div>
  );
}

// function BtnInHome(tof) {
//   // return (
//   if (tof) {
//     return <Btn title="시작하기" type="contained"  onclick()/>;
//   } else {
//     return (
//       <LoadingButton loading variant="contained">
//         <span>로딩중...     </span>
//       </LoadingButton>
//     ); </s
//   }
//   // )
// }

export default Home;
