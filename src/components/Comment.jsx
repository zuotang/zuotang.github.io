import React, {useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';

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
  const commentRef = React.createRef();
  console.log(url);
  function renderComment() {
    const gitalk = new Gitalk({
      clientID: '689324e97de2ab6102e2',
      clientSecret: 'b22d98c956a89a8c2ea26866f8a16e50981566da',
      repo: 'blog',
      owner: 'zuotang',
      admin: ['zuotang'],
      id: url, // Ensure uniqueness and length less than 50
      distractionFreeMode: false, // Facebook-like distraction free mode
    });

    gitalk.render(commentRef.current);
  }
  // 设置数据
  useEffect(
    () => {
      // 评论
      // if (typeof Gitment === 'undefined') {
      //   (function() {
      //     // DON'T EDIT BELOW THIS LINE
      //     var d = document,
      //       s = d.createElement('script'),
      //       l = d.createElement('link');
      //     s.src = 'https://imsun.github.io/gitment/dist/gitment.browser.js';
      //     l.href = 'https://imsun.github.io/gitment/style/default.css';
      //     l.rel = 'stylesheet';
      //     (d.head || d.body).appendChild(s);
      //     (d.head || d.body).appendChild(l);
      //     renderComment();
      //   })();
      // } else {
      //   renderComment();
      // }
      renderComment();
    },
    [url]
  );
  return (
    <div className={classes.comment}>
      <div id="gitalk-container" ref={commentRef} />
    </div>
  );
}

export default withRouter(withStyles(styles)(React.memo(Comment)));
