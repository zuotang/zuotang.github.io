import React, {useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
  comment: {
    marginTop: theme.spacing.unit * 16,
  },
});

function Comment(props) {
  const {
    classes,
    match: {url},
  } = props;
  // 设置数据
  useEffect(
    () => {
      // 评论
      window.disqus_config = function() {
        this.page.identifier = url;
        this.page.url = `https://zuotang.github.io/blog${url}`;
      };
      if (typeof DISQUS === 'undefined') {
        (function() {
          // DON'T EDIT BELOW THIS LINE
          var d = document,
            s = d.createElement('script');
          s.src = 'https://zuotang-github-io-blog.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
      } else {
        DISQUS.reset({
          reload: true,
          config: window.disqus_config,
        });
      }
    },
    [url]
  );
  return (
    <div className={classes.comment}>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}

export default withRouter(withStyles(styles)(React.memo(Comment)));
