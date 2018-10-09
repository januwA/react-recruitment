import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const l = console.log;
@withRouter
class AuthRoute extends Component {
  async componentDidMount() {
    const { history, location } = this.props;
    let continerRoutes = ["/login", "/registered"];
    if (continerRoutes.includes(location.pathname)) return null;

    // 获取用户信息
    let r = await axios.get("/user/info");
    // l(r)
    // 是否登陆
    if (r.code === 0) {
      // 有登陆信息
    } else {
      // 没有登陆，前往登陆
      history.push("/login");
    }
    // 现在的url地址 login不需要跳转
    // 用户的type 是求职者，还是企业
    // 用户是否完善信息
  }

  render() {
    return <Fragment />;
  }
}

export default AuthRoute;
