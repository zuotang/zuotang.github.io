import React from 'react';
import grey from '@material-ui/core/colors/grey';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  loadPanel: {
    position: 'absolute',
    zIndex: '999',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  progress: {},
});
const PageLoading = ({classes}) => (
  <div className={classes.loadPanel}>
    <CircularProgress className={classes.progress} style={{color: grey[800]}} />
  </div>
);
export default withStyles(styles)(PageLoading);
