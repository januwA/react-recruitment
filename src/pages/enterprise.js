import React, { Component, Fragment } from "react";
import axios from "axios";
import { api } from "../api";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import userListStore from "../store/userList.store";
import { observer } from "mobx-react";
import UserList from '../components/userlist'

const styles = theme => ({
  card: {}
});

const l = console.log;
@withStyles(styles)
@observer
class Enterprise extends Component {
  async componentWillMount() {
    userListStore.getUserList("jobSeeker");
  }

  render() {
    const { classes } = this.props;
    return <UserList list={userListStore.userlist} />
  }
}

export default Enterprise;
