import React, {useState, useEffect, useContext} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Content from 'com_/Content';
import Markdown from 'com_/markdown/Markdown';
import List from 'com_/markdown/List';
import Footer from 'com_/Footer';
import axios from 'axios';
import {getMarkdownData} from 'utils_/markdown';
import {getArticle, getEditArticle} from '_public';
import {FrameContext} from './Frame';
import Comment from 'com_/Comment';

const styles = theme => ({
  tools: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
});

function Post(props) {
  const {
    classes,
    match: {
      params: {name},
    },
  } = props;
  const [md, setMd] = useState();
  let frame = useContext(FrameContext);
  // 设置数据
  useEffect(
    () => {
      frame.setTitle('');
      axios.get(getArticle(`/article/${name}.md`)).then(res => {
        let postData = getMarkdownData(res.data);
        //设置网页标题
        frame.setTitle(postData.title);
        //设置markdown内容
        setMd(postData);
      });
    },
    [name]
  );

  return (
    <Content>
      <CssBaseline />
      <Grid container spacing={40} className={classes.mainGrid}>
        <Grid item xs={12} md={10}>
          <main>
            <div className={classes.tools}>
              <Button href={getEditArticle(name)}>编辑文章</Button>
            </div>
            {md && <Markdown className={classes.markdown}>{md.content}</Markdown>}
            <Comment />
          </main>
        </Grid>
        <Grid item xs={12} md={2}>
          {md && <List markdown={md.content} />}
        </Grid>
      </Grid>
      <Footer />
    </Content>
  );
}

export default withStyles(styles)(React.memo(Post));
