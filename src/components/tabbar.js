import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AppBar, Tabs, Tab, Icon } from "@material-ui/core";
import { observer } from "mobx-react";

const l = console.log;

@withRouter
@observer
class Tabbars extends Component {
  state = {
    isShowTabbar: true,
    tabs: [
      {
        label: "首页",
        to: "/home",
        icon: "home"
      },
      {
        label: "关于",
        icon: "supervised_user_circle",
        to: "/about"
      },
      {
        label: "我的",
        icon: "perm_identity",
        to: "/mine"
      }
    ],
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  toNav = to => e => {
    this.props.history.push(to);
  };

  componentWillMount() {
    // l(this.props)
    let { location, history } = this.props;

    // 确保用户在浏览器改变路由，激活按钮发生变化
    this.changeTabbarValue(location.pathname);

    // 监听路由的变化，主要用于重定向时确保激活按钮发生变化
    history.listen(({ pathname }, action) => {
      l("router change");
      // action === "REPLACE" &&
      this.changeTabbarValue(pathname);
    });
  }

  changeTabbarValue(pathname) {
    let i = this.state.tabs.findIndex(({ to }) => to.includes(pathname));
    if (i < 0) {
      this.setState({
        value: -1
      });
      return l("没找到根路由");
    }
    i !== this.state.value &&
      this.setState({
        value: i
      });
  }

  componentDidMount() {
    document.title = "Ajanuw";
  }

  render() {
    return (
      <AppBar position="static" color="default">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          {this.state.tabs.map(($_, index) => {
            let { label, to, icon} = $_
            return (
              <Tab
                label={label}
                key={index}
                onClick={this.toNav(to)}
                icon={<Icon>{icon}</Icon>}
              />
            );
          })}
        </Tabs>
      </AppBar>
    );
  }
}

export default Tabbars;
