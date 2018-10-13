import { observable, action, computed, set, toJS } from "mobx";
import axios from "axios";
import { getRedirectPath } from "../util";
import { api } from "@/api";
import ImageCompressor from "image-compressor.js";
import * as U from "../util";

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
  userinfo = {};

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
      r = await axios.post(api.userRegister, { user, pwd, type });
      // l(r);
      if (r.code === 0) {
        // 注册成功
        set(this, {
          errMsg: "",
          isAuth: true,
          redirectTo: getRedirectPath({ type })
        });
      } else {
        this._error(r.msg);
      }
    } catch (error) {
      this._error(String(error));
    }
  }

  /**
   * 用户登陆
   */
  @action.bound
  login = ({ user, pwd }) => async e => {
    user = user.trim();
    pwd = pwd.trim();
    try {
      let r = await axios.post(api.userLogin, { user, pwd });
      // l(r)
      if (r.code === 0) {
        // 登陆成功
        this.errMsg = "";
        this.isAuth = true;
        this.redirectTo = getRedirectPath(r.data);
        this.userinfo = r.data;
      } else {
        this._error(r.msg);
      }
    } catch (error) {
      this._error(String(error));
    }
  };

  @action.bound
  saveUserInfo(userinfo) {
    this.userinfo = userinfo;
  }

  /**
   * * 用户完善信息
   * @param {avatar,title,company,money,decs} data 企业完善的信息资料
   */
  @action.bound
  update = data => async e => {
    let sd = new FormData();
    for (let k in data) {

      // 压缩下头像图片
      if (k === "avatar") {
        let result = await new ImageCompressor().compress(data[k], {
          quality: 0.6
        });
        // 用户登陆后的id是唯一的
        sd.append(k, result, this.userinfo._id + U.fileSuffix(result.name));
        try {
          let r = await axios.post(api.update, sd);
          if (r.code === 0) {
            this.userinfo = r.data;
            this.redirectTo = getRedirectPath(r.data);
          } else {
            this.errMsg = r.msg;
          }
        } catch (error) {
          this.errMsg = String(error);
        }
      } else {
        sd.append(k, data[k]);
      }
    }
  };

  _error(msg) {
    this.errMsg = msg;
    this.isAuth = false;
  }
}

export default new UserStore();
