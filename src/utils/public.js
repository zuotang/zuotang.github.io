//共用方法
import config from '../../config.json';

// 基础路径
export const basename=config.basename
//图片地址
export const getImg = url => {
  let reg=/^\/[^\/]/
  if(!reg.test(url) || process.env.NODE_ENV=='development')return url
  return `${basename}${url}`;
};

