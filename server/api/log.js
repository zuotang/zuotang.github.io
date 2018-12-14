import {log, logBusiness} from '../utils/tools';
import Router from 'koa-router';

const router = Router();
const logNor = {
  path: '/log',
  handler: ctx => {
    const {source, time, request, response} = ctx.query;
    let str = `${time}ms|${request}|${response}`;
    log(str, source);
    ctx.body = {status: 0, message: 'log send success'};
  },
};
const logBsn = {
  path: '/log_bsns',
  handler: ctx => {
    logBusiness(ctx.query.message, ctx.query.info, ctx.query.time);
    ctx.body = {status: 0, message: 'business log send success'};
  },
};
const check = {
  path: '/check',
  handler: ctx => {
    log(JSON.stringify(ctx.cookies), '用户登录信息检查');
    //ctx.response.send(log);
    ctx.body = {status: 0, message: 'success'};
  },
};

const logApi = router
  .get(logNor.path, logNor.handler)
  .get(logBsn.path, logBsn.handler)
  .get(check.path, check.handler);

export default logApi;
