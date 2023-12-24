import styles from "./Button.module.css";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

function Btn({ title, type, onclick }) {
  // <button className={styles.default} onClick={onclick}>
  //   {title}
  // </button>
  if (type == "contained" || type == null) {
    return (
      <Button
        variant={"contained"}
        onClick={onclick}
        className={styles.default}
      >
        {title}
      </Button>
    );
  } else if (type == "outlined") {
    return (
      <Button
        variant={"outlined"}
        onClick={onclick}
        className={styles.outlined}
      >
        {title}
      </Button>
    );
  }
}

function GBtn({ title, type, onclick }) {
  return (
    <Button
      variant={type}
      onClick={onclick}
      className={styles.google}
      startIcon={<GoogleIcon />}
    >
      {title}
    </Button>
  );
}

function LBtn() {
  return (
    <LoadingButton
      loading
      variant="contained"
      className={styles.loading}
    ></LoadingButton>
  );
}

function DBtn({ title, type }) {
  return (
    // <button className={styles.default} onClick={onclick}>
    //   {title}
    // </button>
    <Button variant={type} disabled>
      {title}
    </Button>
  );
}

PropTypes.Btn = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onclick: PropTypes.func,
};
PropTypes.dBtn = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export { Btn, DBtn, LBtn, GBtn };
