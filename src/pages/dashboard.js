import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import userStore from "../store/user.store";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import NavLinkBar from "../components/navLinkBar";
import Enterprise from './enterprise'
import JobSeeker from './jobSeeker'

const Msg = () => "msg";
const Mine = () => "mine";

const styles = theme => ({
  flexGrow1: {
    flexGrow: 1,
    textAlign: "center"
  }
});
const l = console.log;
@withStyles(styles)
@observer
class Dashboard extends Component {
  render() {
    //  企业登陆后查看求职者列表，求职者登陆后查看企业列表
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

    const { classes: cs } = this.props;
    const { pathname } = this.props.location;
    l(pathname);
    return (
      <Fragment>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={cs.flexGrow1}>
              {navList.find($_ => $_.path === pathname).title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{marginTop: 60}}></div>
        <Switch>
          {navList.map($_ => (
            <Route key={$_.path} path={$_.path} component={$_.component} />
          ))}
        </Switch>
        <div style={{marginTop: 60}}></div>
        <NavLinkBar data={navList} />
      </Fragment>
    );
  }
}

export default Dashboard;
