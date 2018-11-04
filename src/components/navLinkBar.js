import React, { Component, Fragment } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Icon,
  Badge
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../assets/logo.jpg";
import { observer } from "mobx-react";
import chatStore from "../store/chat.store";

const l = console.log;
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  }
});

const BadgeIcon = ({ show, count, icon }) =>
  count && show ? (
    <Badge color="secondary" badgeContent={count}>
      <Icon>{icon}</Icon>{" "}
    </Badge>
  ) : (
    <Icon>{icon}</Icon>
  );

@withRouter
@withStyles(styles)
@observer
class NavLinkBar extends Component {
  state = {
    value: this.props.location.pathname
  };
  render() {
    const { value } = this.state;
    const { classes } = this.props;
    // 需要不隐藏的数据
    const navList = this.props.data.filter($_ => !$_.hide || $_.hide === false);
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
              icon={
                <BadgeIcon
                  show={$_.path == "/msg"}
                  count={chatStore.unread}
                  icon={$_.icon}
                />
              }
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
