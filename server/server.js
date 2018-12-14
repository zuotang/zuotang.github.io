import Loadable from 'react-loadable';
import Router from 'koa-router';
import path from 'path';
import staticCache from 'koa-static-cache';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import gzip from 'koa-compress';
import range from 'koa-range'; //解决视频播放,断点续传
// import proxy from 'koa-server-http-proxy';
// import proxyData from '../proxy';

import render from './render.js';
import logApi from './api/log';
//import apiList from './api/index';
import {getIPAddress} from './utils/tools';
import {dirServer} from '_public';

const app = new Koa();
const router = new Router();

router.get('/', render);
router.use('/jsapi', logApi.routes(), logApi.allowedMethods());

app.keys = ['abcdefg123']; //签名
app.use(gzip());
app.use(bodyParser()); //解析Json或者form

app.use(range);
app.use(cors({credentials: true})); //跨域

//复用代理
// for (let [key, value] of Object.entries(proxyData)) {
//   app.use(proxy(key, value));
// }

app.use(router.routes()).use(router.allowedMethods());
app.use(staticCache(path.resolve(__dirname, dirServer), {maxAge: 365 * 24 * 60 * 60}));
//console.log('render?')
app.use(render);

Loadable.preloadAll().then(() => {
  app.listen(3093, () => {
    console.log(`http://${getIPAddress()}:3093`);
    console.log('服务启动');
  });
});
