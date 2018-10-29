import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";
import * as serviceWorker from "./serviceWorker";
import "./axios.config";
import App from "./App";
import "./index.css";

// 自定义主题
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
  props: {
    centerX: {
      marginLeft: "50%",
      transform: "translateX(-50%)"
    },
    centerY: {
      marginTop: "50%",
      transform: "translateY(-50%)"
    }
  },
});

ReactDOM.render(
  <Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
