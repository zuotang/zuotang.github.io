import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import Content from 'com_/Content';
import Markdown from 'com_/markdown/Markdown';
import about from '@/static/article/about.md';
import test from '@/static/article/test.md';

import PostCard from 'com_/PostCard';
import Footer from 'com_/Footer';
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
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
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
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
});

const sections = ['Technology', 'Design', 'Culture', 'Business', 'Politics', 'Opinion', 'Science', 'Health', 'Style', 'Travel'];

const featuredPosts = [
  {
    title: 'Covenant',
    link: '#',
    date: '12月14日',
    description: '最近开发公众号，很多展示型页面。觉得Redux写起来太过麻烦，自己写了个小插件redux-covenant',
    thumbnail:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544809648282&di=ec308f39dd0da28df03245447be85921&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201412%2F04%2F20141204151458_TE52s.thumb.700_0.jpeg',
  },
  {
    title: 'MyBlog',
    link: '/post/about',
    date: '12月14日',
    description: '想用React最新Api的"hooks"写个练习。于是我的个人博客诞生了～ 也准备用来记录一些学习知识',
    thumbnail:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544809697737&di=bac48385254ad9967d4943b339f0c6df&imgtype=0&src=http%3A%2F%2Fimage2.xyzs.com%2Fupload%2Fa6%2F66%2F326%2F20150507%2F143093648599519_0.jpg',
  },
];

const posts = [test, about];

const archives = ['2018年12月17日'];

const social = ['GitHub', 'Twitter', 'Facebook'];

function Blog(props) {
  const {classes} = props;

  return (
    <Content>
      <CssBaseline />
      <main>
        {/* Main featured post */}
        <Paper className={classes.mainFeaturedPost}>
          <Grid container>
            <Grid item md={6}>
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
          {featuredPosts.map(post => (
            <PostCard key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={40} className={classes.mainGrid}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              文章
            </Typography>
            <Divider />
            {posts.map(post => (
              <Markdown className={classes.markdown} key={post.substring(0, 40)}>
                {post}
              </Markdown>
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
            {archives.map(archive => (
              <Typography key={archive}>{archive}</Typography>
            ))}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
              Social
            </Typography>
            {social.map(network => (
              <Typography key={network}>{network}</Typography>
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
