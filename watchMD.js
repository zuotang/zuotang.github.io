const fs = require('fs');
const path = require('path');
const baseDir = path.resolve(__dirname, 'article');
//　初始
(function() {
  //初始遍历帖子
  initialPostData();
  //开始监听
  fs.watch(baseDir, function(event, filename) {
    let filepath = path.resolve(baseDir, filename);
    if (event === 'change') {
      //开始解析
      handleMarkdown(filename);
    } else {
      //删除或添加
      if (!fs.existsSync(filepath)) {
        removePost(filename);
      }
    }
  });
})();

// 初始遍历所有文章
function initialPostData() {
  let files = walk(baseDir);
  for (let {filename, filepath} of files) {
    handleMarkdown(filename, filepath);
  }
}

function walk(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(filename) {
    filepath = dir + '/' + filename;
    var stat = fs.statSync(filepath);
    if (stat && stat.isDirectory()) results = results.concat(walk(filepath));
    else results.push({filepath, filename});
  });
  return results;
}

//　处理文件
function handleMarkdown(filename, filepath = null) {
  if (!filepath) {
    filepath = path.resolve(baseDir, filename);
  }
  let data = fs.readFileSync(filepath, 'utf-8');
  let post = getMarkdownData(data);
  post.filename = filename;
  post.name = filename.replace(/\.md/i, '');
  savePost(post);
}

//　帖子数据更改
function savePost(post) {
  if (!post.filename) return;
  let filepath = path.resolve(__dirname, './src/data.json');
  let baseData = {};
  // 是否是首次启动
  if (fs.existsSync(filepath)) {
    baseData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
  let resData = Object.assign({}, baseData, {[post.filename]: post});
  fs.writeFileSync(filepath, JSON.stringify(resData));
}

//删除文章
function removePost(filename) {
  let filepath = path.resolve(__dirname, './src/data.json');
  let posts = {};
  if (fs.existsSync(filepath)) {
    posts = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
  delete posts[filename];
  fs.writeFileSync(filepath, JSON.stringify(posts));
}

function getMarkdownData(source) {
  // 获取文章内容数据
  let title = regExToValue(source, /#+ ([^\n]+)/);
  let thumbnail = regExToValue(source, /\!\[\]\(([\s\S]+?)\)/m);
  // 获取文章头部数据
  let jsonRex = /\`{3}json data([\s\S]+?)\`{3}/m;
  let jsonRes = source.match(jsonRex);
  let json = jsonRes ? JSON.parse(jsonRes[1]) : null;
  let data = Object.assign({}, {title: title, thumbnail: thumbnail}, json);
  return data;
}

// 通过正则获取value
function regExToValue(str, reg) {
  let res = str.match(reg);
  return res ? res[1] : null;
}
