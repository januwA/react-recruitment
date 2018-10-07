import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";
import * as serviceWorker from "./serviceWorker";

// 自定义主题
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
