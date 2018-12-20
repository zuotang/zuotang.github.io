import React, {PureComponent} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'com_/Loading';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import WebContext, {handleData} from 'contexts_/web';

//取贴子数据
import postData from '../data.json';
//生成列表
//生成归档
//生成分类
//生成标签
const webData = handleData(postData);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const Frame = Loadable({
  loader: () => import('con_/Frame.jsx'),
  loading: Loading,
});
const Home = Loadable({
  loader: () => import('con_/Home.jsx'),
  loading: Loading,
});
const PostList = Loadable({
  loader: () => import('con_/PostList.jsx'),
  loading: Loading,
});
const Post = Loadable({
  loader: () => import('con_/Post.jsx'),
  loading: Loading,
});

function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <WebContext.Provider value={webData}>
        <Frame>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/list/:categories?/:tags?/:archives?" component={PostList} />
            <Route exact path="/post/:name" component={Post} />
          </Switch>
        </Frame>
      </WebContext.Provider>
    </MuiThemeProvider>
  );
}
export default withRouter(App);
