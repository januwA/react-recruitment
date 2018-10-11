import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const ErrorAlter = ({ onClose, msg }) => {
  return (
    <Fragment>
      <Dialog open={msg !== ''} onClose={onClose}>
        <DialogTitle>警告</DialogTitle>
        <DialogContent>
          <DialogContentText>{msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ErrorAlter;
