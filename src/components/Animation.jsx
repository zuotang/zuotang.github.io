import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';

function Animation(props) {
  let {location, history, children} = props;
  const {state = {}} = location;
  //动画判断 direction方向
  let direction = 'front';
  if (history.action == 'POP' || (state && state.back)) {
    direction = 'back';
  }
  return (
    <TransitionGroup className={classNames('full', direction)}>
      <CSSTransition appear={true} enter={true} key={location.pathname} classNames="fade" timeout={800}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
}
export default withRouter(Animation);
