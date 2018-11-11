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
  Toolbar,
  GridList,
  GridListTile
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import io from "socket.io-client";
import userStore from "../store/user.store";
import userListStore from "../store/userList.store";
import chatStore from "../store/chat.store";
import { observer } from "mobx-react";
import Logo from "../assets/logo.jpg";
import { get, toJS } from "mobx";
import * as util from "../util";

const socket = io("ws://localhost:5000");
const l = console.log;

const styles = theme => ({
  root: {
    marginTop: "8vh",
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
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    padding: 10,
    fontSize: 21
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

const MyList = observer(({ children: { from, ...arg } }) =>
  from === userStore.userinfo._id ? <RList {...arg} /> : <LList {...arg} />
);
const tileData = [{ img: Logo }, { img: Logo }, { img: Logo }];

@withStyles(styles)
@observer
class Emojis extends Component {
  render() {
    const { classes } = this.props;
    return (
      <GridList className={classes.gridList} cols={1} cellHeight="auto">
        {chatStore.emojis.map((el, index) => (
          <Grid container direction="column" key={index} spacing={8}>
            <Grid item onClick={chatStore.addEmojiToText}>
              {el[0]}
            </Grid>
            <Grid item onClick={chatStore.addEmojiToText}>
              {el[1]}
            </Grid>
          </Grid>
        ))}
      </GridList>
    );
  }
}

@withStyles(styles)
@observer
class SendModule extends Component {
  render() {
    const { onChange, onSend, classes } = this.props;
    return (
      <div className="fixed-footer">
        <Grid
          container
          alignItems="center"
          spacing={8}
          style={{ padding: "0 8px" }}
        >
          <Grid item style={{ flexGrow: "1" }}>
            <TextField
              placeholder="输入"
              value={chatStore.text}
              fullWidth
              margin="normal"
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <Button
              mini
              variant="fab"
              color="secondary"
              onClick={chatStore.toggleShowEmojis}
            >
              <Icon>sentiment_satisfied_alt</Icon>
            </Button>
          </Grid>
          <Grid>
            <Button mini color="primary" variant="contained" onClick={onSend}>
              发送
            </Button>
          </Grid>
        </Grid>
        {chatStore.showEmojis && <Emojis />}
      </div>
    );
  }
}

@withStyles(styles)
@observer
class Chat extends Component {
  handleChange = e => {
    chatStore.text = e.target.value;
  };

  handleSend = e => {
    const sd = {
      from: userStore.userinfo._id,
      to: this.props.match.params.user,
      content: chatStore.text,
      avatar: userStore.userinfo.avatar,
      from_type: userStore.userinfo.type
    };
    chatStore.sendMsg(sd);
    chatStore.text = "";
  };

  componentWillMount() {
    // 避免在刷新页面时没有数据
    if (!chatStore.chatmsg.length) {
      chatStore.getMsgList(userStore.userinfo._id); // 获取msg列表
      chatStore.msgRecv(); // 监听每次socket的返回数据
    }
  }

  componentWillUnmount() {
    // 谁发给我的id
    const from = this.props.match.params.user;
    chatStore.readMsg(from);
  }

  handleBack = e => {
    this.props.history.goBack();
  };

  render() {
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
          <AppBar position="fixed" style={{ height: "8vh" }}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                onClick={this.handleBack}
              >
                <Icon>chevron_left</Icon>
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.grow}
              >
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
          <SendModule onChange={this.handleChange} onSend={this.handleSend} />
        </div>
      </Fragment>
    );
  }
}

export default Chat;
