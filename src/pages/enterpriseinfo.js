/**
 * * 企业完善信息页面
 * * 企业注册完后，跳转到该页面完善信息
 */

import React, { Component, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  Grid,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ATitle from "../components/atitle";
import AvatarUpload from "../components/avatarUpload";
import { Redirect } from "react-router-dom";
import userStore from "../store/user.store";
import { observer } from "mobx-react";

const styles = theme => ({
  root: {
    height: "1vh"
  },
  flexGrow1: {
    flexGrow: 1,
    textAlign: "center"
  },
  block: {
    marginTop: "3rem"
  }
});
const l = console.log;

@withStyles(styles)
@observer
class EnterpriseInfo extends Component {
  state = {
    avatar: "",
    title: "",
    company: "",
    money: "",
    desc: ""
  };
  render() {
    const { classes: cs, location } = this.props;
    const { title, company, money, desc } = this.state;
    const isDirect =
      userStore.redirectTo && userStore.redirectTo !== location.pathname;
    return (
      <Fragment>
        {isDirect && <Redirect to={userStore.redirectTo} />}
        <Paper className={cs.root}>
          <ATitle>企业完善信息</ATitle>
          <div className={cs.block} />
          <AvatarUpload onChange={this.handleAvatar} />
          <List component="nav">
            <ListItem>
              <TextField
                label="招聘职位"
                value={title}
                onChange={this.handleChange("title")}
                fullWidth
                margin="dense"
              />
            </ListItem>
            <ListItem>
              <TextField
                label="公司名称"
                value={company}
                onChange={this.handleChange("company")}
                fullWidth
                margin="dense"
              />
            </ListItem>
            <ListItem>
              <TextField
                label="职位薪资"
                value={money}
                onChange={this.handleChange("money")}
                fullWidth
                margin="dense"
              />
            </ListItem>
            <ListItem>
              <TextField
                label="职位简介"
                value={desc}
                onChange={this.handleChange("desc")}
                fullWidth
                multiline
                margin="normal"
                variant="outlined"
                rows="5"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </ListItem>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={10}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={userStore.update(this.state)}>
                    保存数据
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Paper>
      </Fragment>
    );
  }

  handleChange = k => e => this.setState({ [k]: e.target.value });
  handleAvatar = avatar => this.setState({ avatar });
}
export default EnterpriseInfo;
