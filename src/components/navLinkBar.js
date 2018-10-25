import React, { Component, Fragment } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Icon
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from '../assets/logo.jpg'
import { observer } from "mobx-react";

const l = console.log;
@withRouter
@observer
class NavLinkBar extends Component {
  state = {
    value: this.props.location.pathname
  };
  render() {
    // 需要不隐藏的数据
    const navList = this.props.data.filter($_ => !$_.hide || $_.hide === false);
    const { value } = this.state;
    return (
      <Fragment>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className="fixed-footer">
          {navList.map($_ => (
            <BottomNavigationAction
              value={$_.path}
              key={$_.path}
              label={$_.text}
              icon={<Icon>{$_.icon}</Icon>}
            />
          ))}
        </BottomNavigation>
      </Fragment>
    );
  }
  handleChange = (e, value) => {
    this.setState({ value });
    this.props.history.push(value);
  };
}
NavLinkBar.propTypes = {
  data: PropTypes.array.isRequired
};
export default NavLinkBar;
