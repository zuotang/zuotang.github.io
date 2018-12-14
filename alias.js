// _结尾表示目录  _开头表示文件
const path = require('path');
const alias = {
  '@': path.resolve(__dirname, './src/'),
  con_: path.resolve(__dirname, './src/containers/'),
  com_: path.resolve(__dirname, './src/components/'),
  api_: path.resolve(__dirname, './src/api/'),
  query_: path.resolve(__dirname, './src/query'),
  utils_: path.resolve(__dirname, './src/utils'),
  _tools: path.resolve(__dirname, './src/utils/tools.js'),
  _public: path.resolve(__dirname, './src/utils/public.js'),
};
module.exports = alias;
