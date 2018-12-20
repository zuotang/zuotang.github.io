import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import Content from 'com_/Content';

import PostItem from 'com_/PostItem';
import Footer from 'com_/Footer';
import WebContext from 'contexts_/web';
import RightMenu from 'com_/RightMenu';

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  post: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5,
  },
});

function Blog(props) {
  const webData = useContext(WebContext);
  const {classes} = props;

  return (
    <Content>
      <CssBaseline />
      <main>
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
            <RightMenu />
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
