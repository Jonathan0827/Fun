import { IconButton, Snackbar, Button } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider, useSnackbar } from "notistack";

function SBar({ content }) {
  const { enqueueSnackbar } = useSnackbar();

  // const handleClick = () => {
  // };

  // const handleClickVariant = (variant) => () => {
  // variant could be success, error, warning, info, or default
  const variant = "success";
  enqueueSnackbar({ content }, { variant });
  // };

  return (
    <React.Fragment>
      {/*<Button onClick={handleClick}>Show snackbar</Button>*/}
    </React.Fragment>
  );
}

export function SnackBar() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <>
      {/*<Snackbar*/}
      {/*  open={true}*/}
      {/*  autoHideDuration={1}*/}
      {/*  onClose={() => {}}*/}
      {/*  message={content}*/}
      {/*  action={*/}
      {/*    <React.Fragment>*/}
      {/*      <IconButton*/}
      {/*        size="small"*/}
      {/*        aria-label="close"*/}
      {/*        color="inherit"*/}
      {/*        onClick={() => {}}*/}
      {/*      >*/}
      {/*        <CloseIcon fontSize="small" />*/}
      {/*      </IconButton>*/}
      {/*    </React.Fragment>*/}
      {/*  }*/}
      {/*/>*/}
    </>
  );
}
