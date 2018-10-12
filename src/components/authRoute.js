/**
 * * 这个组件在所有的路由上，用来判断用户是否处于登陆状态(判断用户信息)
 * ! 用户处在 登陆和注册页面时跳过验证
 **/

import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { api } from "@/api";
import ErrorAlter from "@/components/errorAlter";
import userStore from "@/store/user.store";
import { observer } from "mobx-react";

const l = console.log;
@withRouter
@observer
class AuthRoute extends Component {
  async componentDidMount() {
    const { history, location } = this.props;
    let continerRoutes = ["/login", "/registered"];
    if (continerRoutes.includes(location.pathname)) return null;

    // 获取用户信息
    let r = await axios.get(api.userInfo);
    // 是否登陆
    if (r.code === 0) {
      // 有登陆信息
      userStore.saveUserInfo(r.data);
    } else {
      if (r.msg) {
        userStore.errMsg = r.msg;
      } else {
        // 没有登陆，前往登陆
        history.push("/login");
      }
    }
    // 现在的url地址 login不需要跳转
    // 用户的type 是求职者，还是企业
    // 用户是否完善信息
  }

  render() {
    return (
      <ErrorAlter
        onClose={() => (userStore.errMsg = "")}
        msg={userStore.errMsg}
      />
    );
  }
}

export default AuthRoute;
