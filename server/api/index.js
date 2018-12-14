/**
 * 服务端接口列表
 */
import logApi from './log';
import Router from 'koa-router';

const router = Router();

router.use('/jsapi', logApi.routes(), logApi.allowedMethods());

export default router;
