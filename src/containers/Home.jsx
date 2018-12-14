import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from 'com_/Card';
import Blog from 'con_/Blog';
const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
  },
});
const Home = function(props) {
  const {classes} = props;
  return (
    <div className={classes.content}>
      <Blog />
    </div>
  );
};
export default withStyles(styles)(Home);
