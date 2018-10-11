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
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ATitle from "../components/atitle";
import AvatarUpload from "../components/avatarUpload";

const styles = theme => ({
  flexGrow1: {
    flexGrow: 1,
    textAlign: "center"
  }
});
const l = console.log;

@withStyles(styles)
class EnterpriseInfo extends Component {
  state = {
    title: "",
    company: "",
    money: "",
    desc: ""
  };
  render() {
    const { classes: cs } = this.props;
    const { title, company, money, desc } = this.state;
    return (
      <Fragment>
        <Paper>
          <ATitle>企业完善信息页面</ATitle>
          <AvatarUpload />

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
          </List>
        </Paper>
      </Fragment>
    );
  }

  handleChange = k => e => {
    this.setState({ [k]: e.target.value });
  };
}
export default EnterpriseInfo;
