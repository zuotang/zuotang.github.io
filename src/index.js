import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import App from './containers/App';

import {BrowserRouter as Router} from 'react-router-dom';
//import ServerSideStyleClear from './components/ServerSideStyleClear';

import '@/css/public.css';

if (process.env.NODE_ENV == 'development') {
  //热加载配置
  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      import('./containers/App').then(({default: AppCom}) => {
        render(AppCom);
      });
    });
  }
}
//是否是服务器渲染
const renderDOM = process.env.NODE_ENV == 'production' ? ReactDOM.hydrate : ReactDOM.render;
const render = (AppCom = App) => {
  console.log('render');
  renderDOM(
    <Router>
      <AppCom />
    </Router>,
    document.getElementById('root')
  );
};
//为了确保loadable加载完成
window.main = () => {
  Loadable.preloadReady().then(() => {
    render();
  });
};
