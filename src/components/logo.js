import React, { Component, Fragment } from "react";
import { Grid,Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import LogoImage from "@/assets/logo.jpg";

const styles = theme => ({
  container: {
    padding: '1rem 0'
  },
  img: {
    width: 160,
    height: 160,
  }
});

@withStyles(styles)
class Logo extends Component {
  render() {
    let { classes: cs } = this.props;
    return (
      <Fragment>
        <Grid className={cs.container} container alignItems="center" justify="center">
          <Grid item>
            <Avatar alt="logo image"
        src={LogoImage} className={cs.img}/>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Logo;