import React, { Component, Fragment } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Button,
  TextField,
  ListItemText,
  IconButton,
  Avatar,
  Grid,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import io from "socket.io-client";
import userStore from "../store/user.store";
import chatStore from "../store/chat.store";
import { observer } from "mobx-react";

const socket = io("ws://localhost:5000");
const l = console.log;

const styles = theme => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#FAFAFA",
    marginBottom: "8vh"
  },
  item: {
    background: "#fff",
    margin: "4px 0"
  }
});

const StartAvatar = observer(props => (
  <Avatar {...props} style={{ alignSelf: "start" }} />
));

const RList = observer(props => (
  <Fragment>
    <ListItemText primary={props.content} style={{ textAlign: "right" }} />
    <StartAvatar alt="[Avatar]" src={props.avatar} />
  </Fragment>
));

const LList = observer(props => (
  <Fragment>
    <StartAvatar alt="[Avatar]" src={props.avatar} />
    <ListItemText primary={props.content} />
  </Fragment>
));

const MyList = observer(
  ({ children: { from, ...arg } }) =>
    from === userStore.userinfo._id ? <RList {...arg} /> : <LList {...arg} />
);

const SendModule = observer(({ onChange, onSend, value }) => (
  <div className="fixed-footer">
    <Grid container alignItems="center" justify="space-around">
      <Grid item xs={9}>
        <TextField
          placeholder="输入"
          value={value}
          margin="normal"
          fullWidth
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button color="primary" variant="contained" onClick={onSend}>
          发送
        </Button>
      </Grid>
    </Grid>
  </div>
));
@withStyles(styles)
@observer
class Chat extends Component {
  state = {
    text: "",
  };
  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleSend = e => {
    const sd = {
      from: userStore.userinfo._id,
      to: this.props.match.params.user,
      content: this.state.text,
      avatar: userStore.userinfo.avatar
    };
    l(sd);
    chatStore.sendMsg(sd);
    this.setState({ text: "" });
  };
  componentDidMount() {
    // 获取msg列表
    chatStore.getMsgList();
    // 监听每次socket的返回数据
    chatStore.msgRecv();
  }

  render() {
    const { text, msgs } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          {!!msgs.length || (
            <Typography variant="caption" gutterBottom align="center">
              {" "}
              暂无消息&gt;_&lt;{" "}
            </Typography>
          )}
          <List>
            {chatStore.chatmsg.map((el, i) => (
              <ListItem key={i} dense button className={classes.item}>
                <MyList>{{ ...el }}</MyList>
              </ListItem>
            ))}
          </List>
          <SendModule
            onChange={this.handleChange}
            onSend={this.handleSend}
            value={text}
          />
        </div>
      </Fragment>
    );
  }
}

export default Chat;
