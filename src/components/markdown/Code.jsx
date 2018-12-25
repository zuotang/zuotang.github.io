import React, {useState, useEffect, useRef} from 'react';
//import hljs from 'highlight.js';
//import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight';

import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

// 代码使用黑色主题包裹
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  code: {
    overflow: 'hidden',
    margin: '10px 0',
    '&>pre': {
      margin: 0,
    },
    '& code': {
      padding: 20,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      lineHeight: theme.typography.body1.lineHeight,
    },
  },
});

function Code(props) {
  let codeRef = useRef();
  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  });
  const {classes} = props;
  return (
    <MuiThemeProvider theme={theme}>
      <Paper elevation={4} className={classes.code}>
        <pre>
          <code ref={codeRef} className={`language-${props.language}`}>
            {props.value}
          </code>
        </pre>
      </Paper>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(Code);
