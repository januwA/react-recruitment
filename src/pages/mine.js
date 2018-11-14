import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import userStore from "../store/user.store";
import { toJS } from "mobx";
import {
  Avatar,
  Grid,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";

const l = console.log;
const styles = theme => ({
  avatarBox: {
    padding: "10px 0"
  },
  avatar: {
    width: "7rem",
    height: "7rem"
  },
  title: {
    marginTop: "0.4rem"
  },
  logoutBtn: {
    ...theme.props.centerX,
    width: "80vw",
    marginTop: "2rem"
  }
});

@withStyles(styles)
@observer
class Mine extends Component {
  static propTypes = {};
  state = {
    open: false
  };
  /**
   * * 确认退出登录
   * * 删除cookie，登录信息，登录状态，重定向页面,并跳转到到login
   */
  handleOut = () => {
    Cookies.remove("userid");
    userStore.userinfo = {};
    userStore.isAuth = false
    userStore.redirectTo = '/login'
    this.setState({ open: false });
    this.props.history.replace('/login')
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  logout = e => {
    this.setState({ open: true });
  };
  render() {
    l(toJS(userStore.userinfo));
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.root}>
          <Grid container className={classes.avatarBox} direction="column">
            <Grid item container justify="center">
              <Avatar
                src={userStore.userinfo.avatar}
                className={classes.avatar}
              />
            </Grid>
            <Grid
              item
              container
              justify="center"
              direction="column"
              className={classes.title}>
              <Typography variant="subtitle1" gutterBottom align="center">
                {userStore.userinfo.user}
              </Typography>
              {userStore.userinfo.company && (
                <Typography component="h5" gutterBottom align="center">
                  {userStore.userinfo.company}
                </Typography>
              )}
            </Grid>
            <Grid item container justify="center">
              <Grid item xs={11}>
                <Typography gutterBottom>
                  标签: {userStore.userinfo.title}
                </Typography>
                <Typography gutterBottom>
                  详情: {userStore.userinfo.desc}
                </Typography>
                {userStore.userinfo.money && (
                  <Typography gutterBottom>
                    薪资: {userStore.userinfo.money}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Button
          color="primary"
          variant="contained"
          className={classes.logoutBtn}
          onClick={this.logout}>
          退出登录
        </Button>

        <Dialog fullWidth open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{"注销"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              确定退出登录吗？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleOut} color="primary">
              确认
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Mine;
