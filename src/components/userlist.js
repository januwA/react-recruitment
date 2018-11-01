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
import { withStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";


const styles = theme => ({
  card: {}
});
@withStyles(styles)
@withRouter
@observer
class UserList extends Component {
  handleClick = user => e => {
    // 跳转到聊天页面
    this.props.history.push(`/chat/${user}`);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        spacing={32}
        alignItems="center"
        component="section">
        {this.props.list.map($_ => (
          <Grid key={$_._id} item xs={11}>
            <Card className={classes.card} onClick={this.handleClick($_.user)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={$_.avatar}
                  title={$_.user}
                  height="140"
                />
                <CardContent>
                  <Typography variant="headline" component="h2">
                    {$_.user}
                  </Typography>
                  <Typography variant="subheading" gutterBottom>
                    {$_.title}
                  </Typography>
                  <Typography>{$_.desc}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}
UserList.propTypes = {
  list: PropTypes.array.isRequired
};

export default UserList;
