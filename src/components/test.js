import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Dialog, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";
const l = console.log;

const Alert = (props) => (
  <Dialog open={true} fullWidth>
    <DialogTitle>{props.msg}</DialogTitle>
  </Dialog>
);

class Test extends Component {
  static info(msg) {
    const div = document.createElement("div");
    document.body.append(div);
    ReactDOM.render(<Alert msg={msg}/>, div);
  }
}
export default Test;
