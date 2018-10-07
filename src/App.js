import React, { Component, Fragment } from "react";
import {
  AppBar,
  Button,
  Tabs,
  Tab,
  Icon,
  Typography,
  Fade,
  Slide
} from "@material-ui/core";
import _ from "lodash";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Tabbars from './components/tabbar'

const l = console.log;

let Home = props => {
  return (
    <Fragment>
      <Typography variant="headline">首页</Typography>
    </Fragment>
  );
};
let About = props => {
  return (
    <Fragment>
      <Typography variant="headline">关于</Typography>
    </Fragment>
  );
};

let Mine = props => {
  return (
    <Fragment>
      <Typography variant="headline">我的</Typography>
    </Fragment>
  );
};
let Login = props => {
  return (
    <Fragment>
      <Typography variant="headline">login</Typography>
    </Fragment>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Tabbars />
          <Switch>
            <Redirect from="/" to="/home" exact strict />
            <Route
              exact
              strict
              path="/home"
              render={props => <Home {...props} />}
            />
            <Route path="/about" component={About} />
            <Route path="/mine" component={Mine} />
            <Route path="/login" component={Login} />

            <Route
              render={() => {
                return <div>404</div>;
              }}
            />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
