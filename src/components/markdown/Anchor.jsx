import React, {useEffect} from 'react';

// 通过value获取ID
export function getAnchor(value) {
  if (!value) return '';
  let keywords = value.match(/[\u4e00-\u9fa5a-zA-Z\d\-\_]*/gi);
  let content = keywords.join('').toLowerCase();
  return content;
}

// 滚动到锚点
export function toAnchor(hash, inputs) {
  return useEffect(() => {
    if (hash) {
      let id = `user-content-${decodeURI(hash.substr(1))}`;
      let anchorElement = document.getElementById(id);
      if (anchorElement) {
        anchorElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  }, inputs);
}
