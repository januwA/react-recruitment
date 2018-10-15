import React, { Component, Fragment } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  flexGrow1: {
    flexGrow: 1,
    textAlign: "center"
  }
});
const l = console.log;

@withStyles(styles)
class ATitle extends Component {
  render() {
    const { classes: cs, children } = this.props;
    return (
      <Fragment>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={cs.flexGrow1}>
              {children}
            </Typography>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

ATitle.PropTypes = {
  children: PropTypes.node.isRequired
};
export default ATitle;
