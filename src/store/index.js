import { observable, action, computed } from "mobx";
import axios from "axios";
import userStore from "./user.store";
import chatStore from "./chat.store";

const l = console.log;
class Store {
  @observable
  isL = false;
}

export default new Store();
