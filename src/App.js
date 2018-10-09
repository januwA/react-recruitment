import React, { Component, Fragment } from "react";
import { BrowserRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { LinearProgress, Fade } from "@material-ui/core";
import _ from "lodash";
import store from "@/store";
import { observer } from "mobx-react";
import routers from "./routers";
import Tabbars from "./components/tabbar";
import GlobalProgress from '@/components/progress'
import AuthRoute from '@/components/authRoute'

const l = console.log;
@observer
class App extends Component {
  componentWillMount(){
  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <GlobalProgress />
          <AuthRoute />
          {/* <Tabbars /> */}
          <Switch>
            {routers.map((route, index) => {
              // 404
              if (route.path === "**") {
                return (
                  <Route
                    component={() => route.component || route.render}
                    key={index}
                  />
                );
              }

              // redirect
              if (route.redirectTo) {
                return (
                  <Redirect
                    from={route.path}
                    to={route.redirectTo}
                    exact
                    strict
                    key={index}
                  />
                );
              }

              return <Route exact {...route} key={index} />;
            })}
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
