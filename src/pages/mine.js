import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import userStore from "../store/user.store";
import { toJS } from "mobx";
import { Avatar, Grid, Typography, Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
  }
});

const l = console.log;
@withStyles(styles)
@observer
class Mine extends Component {
  static propTypes = {};

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
            <Grid item container justify="center" direction='column' className={classes.title}>
              <Typography component="h5" gutterBottom align='center'>
                {userStore.userinfo.user}
              </Typography>
              {userStore.userinfo.company && (
                <Typography component="h5" gutterBottom align='center'>
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
        <Grid container justify='center' style={{marginTop: '20px'}}>
            <Grid item xs={11}>
                  <Button color='primary' variant='contained' fullWidth>退出登录</Button>
            </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Mine;
