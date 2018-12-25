import React from 'react';
import {github} from '_public';
import GitHub from 'com_/icons/GitHub';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
});

function Header(props) {
  let {
    classes,
    location: {pathname},
    history: {goBack},
    title,
    setOpen,
  } = props;
  let showBack = pathname != '/';
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {!showBack && (
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={e => {
              setOpen(true);
            }}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        {showBack && (
          <IconButton color="inherit" aria-label="Open drawer" onClick={goBack} className={classes.backButton}>
            <ArrowBack />
          </IconButton>
        )}

        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {title}
        </Typography>

        <a href={github}>
          <IconButton color="inherit">
            <GitHub />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(withStyles(styles, {withTheme: true})(Header));
