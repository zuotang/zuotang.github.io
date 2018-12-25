import React from 'react';
import mermaid from 'mermaid';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
});

// 语法错误处理
function ErrorSnackBar({message, classes}) {
  return <SnackbarContent message={message} className={classes.error} />;
}
ErrorSnackBar = withStyles(styles)(ErrorSnackBar);

function Graph(props) {
  try {
    mermaid.parse(props.value);
  } catch (err) {
    return <ErrorSnackBar message={err.str} />;
  }
  // 每次生成一个新的name，热加载时可以刷新显示
  let name = parseInt(Math.random() * 10000);
  let html = mermaid.render(`graph_${name}`, props.value);
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
export default Graph;
