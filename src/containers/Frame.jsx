import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import GitHub from 'com_/icons/GitHub';
import MainListItems from './MainListItems';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListSubheader from '@material-ui/core/ListSubheader';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbarContent: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '24px',
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  webName: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
    margin: 0,
  },
});

const Frame = function(props) {
  const [open, setOpen] = useState(false);
  const {classes, children} = props;

  const drawer = (
    <React.Fragment>
      <div className={classes.toolbarContent}>
        <h6 className={classes.webName}>ZUO TANG</h6>
      </div>
      <Divider />
      <List>
        <MainListItems
          onClose={e => {
            setOpen(false);
          }}
        />
      </List>
      <Divider />
      <ListSubheader>Notice</ListSubheader>
      <div className={classes.toolbarContent}>
        <Typography component="p" variant="caption" color="textSecondary">
          本博客创建于
          <br />
          2018/12/14
          <br />
          New Light
        </Typography>
      </div>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Blog
          </Typography>
          <a href="https://github.com/zuotang">
            <IconButton color="inherit">
              <GitHub />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            container={props.container}
            variant="temporary"
            anchor={'left'}
            open={open}
            onClose={e => {
              setOpen(false);
            }}
            onOpen={e => {
              setOpen(true);
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default withStyles(styles, {withTheme: true})(Frame);
