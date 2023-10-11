import { Btn } from "./Button";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

function BtnInHome(tof, onclick) {
  // return (
  if (tof) {
    return <Btn title="시작하기" type="contained" onclick={onclick} />;
  } else {
    return (
      <LoadingButton loading variant="contained">
        <span>로딩중...     </span>
      </LoadingButton>
    );
  }
  // )
}

export default BtnInHome;
