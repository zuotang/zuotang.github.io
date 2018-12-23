// markdown处理
//toc 处理

//

export function getTitle(str) {
  if (/^\[[^\]]+\]\(/.test(str)) {
    var m = /^\[([^\]]+)\]/.exec(str);
    if (m) return m[1];
  }
  return str;
}

export function getAnchor(str) {
  return format(str);
}

export function format(str) {
  str = getTitle(str);
  str = str.toLowerCase();
  str = str.split(' ').join('-');
  str = str.split(/\t/).join('--');
  str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
  return str;
}
// 获取菜单数据
export function getTOC(md) {
  //let str = format(md);
  let list = [];
  let regx = /\n#+ ([^\n]+)/g;
  let value;
  while ((value = regx.exec(md))) {
    let level = value[0].split('#').length - 1;
    let name = value[1];
    let anchor = format(value[1]);
    list.push({name, level, anchor});
  }
  return list;
}
