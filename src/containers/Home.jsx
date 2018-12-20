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
import PostItem from 'com_/PostItem';
import Footer from 'com_/Footer';
import WebContext from 'contexts_/web';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
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
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  post: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5,
  },
});

const archives = ['2018年12月17日'];

function Blog(props) {
  const webData = useContext(WebContext);
  const {classes} = props;
  let [featured, setFeatured] = useState([]);
  useEffect(
    () => {
      //获取推荐
      let featureds = webData.list.filter(item => item.categories.includes('featured')).slice(0, 2);
      setFeatured(featureds);
    },
    [webData]
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
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              文章
            </Typography>
            <Divider />

            {webData.list.map((post, key) => (
              <React.Fragment key={key}>
                <PostItem post={post} className={classes.post} />
                <Divider />
              </React.Fragment>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
              <Typography variant="h6" gutterBottom>
                关于我
              </Typography>
              <Typography>我叫唐左，你也可以叫我 luke，出生于 1993 年。</Typography>
            </Paper>
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
              归档
            </Typography>
            {webData.archives.map(archive => (
              <Typography key={archive}>{archive}</Typography>
            ))}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
              分类
            </Typography>
            {webData.categories.map(categories => (
              <Typography key={categories}>{categories}</Typography>
            ))}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
              Tags
            </Typography>
            {webData.tags.map(tag => (
              <Typography key={tag}>{tag}</Typography>
            ))}
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
