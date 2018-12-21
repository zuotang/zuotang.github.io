import React, {useState, useEffect, useContext} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Content from 'com_/Content';
import Markdown from 'com_/markdown/Markdown';
import Footer from 'com_/Footer';
import axios from 'axios';
import {getMarkdownData} from 'utils_/markdown';
import {getArticle, getEditArticle} from '_public';
import {FrameContext} from './Frame';
import Emoji from 'react-emoji-render';

const styles = theme => ({
  tools: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  rightList: {
    position: 'sticky',
    top: 90,
  },
  link: {
    padding: '4px 0',
    lineHeight: 1.5,
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      textDecoration: 'underline',
    },
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
  const [rightList, setRightList] = useState([]);
  let frame = useContext(FrameContext);

  useEffect(
    () => {
      frame.setTitle('');
      axios.get(getArticle(`/article/${name}.md`)).then(res => {
        let postData = getMarkdownData(res.data);
        setMd(postData);
        frame.setTitle(postData.title);
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
            {md && (
              <Markdown className={classes.markdown} handleList={setRightList}>
                {md.content}
              </Markdown>
            )}
          </main>
        </Grid>
        <Grid item xs={12} md={2}>
          <div className={classes.rightList}>
            <Typography component="span" variant="body1">
              Contents
            </Typography>
            {rightList.map((item, key) => (
              <Typography component="span" color="textSecondary" variant="body1" key={key} style={{paddingLeft: (item.level - 1) * 10}}>
                <a className={classes.link} href={`#${item.anchor}`}>
                  <Emoji text={item.value} />
                </a>
              </Typography>
            ))}
          </div>
        </Grid>
      </Grid>
      <Footer />
    </Content>
  );
}

export default withStyles(styles)(React.memo(Post));
