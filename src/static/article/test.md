# 程序员的 Markdown

#### 2018-12-17

### 使用插件

- [react-markdown](https://github.com/rexxars/react-markdown) react 的 markdown 显示组件
- [highlight](https://highlightjs.org/) Web 的语法突出显示
- [mermaid](https://mermaidjs.github.io/) 生成流程图
- [chart](https://www.chartjs.org/docs/) 生成图表，线图，箱体图等
- [react-emoji-render](https://github.com/tommoor/react-emoji-render) Emoji 表情包

#### 待添加

> [http://asciimath.org/](http://asciimath.org/) 算法公式

---

## Markdown

使用 react-markdown 插件，通过传入 renderers 道具可以方便定制自己的渲染，这里只做一些简单的演示，具体可以查看我的[blog 源码](https://github.com/zuotang/MyBlog)。
把 markdown 封装成组件，方便复用.
com/Markdown.jsx

```js
import ReactMarkdown from 'react-markdown';

function Markdown({children, ...props}) {
  return <ReactMarkdown>{children}</ReactMarkdown>;
}
```

编写自定义渲染元素，具体参考[nodeTypes](https://github.com/rexxars/react-markdown#node-types)。一个对象，值为 react 组件
com/renders.jsx

```js
//流程图
import Graph from './Graph';
//代码块
import Code from './Code';
//图表
import Chat from './Chat';
//表情包
import Emoji from 'react-emoji-render';

const renderers = {
  text: props => <Emoji text={props.children} />,
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
```

### emoji

使用'react-emoji-render'插件，只需要把内容传入 text 道具即可

### chart

```js
import React, {useState, useEffect, useRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Chart from 'chart.js';

const styles = theme => ({
  code: {
    margin: '10px 0',
  },
});

function Code(props) {
  let chartRef = useRef();
  useEffect(() => {
    var ctx = chartRef.current.getContext('2d');
    new Chart(ctx, JSON.parse(props.value));
  });
  return <canvas ref={chartRef} id="myChart" width="400" height="400" />;
}

export default withStyles(styles)(Code);
```

```chart
{
  "type": "bar",
  "data": {
  "labels": [
    "Red",
    "Blue",
    "Yellow",
    "Green",
    "Purple",
    "Orange"
  ],
  "datasets": [
    {
    "label": "# of Votes",
    "data": [
      12,
      19,
      3,
      5,
      2,
      3
    ],
    "backgroundColor": [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)"
    ],
    "borderColor": [
      "rgba(255,99,132,1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)"
    ],
    "borderWidth": 1
    }
  ]
  },
  "options": {}
}
```

[emoji 参考](https://www.webpagefx.com/tools/emoji-cheat-sheet/)

# Hello

## Emoji: :panda_face: :sparkles: :camel: :boom: :pig:

**_ test _**

`print test`

[Emoji Cheat Sheet](http://www.emoji-cheat-sheet.com/)

```mermaid
graph TB
A --- B
```

```mermaid

gantt
        dateFormat  YYYY-MM-DD
        title Adding GANTT diagram functionality to mermaid
        section A section
        Completed task            :done,    des1, 2014-01-06,2014-01-08
        Active task               :active,  des2, 2014-01-09, 3d
        Future task               :         des3, after des2, 5d
        Future task2               :         des4, after des3, 5d
        section Critical tasks
        Completed task in the critical line :crit, done, 2014-01-06,24h
        Implement parser and jison          :crit, done, after des1, 2d
        Create tests for parser             :crit, active, 3d
        Future task in critical line        :crit, 5d
        Create tests for renderer           :2d
        Add to mermaid                      :1d

```

```js
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

function Footer({classes}) {
  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        这是一个还没有内容的底部
      </Typography>
    </footer>
  );
}
export default withStyles(styles)(Footer);
```
