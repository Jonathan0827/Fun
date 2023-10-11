import Button from "@mui/material/Button";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

function Question() {
  const [loading, setLoading] = React.useState(true);
  return (
    <div>
      <h1>문제</h1>
      {loading ? (
        <LoadingButton
          loading
          loadingPosition="end"
          // startIcon={<SaveIcon />}
          variant="contained"
          // disabled
        >
          <span>로딩중...     </span>
        </LoadingButton>
      ) : (
        <div>여기에 문제</div>
      )}
    </div>
  );
}

export default Question;
