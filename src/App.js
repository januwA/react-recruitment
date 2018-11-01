import React, { Component, Fragment } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { LinearProgress, Fade } from "@material-ui/core";
import _ from "lodash";
import store from "@/store";
import { observer } from "mobx-react";
import Login from "@/pages/login";
import Registered from "@/pages/registered";
import EnterpriseInfo from "@/pages/enterpriseinfo";
import JobInfo from "./pages/jobseekerinfo";
import GlobalProgress from "@/components/progress";
import AuthRoute from "@/components/authRoute";
import Dashboard from "./pages/dashboard";
import Chat from './pages/chat'

const l = console.log;
@observer
class App extends Component {
  componentWillMount() {}
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <GlobalProgress />
          <AuthRoute />
          <Switch>
            <Route exact path="/jobSeekerinfo" component={JobInfo} />
            <Route exact path="/enterpriseinfo" component={EnterpriseInfo} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registered" component={Registered} />
            <Route exact path="/chat/:user" component={Chat} />
            <Route component={Dashboard} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
