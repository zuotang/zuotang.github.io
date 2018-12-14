import queryConnect from './redux/queryConnect';
import {covenantReduice} from './redux/covenantStore';
import getDataFromTreeFun from './ssr/getDataFromTree';
import QueryCom from './redux/queryComponent';
import MutationCom from './redux/mutationComponent';

export const query = queryConnect;
export const Query = QueryCom;
export const Mutation = MutationCom;
export const covenant = covenantReduice;
export const getDataFromTree = getDataFromTreeFun;

// 获取缓存
export const getCacheData = async () => {
  let cache = (await import('./cache')).default;
  let res = cache.data;
  cache.data = {};
  return res;
};
