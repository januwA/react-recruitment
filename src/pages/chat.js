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
  Typography,
  Icon,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import io from "socket.io-client";
import userStore from "../store/user.store";
import userListStore from "../store/userList.store";
import chatStore from "../store/chat.store";
import { observer } from "mobx-react";
import { get } from "mobx";
import * as util from "../util";

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
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
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
    text: ""
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

  componentWillMount() {
    // 避免在刷新页面时没有数据
    if (!chatStore.chatmsg.length) {
      chatStore.getMsgList(userStore.userinfo._id); // 获取msg列表
      chatStore.msgRecv(); // 监听每次socket的返回数据
    }
  }

  handleBack = e => {
    this.props.history.goBack();
  };

  render() {
    const { text } = this.state;
    const {
      classes,
      match: {
        params: { user }
      }
    } = this.props;
    if (!chatStore.users[user]) return null;
    const chatid = util.getChatId(user, userStore.userinfo._id);
    // 只需要当前用户，和target的聊天信息
    let chatmsgs = chatStore.chatmsg.filter(el => el.chatid == chatid);
    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                onClick={this.handleBack}>
                <Icon>chevron_left</Icon>
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.grow}>
                {chatStore.users[user].name}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {chatmsgs.map((el, i) => (
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
