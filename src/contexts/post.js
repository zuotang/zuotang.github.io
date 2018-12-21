import React from 'react';
import dayjs from 'dayjs';
const PostContext = React.createContext();

export function handleData(data) {
  let list = Object.values(data);
  //按日期排序
  list.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  let archives = getArchives(list);
  let categories = getSecondaryAttribute(list, 'categories');
  let tags = getSecondaryAttribute(list, 'tags');
  return {tags, categories, archives, list};
}

//获取归档
function getArchives(list) {
  let archive = [];
  for (let post of list) {
    archive.push(dayjs(post.date).format('YYYY-MM'));
  }
  //去重
  return Array.from(new Set(archive));
}
// 获取数据里的数组
function getSecondaryAttribute(list, attr) {
  let res = [];
  for (let post of list) {
    if (post[attr] instanceof Array) {
      for (let cat of post[attr]) {
        res.push(cat);
      }
    }
  }
  return Array.from(new Set(res));
}

export default PostContext;
