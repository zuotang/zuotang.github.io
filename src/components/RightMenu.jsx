import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import PostContext from 'contexts_/post';

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
  const postData = useContext(PostContext);
  const {classes,replace} = props;
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
      {postData.archives.map((archive, key) => (
        <Link replace={replace} key={key} to={{pathname: `/list/archive/${archive}`}}>
          <Typography>{dayjs(archive).format('YYYY年MM月')}</Typography>
        </Link>
      ))}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        分类
      </Typography>
      {postData.categories.map((categories, key) => (
        <Link replace={replace} key={key} to={{pathname: `/list/categories/${categories}`}}>
          <Typography>{categories}</Typography>
        </Link>
      ))}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Tags
      </Typography>
      {postData.tags.map((tag, key) => (
        <Link replace={replace} key={key} to={{pathname: `/list/tag/${tag}`}}>
          <Typography>{tag}</Typography>
        </Link>
      ))}
    </React.Fragment>
  );
}

RightMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RightMenu);
