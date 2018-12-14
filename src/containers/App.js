import React, {PureComponent} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'com_/Loading'
const Frame = Loadable({
  loader: () => import('con_/Frame.jsx'),
  loading: Loading,
});
const Home = Loadable({
  loader: () => import('con_/Home.jsx'),
  loading: Loading,
});
@withRouter
class App extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Frame>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Frame>
      </React.Fragment>
    );
  }
}
export default App;
