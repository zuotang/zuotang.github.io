import React, {PureComponent} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'com_/Loading';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import PostContext, {handleData} from 'contexts_/post';
//取贴子数据
import data from '../data.json';
//生成列表
//生成归档
//生成分类
//生成标签
const postData = handleData(data);

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

const ColumnList = Loadable({
  loader: () => import('con_/ColumnList.jsx'),
  loading: Loading,
});

function App(props) {
  let {location} = props;
  return (
    <MuiThemeProvider theme={theme}>
      <PostContext.Provider value={postData}>
        <Frame>
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/column/:name?" component={ColumnList} />
            <Route exact path="/list/:name?/:value?" component={PostList} />
            <Route exact path="/post/:name" component={Post} />
          </Switch>
        </Frame>
      </PostContext.Provider>
    </MuiThemeProvider>
  );
}
export default withRouter(App);
