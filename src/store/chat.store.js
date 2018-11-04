import { observable, action, computed } from "mobx";
import axios from "axios";
import io from "socket.io-client";
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
      l(r.data)
      // 更新列表和未读消息
      this.chatmsg = r.data.msgs;
      this.users = r.data.users;
      this.unread = r.data.msgs.filter(el => !el.read).length;
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
      this.unread = this.chatmsg.length;
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
