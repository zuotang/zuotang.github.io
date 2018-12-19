//共用方法
// 基础路径
export const basename='/blog'
//图片地址
export const getImg = url => {
  let reg=/^\/[^\/]/
  if(!reg.test(url) || process.env.NODE_ENV=='development')return url
  return `${basename}${url}`;
};

