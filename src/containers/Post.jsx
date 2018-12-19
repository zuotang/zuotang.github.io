import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Content from 'com_/Content';
import Markdown from 'com_/markdown/Markdown';
import Footer from 'com_/Footer';
import axios from 'axios';
import {getMarkdownData} from 'utils_/markdown';

const styles = theme => ({});

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
      axios.get(`/article/${name}.md`).then(res => {
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
          <main>{md && <Markdown className={classes.markdown}>{md.content}</Markdown>}</main>
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
