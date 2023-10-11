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
  const [showA, setShowA] = React.useState(false);
  const [problem, setProblem] = React.useState({});
  const reqRandomQuest = () => {
    setProblem(problems[Math.floor(Math.random() * problems.length)]);
    setShowA(false);
  };
  const loadQuestion = () => {
    sleep(250).then(() => {
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
  const showAnswer = () => {
    setShowA(true);
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
            <Btn title="정답 보기" type="contained" onclick={showAnswer} />
            {/*<h2>{problem}</h2>*/}
            {showA ? (
              <div>
                <h3>{problem.answer}</h3>
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
//     );
//   }
//   // )
// }

export default Home;
