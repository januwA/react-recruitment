import { observable, action, computed, toJS, set } from "mobx";
import axios from "axios";
import io from "socket.io-client";
import userStore from "../store/user.store";
import Cookies from "js-cookie";
import * as _ from "lodash";
let url = "";
if (process.env.NODE_ENV !== "production") {
  url = "ws://localhost:5000";
} else {
  url = "ws://react.recruitment.ajanuw.fun:5000";
}
const socket = io(url);
const l = console.log;
class ChatStore {
  @observable
  only = true;

  @observable
  text = "";

  @observable
  chatmsg = []; // 消息列表

  @observable
  unread = 0; // 未读消息条数

  @observable
  users = {};

  @observable
  showEmojis = false;

  @computed
  get emojis() {
    return _.chunk(
      "😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 ".split(/\s+/),
      2
    );
  }

  /**
   * * 获取聊天列表
   */
  @action.bound
  getMsgList = async e => {
    let r = await axios.get("/user/getMsgList");
    if (r.code == 0) {
      // 更新列表和未读消息
      set(this, {
        chatmsg: r.data.msgs,
        users: r.data.users,
        // 展示的未读消息数量，需要是未读状态&接收者是自己的消息
        unread: r.data.msgs.filter(
          el => el.read == false && el.to == sessionStorage.getItem("_id")
        ).length
      });
    }
  };

  /**
   * * 接收信息
   */
  @action.bound
  msgRecv = e => {
    this.only = false;
    socket.on("resmsg", data => {
      this.chatmsg.push(data);
      // 在每次發送消息也需要过滤
      this.unread = this.chatmsg.filter(
        el => !el.read && el.to == sessionStorage.getItem("_id")
      ).length;
    });
  };

  /**
   * * 发送消息
   */
  @action.bound
  sendMsg = sd => {
    socket.emit("message", sd);
  };

  /**
   * * 切换emojis的溴铵是或隐藏
   */
  @action.bound
  toggleShowEmojis() {
    this.showEmojis = !this.showEmojis;
  }

  @action.bound
  addEmojiToText = e => {
    this.text += e.target.innerHTML;
  };

  // 更改from=from, to=userid的消息的 read改为strue
  @action.bound
  readMsg = async from => {
    let r = await axios.post("/user/readmsg", { from });
    const userid = sessionStorage.getItem("_id");
    if (r.code == 0) {
      this.unread -= r.data;
      this.chatmsg = this.chatmsg.map(el => ({
        ...el,
        read: el.from === from ? true : el.read
      }));
    }
  };
}

export default new ChatStore();
