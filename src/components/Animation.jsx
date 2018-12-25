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
    <TransitionGroup appear className={'full'}>
      <CSSTransition
        onExit={node => {
          let top = document.documentElement.scrollTop;
          node.parentNode.style.overflow = 'hidden';
          document.documentElement.scrollTop = 0;
          node.style.marginTop = `-${top}px`;
          if (history.action == 'PUSH') {
            Object.assign(window.scrollPoint, {[pathname]: top});
          }
        }}
        onEnter={node => {
          if (history.action == 'POP') {
            node.style.marginTop = `-${window.scrollPoint[pathname]}px`;
          }
        }}
        onEntered={node => {
          node.parentNode.style.overflow = 'initial';
          if (history.action == 'POP') {
            node.style.marginTop = 0;
            document.documentElement.scrollTop = window.scrollPoint[pathname];
          }
        }}
        key={pathname}
        classNames="fade"
        timeout={350}
      >
        <div className="fadeBox">{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default withRouter(Animation);
