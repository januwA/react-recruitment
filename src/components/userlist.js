import React, { Component, Fragment } from "react";
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
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@withRouter
@observer
class UserList extends Component {
  handleClick = user => e => {
    // 跳转到聊天页面
    this.props.history.push(`/chat/${user}`);
  };
  render() {
    return this.props.list.length ? (
      <Grid container direction="column" spacing={32} alignItems="center">
        {this.props.list.map($_ => (
          <Grid key={$_._id} item xs={11}>
            <Card  onClick={this.handleClick($_._id)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={$_.avatar}
                  height="140"
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    {$_.user}
                  </Typography>
                  <Typography variant="subtitle2">
                    {$_.title}
                  </Typography>
                  <Typography variant='body2'>{$_.desc}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : null;
  }
}

export default UserList;
