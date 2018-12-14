import React from 'react';
import Loadable from 'react-loadable';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import reducers from '../src/store/reducers/index';
//import {getCreateStore} from '../src/store/store';
import {Provider} from 'react-redux';
import path from 'path';
import fs from 'fs';
import Helmet from 'react-helmet';
import {getBundles} from 'react-loadable/webpack';
import {dirServer} from '_public';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
//import loadablePlugin from './loadablePlugin';
import {getCacheData, getDataFromTree} from 'query_/index';
import App from '../src/containers/App';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

//设置axios baseURL 服务端渲染前端请求时用
// import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:2093';

const stats = require(`${dirServer}/react-loadable.json`);

const prepHTML = (data, {html, head, style, body, script, styleTags, state, cache}) => {
  data = data.replace('<html', `<html ${html}`);
  data = data.replace('</head>', `${head}</head>`);
  data = data.replace(
    '<body>',
    `<body><script>
    window._INIT_STATE_ = ${JSON.stringify(state)};
    window._INIT_CACHE_ = ${JSON.stringify(cache)};
    </script>`
  );
  data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>${style}${styleTags}`);
  data = data.replace('</body>', `${script}</body>`);
  return data;
};

const render = async (ctx, next) => {
  const filePath = path.resolve(__dirname, '../build/index.html');
  let htmlData = fs.readFileSync(filePath, 'utf8');

  const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

  const sheet = new ServerStyleSheet();
  //初始请求数据
  //await initalActions(store,ctx.req.url,initialRequestConfig)
  let modules = [];
  const AppRender = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <StaticRouter location={ctx.req.url} basename="/v2">
            <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    </Loadable.Capture>
  );
  await getDataFromTree(AppRender);
  let routeMarkup = renderToString(AppRender);

  // 初始缓存
  const initialCache = await getCacheData();
  const initialState = store.getState();
  let bundles = getBundles(stats, modules);

  const styleTags = sheet.getStyleTags();

  let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

  // link 样式转内联样式
  //手动加入公共样式
  let styleTagStr = '';
  styleTagStr += getCss('v2/main.css');
  styleTagStr += getCss('v2/common.css');

  styles
    .map(style => {
      styleTagStr += fs.readFileSync(path.join(__dirname, dirServer, `/${style.file}`), 'utf8');
    })
    .join('\n');

  styleTagStr = `<style id="jss-server-side" type="text/css">${styleTagStr}</style>`;

  let scriptTagStr = scripts
    .map(bundle => {
      return `<script src="/${bundle.file}"></script>`;
    })
    .join('\n');

  const helmet = Helmet.renderStatic();
  const html = prepHTML(htmlData, {
    html: helmet.htmlAttributes.toString(),
    head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
    style: styleTagStr,
    body: routeMarkup,
    script: scriptTagStr,
    styleTags,
    state: initialState,
    cache: initialCache,
  });
  ctx.body = html;
};

function getCss(fileName) {
  let publicCss = path.join(__dirname, dirServer, fileName);
  if (fs.existsSync(publicCss)) {
    return fs.readFileSync(publicCss, 'utf8');
  }
  return '';
}

export default render;
