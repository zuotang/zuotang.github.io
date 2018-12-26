import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';

function Animation(props) {
  let {
    location: {pathname},
    history,
    children,
  } = props;

  if (!window.scrollPoint) window.scrollPoint = {};
  // 动画滚动条的处理
  return (
    <TransitionGroup appear component={null}>
      <CSSTransition
        onExit={node => {
          let top = document.documentElement.scrollTop;
          node.style.overflow = 'hidden';
          document.documentElement.scrollTop = 0;
          node.children[0].style.transform = `translateY(-${top}px)`;
          if (history.action == 'PUSH') {
            Object.assign(window.scrollPoint, {[pathname]: top});
          }
        }}
        onEnter={node => {
          node.style.overflow = 'hidden';
          if (history.action == 'POP') {
            node.children[0].style.transform = `translateY(-${window.scrollPoint[pathname]}px)`;
          }
        }}
        onEntered={node => {
          setTimeout(() => {
            node.style.overflow = 'inherit';
            if (history.action == 'POP') {
              node.children[0].style.transform = `translateY(0)`;
              document.documentElement.scrollTop = window.scrollPoint[pathname];
            }
          }, 300);
        }}
        key={pathname}
        classNames="fade"
        timeout={350}
      >
        <div className="fadeBox">
          <div>
            <div>{children}</div>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default withRouter(Animation);
