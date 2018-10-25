import React, { Component, Fragment } from "react";
import { LinearProgress, Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import store from "@/store";
import { observer } from "mobx-react";

const l = console.log;
const styles = theme => ({
  progress: {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0
  }
});

@withRouter
@withStyles(styles)
@observer
class GlobalProgress extends Component {
  componentWillMount() {}

  /**
   * 每次都触发
   */
  componentWillUpdate() {
    let {
      history: { listen }
    } = this.props;

    listen(({ pathname }, action) => {
      // l('路由发生变化')

    });
  }
  render() {
    let { classes: cs } = this.props;
    return (
      store.isL && (
        <Fragment>
          <Fade in={store.isL}>
            <LinearProgress className={cs.progress} />
          </Fade>
        </Fragment>
      )
    );
  }
}

export default GlobalProgress;
