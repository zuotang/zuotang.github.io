// 'use strict';

// const _loaderUtils = require('loader-utils');
// const crypto = require('crypto');
// const fs = require('fs');
// const path = require('path');

// function md5(str) {
//   var md5Handle = crypto.createHash('md5');
//   return md5Handle.update(str).digest('hex');
// }

// Object.defineProperty(exports, '__esModule', {
//   value: true,
// });

// exports.default = function(source) {
//   let options = (0, _loaderUtils.getOptions)(this);
//   // 获取文章内容数据
//   let id = md5(source);
//   let title = regExToValue(source, /#+ ([^\n]+)/);
//   let thumbnail = regExToValue(source, /\!\[\]\(([\s\S]+?)\)/m);
//   // 获取文章头部数据
//   let jsonRex = /\`{3}json data([\s\S]+?)\`{3}/m;
//   let jsonRes = source.match(jsonRex);
//   let json = jsonRes ? JSON.parse(jsonRes[1]) : null;
//   let data = Object.assign({}, {title: title, id: id, thumbnail: thumbnail}, json);
//   saveData(data);
//   let res = source.replace(jsonRex, '');
//   return res;
// };

// // 通过正则获取value
// function regExToValue(str, reg) {
//   let res = str.match(reg);
//   return res ? res[1] : null;
// }
// // 记录是否是第一次启动，如果是首次启动就从空的数据开始
// let isInitial = true;
// function saveData(data) {
//   if (!data.name) return;
//   let filePath = path.resolve(__dirname, './src/data.json');
//   let baseData = {};
//   // 是否是首次启动
//   if (isInitial) {
//     isInitial = false;
//   } else if (fs.existsSync(filePath)) {
//     baseData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//   }
//   let resData = Object.assign({}, baseData, {[data.name]: data});
//   fs.writeFileSync(filePath, JSON.stringify(resData));
// }
// //https://www.jianshu.com/p/0650f7eeef3e
