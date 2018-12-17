import React from 'react';
import ReactMarkdown from 'react-markdown';
import Loadable from 'react-loadable';
import Emoji from 'react-emoji-render';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// 使用动态加载包，加快速度
const Graph = Loadable({
  loader: () => import('./Graph'),
  loading: () => 'loading...',
});

const Code = Loadable({
  loader: () => import('./Code'),
  loading: () => 'loading...',
});
const Chart = Loadable({
  loader: () => import('./Chart'),
  loading: () => 'loading...',
});

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing.unit,
  },
  link: {
    color: theme.palette.primary.main,
  },
});
const variants = ['h4', 'h6', 'subtitle1', 'caption', 'caption'];

// 渲染自己的markdown元素，其中键表示节点类型，值是React组件。该对象与默认渲染器合并。传递给组件的props不同，具体取决于节点的类型。
const renderers = {
  text: props => <Emoji text={props.children} />,
  heading: props => (
    <Typography gutterBottom variant={variants[props.level - 1]}>
      {props.children}
    </Typography>
  ),
  paragraph: props => <Typography paragraph>{props.children}</Typography>,
  listItem: withStyles(styles)(({classes, ...props}) => (
    <li className={classes.listItem}>
      <Typography component="span">{props.children}</Typography>
    </li>
  )),
  code: props => {
    switch (props.language) {
      case 'mermaid':
        return <Graph {...props} />;
      case 'chart':
        return <Chart {...props} />;
      default:
        return <Code {...props} />;
    }
  },
  link: withStyles(styles)(({classes, ...props}) => (
    <a href={props.href} className={classes.link}>
      {props.children}
    </a>
  )),
};

function Markdown({children, ...props}) {
  return <ReactMarkdown renderers={renderers}>{children}</ReactMarkdown>;
}

export default Markdown;
