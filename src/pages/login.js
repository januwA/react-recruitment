import React, { Component, Fragment } from "react";
import Logo from "@/components/logo";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import UserStore from "@/store/user.store";
import { observer } from "mobx-react";
import ErrorAlter from "@/components/errorAlter";

@observer
class Login extends Component {
  state = {
    user: "",
    pwd: ""
  };

  render() {
    const { user, pwd } = this.state;
    return (
      <Fragment>
        {UserStore.redirectTo && <Redirect to={UserStore.redirectTo} />}
        <Logo />
        <List component="nav">
          <ListItem>
            <TextField
              label="用户名"
              autoFocus
              value={user}
              onChange={this.handleChange("user")}
              fullWidth
              margin="dense"
            />
          </ListItem>
          <ListItem>
            <TextField
              label="密码"
              value={pwd}
              onChange={this.handleChange("pwd")}
              fullWidth
              margin="dense"
              type='password'
            />
          </ListItem>
        </List>
        <Grid container justify="space-around" spacin={8}>
          <Grid item xs={4} container justify="center">
            <Button
              color="primary"
              variant="contained"
              fullWidth
              variant='contained'
              onClick={UserStore.login(this.state)}>
              登陆
            </Button>
          </Grid>
          <Grid item xs={4} container justify="center">
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              component={props => <Link to="/registered" {...props} />}>
              注册
            </Button>
          </Grid>
        </Grid>
        <ErrorAlter
          msg={UserStore.errMsg}
          onClose={this.handleClose}
        />
      </Fragment>
    );
  }

  /**
   * 填写账号，密码
   */
  handleChange = stateKey => e => {
    this.setState({
      [stateKey]: e.target.value
    });
  };

  /**
   * 清除错误消息
   */
  handleClose = () => (UserStore.errMsg = "");

  componentWillMount() {
    // UserStore.errMsg = ''
  }
}

export default Login;
