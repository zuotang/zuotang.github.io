import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Content from 'com_/Content';
import Markdown from 'com_/markdown/Markdown';
import Footer from 'com_/Footer';
import axios from 'axios';
import {getMarkdownData} from 'utils_/markdown';
import {getArticle, getEditArticle} from '_public';

const styles = theme => ({
  tools: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
});

function Post(props) {
  let [md, setMd] = useState();
  const {
    classes,
    match: {
      params: {name},
    },
  } = props;
  useEffect(
    () => {
      axios.get(getArticle(`/article/${name}.md`)).then(res => {
        setMd(getMarkdownData(res.data));
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
          </main>
        </Grid>
        <Grid item xs={12} md={2}>
          走失的菜单栏
        </Grid>
      </Grid>
      <Footer />
    </Content>
  );
}

export default withStyles(styles)(Post);
