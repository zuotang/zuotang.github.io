import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Content from 'com_/Content';
import Markdown from 'com_/markdown/Markdown';
import Footer from 'com_/Footer';
import post from '@/static/article/about.md';

const styles = theme => ({});

function Post(props) {
  const {classes} = props;

  return (
    <Content>
      <CssBaseline />
      <main>
        <Markdown className={classes.markdown} key={post.substring(0, 40)}>
          {post}
        </Markdown>
      </main>
      <Footer />
    </Content>
  );
}

export default withStyles(styles)(Post);
