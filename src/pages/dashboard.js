import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import { Switch, Route, Redirect } from "react-router-dom";
import userStore from "../store/user.store";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import NavLinkBar from "../components/navLinkBar";
import Enterprise from "./enterprise";
import JobSeeker from "./jobSeeker";
import Mine from "./mine";
import chatStore from "../store/chat.store";
import { toJS } from "mobx";
import Msg from "./msg";

const l = console.log;
const styles = theme => ({
  flexGrow1: {
    flexGrow: 1,
    textAlign: "center"
  }
});

@withStyles(styles)
@observer
class Dashboard extends Component {
  componentWillMount() {
    // 避免多次调用 socket监听
    if (!chatStore.chatmsg.length && chatStore.only) {
      chatStore.getMsgList(userStore.userinfo._id); // 获取msg列表
      chatStore.msgRecv(); // 监听每次socket的返回数据
    }
  }
  render() {
    const userinfo = userStore.userinfo;
    const navList = [
      {
        path: "/enterprise",
        text: "求职者",
        icon: "group",
        title: "求职者列表",
        component: Enterprise,
        hide: userinfo.type == "jobSeeker"
      },
      {
        path: "/jobSeeker",
        text: "企业",
        icon: "domain",
        title: "企业列表",
        component: JobSeeker,
        hide: userinfo.type == "enterprise"
      },
      {
        path: "/msg", // 求职者需要查看企业列表
        text: "消息",
        icon: "message",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/mine", // 求职者需要查看企业列表
        text: "我的",
        icon: "person",
        title: "个人中心",
        component: Mine
      }
    ];
    //  企业登陆后查看求职者列表，求职者登陆后查看企业列表
    const { classes: cs } = this.props;
    const { pathname } = this.props.location;
    const el = navList.find($_ => $_.path === pathname);
    return !!el ? (
      <Fragment>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={cs.flexGrow1}
            >
              {el.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 60 }} />
        <Switch>
          {navList.map($_ => (
            <Route
              exact
              key={$_.path}
              path={$_.path}
              component={$_.component}
            />
          ))}
        </Switch>
        <div style={{ marginTop: 60 }} />
        <NavLinkBar data={navList} />
      </Fragment>
    ) : (
      <Redirect to="/login" exact />
    );
  }
}

export default Dashboard;
