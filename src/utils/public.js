// 共用方法
import config from '../../config.json';

// 基础路径
export const basename = config.basename;
export const projectname = config.projectname;
export const username = config.username;
// git地址
export const github = `https://github.com/${username}`;
// 项目地址
export const project = `https://github.com/${username}/${projectname}`;

// 图片地址
export const getImg = url => {
  let reg = /^\/[^\/]/;
  if (!reg.test(url) || process.env.NODE_ENV == 'development') return url;
  return `${basename}${url}`;
};
// 获取文章地址
export const getArticle = url => {
  let reg = /^\/[^\/]/;
  if (!reg.test(url) || process.env.NODE_ENV == 'development') return url;
  return `${basename}${url}`;
};

// 获取文章编辑地址
export const getEditArticle = article => {
  return `${project}/edit/master/article/${article}.md`;
};
