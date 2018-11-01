import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Button,
  TextField,
  ListItemText,
  IconButton,
  Grid
} from "@material-ui/core";
import io from "socket.io-client";
const socket = io("ws://localhost:5000");

const l = console.log;
class Chat extends Component {
  static propTypes = {};
  state = {
    text: "",
    msgs: []
  };
  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleSend = e => {
    socket.emit("message", { text: this.state.text });
    this.setState({ text: "" });
  };
  componentDidMount() {
    socket.on("resmsg", data => {
      l(data)
      // this.setState(state => ({
      //   msgs: [...state.msgs, data]
      // }));
    });
  }

  render() {
    const { text, msgs } = this.state;
    return (
      <Fragment>
        <ul>
          {msgs.map((el, i) => (
            <li key={i}>{el.text}</li>
          ))}
        </ul>
        <div className="fixed-footer">
          <Grid container alignItems="center" justify="space-around">
            <Grid item xs={9}>
              <TextField
                placeholder="输入"
                value={text}
                margin="normal"
                fullWidth
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleSend}>
                发送
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Chat;
