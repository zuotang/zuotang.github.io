export function getMarkdownData(source) {
  // 获取文章内容数据
  let title = regExToValue(source, /#+ ([^\n]+)/);
  let thumbnail = regExToValue(source, /\!\[\]\(([\s\S]+?)\)/m);
  // 获取文章头部数据
  let jsonRex = /\`{3}json data([\s\S]+?)\`{3}/m;
  let jsonRes = source.match(jsonRex);
  let json = jsonRes ? JSON.parse(jsonRes[1]) : null;
  let data = Object.assign({}, {title: title, thumbnail: thumbnail}, json);

  let res = source.replace(jsonRex, '');
  return {...data, content: res};
}

// 通过正则获取value
function regExToValue(str, reg) {
  let res = str.match(reg);
  return res ? res[1] : null;
}
