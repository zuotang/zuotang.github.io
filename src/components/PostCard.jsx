import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

function PostCard({post, classes, className}) {
  return (
    <Card className={classNames(classes.card, className)}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {post.date}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.description}
          </Typography>
          <Link to={`/post/${post.name}`}>
            <Typography variant="subtitle1" color="primary">
              查看全文...
            </Typography>
          </Link>
        </CardContent>
      </div>
      {post.thumbnail && (
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={post.thumbnail} // eslint-disable-line max-len
            title={post.title}
          />
        </Hidden>
      )}
    </Card>
  );
}
export default withStyles(styles)(PostCard);
