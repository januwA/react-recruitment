import React, { Component, Fragment } from "react";
import chatStore from "../store/chat.store";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as _ from "lodash";
const l = console.log;

const userid = sessionStorage.getItem("_id");
@observer
class Msg extends Component {
  render() {
    // 更具 chatid 来分组
    const msgGroup = {};
    for (let el of chatStore.chatmsg) {
      msgGroup[el.chatid] = msgGroup[el.chatid] || [];
      msgGroup[el.chatid].push(el);
    }
    const msgList = _.values(msgGroup);
    return (
      <Fragment>
        <ul>
          {msgList.map(el => {
            // 展示最新的一条消息
            const lastMsg = _.last(el);
            // 信息发送着是自己的话就取接收者的信息，否则相反
            let targetId = lastMsg.from == userid ? lastMsg.to : lastMsg.from;
            const info = chatStore.users[targetId];
            return !!info ? (
              <li key={lastMsg._id}>
                <img src={info.avatar} width="25" height="25" />
                <div>{lastMsg.content}</div>
                <div>{info.name}</div>
              </li>
            ) : null;
          })}
        </ul>
      </Fragment>
    );
  }
}

export default Msg;
