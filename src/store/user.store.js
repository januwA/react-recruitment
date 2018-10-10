import { observable, action, computed, set } from "mobx";
import axios from "axios";
import { getRedirectPath } from "@/util";

const l = console.log;
class UserStore {
  @observable
  redirectTo = "";

  // 错误信息
  @observable
  errMsg = "";

  // 是否登陆
  @observable
  isAuth = false;

  // 用户信息
  @observable
  user = "";

  @observable
  pwd = "";

  @observable
  type = "";

  /**
   * 用户注册
   * @param {*} param0 
   */
  @action.bound
  async regisger({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
      this.errMsg = "请户名密码必须输入";
      return;
    }
    if (pwd !== repeatpwd) {
      this.errMsg = "两次密码输入不一样";
      return;
    }
    let r;
    try {
      r = await axios.post("/user/register", { user, pwd, type });
      // l(r);
      if (r.code === 0) {
        // 注册成功
        set(this,{
          isAuth: true,
          redirectTo: getRedirectPath({type})
        })
      } else {
        this.errMsg = r.msg;
        this.isAuth = false
      }
    } catch (error) {
      this.errMsg = String(error);
      this.isAuth = false
    }
  }

  /**
   * 用户登陆
   */
  @action.bound
  login = ({user, pwd}) => async (e) => {
    user = user.trim()
    pwd = pwd.trim()
    try {
      let r = await axios.post('/user/login',{user, pwd})
      // l(r)
      if(r.code === 0){
        // 登陆成功
        this.isAuth = true;
        this.redirectTo = getRedirectPath(r.data)
      }else{
        this.errMsg = r.msg;
        this.isAuth = false
      }
    } catch (error) {
      this.errMsg = String(error);
      this.isAuth = false
    }

  }
}

export default new UserStore();