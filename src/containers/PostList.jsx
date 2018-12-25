import React, {useEffect, useState, useContext} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import Content from 'com_/Content';

import PostItem from 'com_/PostCard';
import Footer from 'com_/Footer';
import PostContext from 'contexts_/post';
import RightMenu from 'com_/RightMenu';
import dayjs from 'dayjs';
import {FrameContext} from './Frame';


const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  post: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5,
  },
});
const titleDictionary={
  "categories":"分类",
  "archive":"归档",
  "tag":"标签",
}
function PostList(props) {
  const postData = useContext(PostContext);
  const frame = useContext(FrameContext);
  const {
    classes,
    match: {
      params: {name, value},
    },
  } = props;
  useEffect(()=>{
    frame.setTitle(titleDictionary[name])
  },[name])
  // name查询条件 value查询值
  let list = postData.list;
  //筛选
  if (name && value) {
    switch (name) {
      case 'categories':
        list = postData.list.filter(item => item.categories && item.categories.includes(value));
        break;
      case 'archive':
        list = postData.list.filter(item => dayjs(item.date).format('YYYY-MM') == value);
        break;
      case 'tag':
        list = postData.list.filter(item => item.tags && item.tags.includes(value));
        break;
    }
  }
  return (
    <Content>
      <CssBaseline />
      <main>
        <Grid container spacing={40} className={classes.mainGrid}>
          <Grid item xs={12} md={10}>
            <Typography variant="h4" gutterBottom>
              {value || '文章'}
            </Typography>
            <Divider />

            {list.map((post, key) => (
              <React.Fragment key={key}>
                <PostItem post={post} className={classes.post} />
                <Divider />
              </React.Fragment>
            ))}
          </Grid>
          <Grid item xs={12} md={2}>
            <RightMenu replace />
          </Grid>
        </Grid>
      </main>
      <Footer />
    </Content>
  );
}

export default withStyles(styles)(PostList);
