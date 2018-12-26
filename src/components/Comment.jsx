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
    title,
  } = props;
  const commentRef = React.createRef();
  function renderComment() {
    const gitalk = new Gitalk({
      clientID: '689324e97de2ab6102e2',
      clientSecret: 'b22d98c956a89a8c2ea26866f8a16e50981566da',
      repo: 'zuotang.github.io',
      owner: 'zuotang',
      admin: ['zuotang'],
      id: url, // Ensure uniqueness and length less than 50
      distractionFreeMode: false, // Facebook-like distraction free mode
      title: title,
    });

    gitalk.render(commentRef.current);
  }
  // 设置数据
  useEffect(
    () => {
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
