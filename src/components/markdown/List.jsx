import React, {useEffect, useState, useContext} from 'react';
import Emoji from 'react-emoji-render';
import {getTOC} from 'com_/markdown/utils';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

const styles = theme => ({
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

function List({markdown, classes, location: {hash}}) {
  const [active, setActive] = useState();
  const [rightList, setRightList] = useState([]);
  // 处理当前活跃栏目
  function handleScroll(e) {
    let currentTop = document.documentElement.scrollTop;
    for (let i = rightList.length - 1; i > 0; i--) {
      let item = rightList[i];
      let dom = document.getElementById(item.anchor);
      if (dom && currentTop >= dom.offsetTop) {
        setActive(item);
        return;
      }
    }
    setActive(rightList[0]);
  }
  // 滚动处理
  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  //获取列表
  useEffect(
    () => {
      let tocList = getTOC(markdown);
      setRightList(tocList);
    },
    [markdown]
  );

  useEffect(
    () => {
      if (hash) {
        let id = hash.substr(1);
        let anchorElement = document.getElementById(id);
        if (anchorElement) {
          anchorElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    },
    [hash]
  );

  return (
    <div className={classes.rightList}>
      <Typography component="span" variant="body1">
        Contents
      </Typography>
      {rightList.map((item, key) => {
        const isActive = active == item;
        //if (active && active.level)
        return (
          <Typography
            component="span"
            color={isActive ? 'textPrimary' : 'textSecondary'}
            variant="body1"
            key={key}
            style={{paddingLeft: (item.level - 1) * 10}}
          >
            <Link className={classes.link} to={`#${item.anchor}`} replace>
              <Emoji text={item.name} />
            </Link>
          </Typography>
        );
      })}
    </div>
  );
}

export default withRouter(withStyles(styles)(List));
