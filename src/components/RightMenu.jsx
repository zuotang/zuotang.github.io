import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import WebContext from 'contexts_/web';

const styles = theme => ({
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
});

function RightMenu(props) {
  const webData = useContext(WebContext);
  const {classes} = props;
  return (
    <React.Fragment>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          关于我
        </Typography>
        <Typography>我叫唐左，你也可以叫我 luke，出生于 1993 年。</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        归档
      </Typography>
      {webData.archives.map(archive => (
        <Typography key={archive}>{archive}</Typography>
      ))}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        分类
      </Typography>
      {webData.categories.map(categories => (
        <Typography key={categories}>{categories}</Typography>
      ))}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Tags
      </Typography>
      {webData.tags.map(tag => (
        <Typography key={tag}>{tag}</Typography>
      ))}
    </React.Fragment>
  );
}

RightMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RightMenu);
