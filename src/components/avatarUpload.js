import React, { Component, Fragment } from "react";
import { Avatar, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const l = console.log;
const styles = theme => ({
  img: {
    height: 160,
    width: 160,
    backgroundColor: theme.palette.grey[300],
    marginTop: "1rem"
  },
  textCenter: {
    textAlign: "center"
  },
  uploadInpue: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0
  }
});

@withStyles(styles)
class AvatarUpload extends Component {
  state = {
    avatarData: ""
  };
  render() {
    const { classes: cs } = this.props;
    const { avatarData } = this.state;
    return (
      <Fragment>
        <Grid container justify="center">
          <Grid item className={cs.textCenter}>
            <Avatar
              alt="upload avatar image"
              src={avatarData}
              className={cs.img}
            />
            <Typography>
              {" "}
              点击
              {avatarData ? "更换" : "上传"}
              头像160x160
            </Typography>
            <input
              name="file"
              type="file"
              accept="image/*"
              className={cs.uploadInpue}
              onChange={this.handleUploadAvatar}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  handleUploadAvatar = e => {
    let files = e.target.files;
    if (files.length === 0) return;
    let file = files[0];
    this.props.onChange(file);
    this.setState({
      avatarData: URL.createObjectURL(file)
    });
  };

  shouldComponentUpdate(newProps, newState) {
    // state 被改变
    // return true 组件刷新
    // return false  组件不用刷新，继续运行
    URL.revokeObjectURL(this.state.avatarData)
    return true;
  }
}

export default AvatarUpload;
