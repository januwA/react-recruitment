import React, { Component, Fragment } from "react";
import chatStore from "../store/chat.store";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as _ from "lodash";
import * as dayjs from "dayjs";
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  Divider,
  Grid,
  Badge
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import userStore from "../store/user.store";
const l = console.log;
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit / 4
  }
});

@observer
class ListItemTextSecondary extends Component {
  render() {
    const { content, time } = this.props;
    return (
      <Grid container justify="space-between" component="span">
        <Grid item component="span">
          {content}
        </Grid>
        <Grid item component="span">
          {time}
        </Grid>
      </Grid>
    );
  }
}

@withStyles(styles)
@observer
class Msg extends Component {
  render() {
    const { classes } = this.props;
    // 更具 chatid 来分组
    // 只显示发给我的消息，过滤掉别人的消息
    const userid = sessionStorage.getItem("_id");
    const msgGroup = {};
    for (let el of chatStore.chatmsg) {
      if (el.to !== userid) continue;
      msgGroup[el.chatid] = msgGroup[el.chatid] || [];
      msgGroup[el.chatid].push(el);
    }
    l(msgGroup);
    // 对消息列表进行排序，最新的消息显示在最上面
    const msgList = _.values(msgGroup).sort((a, b) => {
      const aLast = _.last(a).create_time;
      const bLast = _.last(b).create_time;
      return bLast - aLast;
    });
    l(msgList);
    return msgList.length ? (
      <List>
        {msgList.map(el => {
          // 展示最新的一条消息
          const lastMsg = _.last(el);
          l(lastMsg);
          // 信息发送着是自己的话就取接收者的信息，否则相反
          let targetId = lastMsg.from == userid ? lastMsg.to : lastMsg.from;
          const time = dayjs(lastMsg.create_time).format("YYYY-MM-DD HH:mm:ss");
          const info = chatStore.users[targetId];
          l(info);
          const unreadNum = el.filter(v => !v.read && v.to == userid).length;
          l(unreadNum);
          return !!info ? (
            <Fragment key={lastMsg._id}>
              <ListItem
                button
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {!!unreadNum ? (
                  <Badge
                    classes={{ badge: classes.margin }}
                    badgeContent={unreadNum}
                    color="secondary"
                  >
                    <Avatar src={info.avatar} width="25" height="25" />
                  </Badge>
                ) : (
                  <Avatar src={info.avatar} width="25" height="25" />
                )}
                <ListItemText
                  primary={info.name}
                  secondary={
                    <ListItemTextSecondary
                      content={lastMsg.content}
                      time={time}
                    />
                  }
                />
              </ListItem>
              <Divider inset component="li" />
            </Fragment>
          ) : null;
        })}
      </List>
    ) : null;
  }
}

export default Msg;
