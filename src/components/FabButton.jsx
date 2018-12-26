import React, {useEffect, useState} from 'react';
import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/core/styles';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
  fab: {
    position: 'fixed',
    zIndex: 2,
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing.unit * 6,
      right: theme.spacing.unit * 6,
    },
  },
});

function FabButton(props) {
  const {classes, theme} = props;
  let isTop = useTop();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  return (
    <Zoom
      in={!isTop}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${!isTop ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab
        color="primary"
        size="large"
        onClick={e => {
          window.scroll({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className={classes.fab}
      >
        <ArrowUpward />
      </Fab>
    </Zoom>
  );
}

function useTop(range = 100) {
  let [top, setTop] = useState(true);
  function handleScroll(e) {
    if (document.documentElement.scrollTop > range && top) {
      setTop(false);
    } else if (document.documentElement.scrollTop <= range && !top) {
      setTop(true);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    //handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return top;
}
export default withStyles(styles, {withTheme: true})(FabButton);
