import { observable, action, computed, set, toJS } from "mobx";
import axios from "axios";
import { api } from "@/api";
import * as U from "../util";

const l = console.log
class UserList {
  @observable
  userlist = []

  @action.bound
  getUserList = async type => {
    let r = await axios.get(api.list, {
      params: {
        type: type
      }
    });
    if(r.code === 0){
      this.userlist = r.data
    }
  }
}

export default new UserList()