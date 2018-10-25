import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

const ErrorAlter = ({ onClose, msg }) => (
  <Fragment>
    <Dialog open={msg !== ""} onClose={onClose}>
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

ErrorAlter.propTypes = {
  onClose: PropTypes.func.isRequired,
  msg: PropTypes.string
};
export default observer(ErrorAlter);
