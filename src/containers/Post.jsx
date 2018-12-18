import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Content from 'com_/Content';
import Markdown from 'com_/markdown/Markdown';
import Footer from 'com_/Footer';

const styles = theme => ({});

function Post(props) {
  let [content, setContent] = useState('');
  const {
    classes,
    match: {
      params: {name},
    },
  } = props;
  useEffect(
    () => {
      console.log(name);
      import(`@/article/${name}.md`).then(data => {
        setContent(data.default);
      });
    },
    [name]
  );

  return (
    <Content>
      <CssBaseline />
      <main>
        <Markdown className={classes.markdown}>{content}</Markdown>
      </main>
      <Footer />
    </Content>
  );
}

export default withStyles(styles)(Post);
