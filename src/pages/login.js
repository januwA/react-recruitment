import React, { Component, Fragment } from "react";
import Logo from "@/components/logo";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <Fragment>
        <Logo />
        <List component="nav">
          <ListItem>
            <TextField
              label="用户名"
              autoFocus
              className=""
              value=""
              // onChange=''
              fullWidth
              margin="dense"
            />
          </ListItem>
          <ListItem>
            <TextField
              label="密码"
              className=""
              value=""
              // onChange=''
              fullWidth
              margin="dense"
            />
          </ListItem>
        </List>
        <Grid container justify="space-around" spacin={8}>
          <Grid item xs={4} container justify="center">
            <Button color="primary" variant="contained" fullWidth>
              登陆
            </Button>
          </Grid>
          <Grid item xs={4} container justify="center">
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              component={props => <Link to="/registered" {...props} />}
            >
              注册
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Login;
