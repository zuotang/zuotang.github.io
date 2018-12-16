import React from 'react';
import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
  },
});
const Content = function(props) {
  const {classes, children} = props;
  return <div className={classes.content}>{children}</div>;
};
export default withStyles(styles)(Content);
