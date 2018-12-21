import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import Content from 'com_/Content';

import PostCard from 'com_/PostCard';
import PostItem from 'com_/PostCard';
import Footer from 'com_/Footer';
import PostContext from 'contexts_/post';
import RightMenu from 'com_/RightMenu';
import {FrameContext} from './Frame';

const styles = theme => ({
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[0],
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  post: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5,
  },
});

function Blog(props) {
  const postData = useContext(PostContext);
  const frame = useContext(FrameContext);
  const {classes} = props;
  let [featured, setFeatured] = useState([]);

  useEffect(
    () => {
      //获取推荐
      let featureds = postData.list.filter(item => item.categories.includes('featured')).slice(0, 2);
      setFeatured(featureds);
      frame.setTitle('Home')
    },
    [postData]
  );

  return (
    <Content>
      <CssBaseline />
      <main>
        {/* Main featured post */}
        <Paper className={classes.mainFeaturedPost}>
          <Grid container>
            <Grid item>
              <div className={classes.mainFeaturedPostContent}>
                <Typography component="h1" variant="h4" color="secondary" gutterBottom>
                  唐左的个人博客
                </Typography>
                <Typography variant="subtitle1" color="inherit" paragraph>
                  记录最近学习知识，及一些个人想法。
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={40} className={classes.cardGrid}>
          {featured.map((post, key) => (
            <Grid item xs={12} md={6} key={key}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={40} className={classes.mainGrid}>
          <Grid item xs={12} md={10}>
            <Typography variant="h6" gutterBottom>
              文章
            </Typography>
            <Divider />

            {postData.list.map((post, key) => (
              <React.Fragment key={key}>
                <PostItem post={post} className={classes.post} />
              </React.Fragment>
            ))}
          </Grid>
          <Grid item xs={12} md={2}>
            <RightMenu replace={false} />
          </Grid>
        </Grid>
      </main>
      <Footer />
    </Content>
  );
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);
