/**
 * 服务端共用工具
 */
import dayjs from 'dayjs';

//获取局域网ip 方便手机测试
export const getIPAddress = () => {
  let interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

export function log(str, tag = 'LOG') {
  const logStr = `\n========== [${dayjs().format('YYYY-MM-DD HH:mm:ss:SSS')}]-[${tag}] =====>\n${str}`;
  console.log(logStr);
}

export function logBusiness(message = '', info = '', timeStr = null) {
  if (!timeStr) {
    timeStr = `${dayjs().format('YYYY-MM-DD HH:mm:ss:SSS')}`;
  }
  const logStr = `\n---------- [${message}][${timeStr}] | ${info}`;
  console.log(logStr);
}
