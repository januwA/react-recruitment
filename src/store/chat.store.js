import { observable, action, computed, toJS } from "mobx";
import axios from "axios";
import io from "socket.io-client";
import userStore from "../store/user.store";
import Cookies from "js-cookie";

const socket = io("ws://localhost:5000");
const l = console.log;
class ChatStore {
  @observable
  chatmsg = []; // 消息列表

  @observable
  unread = 0; // 未读消息条数

  @observable
  users = {};

  /**
   * * 获取聊天列表
   */
  @action.bound
  getMsgList = async e => {
    let r = await axios.get("/user/getMsgList");
    if (r.code == 0) {
      // 更新列表和未读消息
      this.chatmsg = r.data.msgs;
      this.users = r.data.users;
      // 展示的未读消息数量，需要是未读状态&接收者是自己的消息
      this.unread = r.data.msgs.filter(
        el => !el.read && el.to == sessionStorage.getItem("_id")
      ).length;
    }
  };

  /**
   * * 接收信息
   */
  @action.bound
  msgRecv = e => {
    socket.on("resmsg", data => {
      l(data);
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
}

export default new ChatStore();
