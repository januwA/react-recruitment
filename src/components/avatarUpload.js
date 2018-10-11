import React, { Component, Fragment } from "react";
import { Avatar, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
            <Typography>点击上传头像</Typography>
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

  handleUploadAvatar = (e) => {
    let files = e.target.files;
    if (files.length === 0) return;
    let file = files[0];

    this.setState({
      avatarData: window.URL.createObjectURL(file)
    });
  }
}

export default AvatarUpload;
