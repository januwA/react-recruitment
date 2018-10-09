import React, { Component, Fragment } from "react";
import Logo from "@/components/logo";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  ListItemSecondaryAction
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const l = console.log;

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

@withStyles(styles)
class Registered extends Component {
  state = {
    type: "jobSeeker", // or enterprise
    user: "",
    pwd: "",
    repeatpwd: ""
  };

  render() {
    const { type, user, pwd, repeatpwd } = this.state;
    const { classes: cs } = this.props;
    return (
      <Fragment>
        <Logo />
        <List component="nav">
          <ListItem dense>
            <TextField
              label="用户名"
              autoFocus
              value={user}
              onChange={this.handleChange("user")}
              fullWidth
              margin="dense"
            />
          </ListItem>
          <ListItem dense>
            <TextField
              label="密码"
              type='password'
              value={pwd}
              onChange={this.handleChange("pwd")}
              fullWidth
              margin="dense"
            />
          </ListItem>
          <ListItem dense>
            <TextField
              label="确认密码"
              type='password'
              value={repeatpwd}
              onChange={this.handleChange("repeatpwd")}
              fullWidth
              margin="dense"
            />
          </ListItem>
          <ListItem dense button>
            <ListItemText primary={"求职者"} />
            <ListItemSecondaryAction>
              <Radio
                checked={type === "jobSeeker"}
                onChange={this.radioChange("jobSeeker")}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense button>
            <ListItemText primary={"企业"} />
            <ListItemSecondaryAction>
              <Radio
                checked={type === "enterprise"}
                onChange={this.radioChange("enterprise")}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Grid container justify="center" className={cs.submit}>
          <Grid item xs={10}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={this.handleRegistered}
            >
              提交注册
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  /**
   * 选择 type
   */
  radioChange = type => e => {
    this.setState({ type });
  };

  /**
   * 填写账号，密码，确认密码
   */
  handleChange = stateKey => e => {
    this.setState({
      [stateKey]: e.target.value
    });
  };

  /**
   * 注册按钮
   */
  handleRegistered = () => {
    l(this.state)
  };

  componentDidMount(){
    document.title = '欢迎注册~~'
  }
}

export default Registered;
