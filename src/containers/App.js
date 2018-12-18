import React, {PureComponent} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'com_/Loading';

const Frame = Loadable({
  loader: () => import('con_/Frame.jsx'),
  loading: Loading,
});
const Home = Loadable({
  loader: () => import('con_/Home.jsx'),
  loading: Loading,
});
const Post = Loadable({
  loader: () => import('con_/Post.jsx'),
  loading: Loading,
});

function App(props) {
  return (
    <React.Fragment>
      <Frame>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/:name" component={Post} />
        </Switch>
      </Frame>
    </React.Fragment>
  );
}
export default withRouter(App);
