/**
 * 日志相关基本工具
 */
import {getUser} from './tools';
import {get} from './_http';
import dayjs from 'dayjs';

//获取基本信息,打进日志
const baseInfo = () => {
  const oInfo = getUser();
  let baseObj = {
    city_id: oInfo.city_id,
    clinic_id: oInfo.clinic_id,
    clinic_name: oInfo.clinic_name,
    user_id: oInfo.user_id,
    user_name: oInfo.user_name,
    work_no: oInfo.work_no,
  };
  let baseStr = `user:${oInfo.city_id}|${oInfo.clinic_id}|${oInfo.clinic_name}|${oInfo.user_id}${oInfo.user_name}|${oInfo.work_no}`;
  return {baseObj, baseStr};
};
//基本且全的服务器日志
export const serverLog = ({url, postData, respData, sendTime}) => {
  let receiveTime = Date.now();
  respData = respData.constructor === Error ? respData.toString() : JSON.stringify(respData);
  let data = {
    source: url,
    time: receiveTime - sendTime,
    request: JSON.stringify(postData),
    response: JSON.stringify(respData),
    user: baseInfo().baseStr,
  };
  get(`/jsapi/log`, {data});
};
//记录业务流程日志。
export const businessLog = (message = '', data = {}) => {
  let time = new Date(),
    timeStr = dayjs().format('YYYY-MM-DD HH:mm:ss:SSS');
  let content = {...baseInfo().baseObj, ...data};
  let postData = {
    message: message,
    info: JSON.stringify(content),
    time: timeStr,
  };
  get(`/jsapi/log_bsns?`, {data: postData});
};
//简易日志
export const simpleLog = (logCont, config = {}) => {
  let baseConf = {
    debug: false, //调试模式
    type: 'log', //日志类型, 与console对应
    showInBrowser: false, //浏览器中可见
    showInNode: true, //Node服务中可见
  };
  let conf = {...baseConf, ...config};
  let {debug, type, showInBrowser, showInNode} = conf;

  if (/^(local|dev|test|stg)$/.test(process.env.NODE_ENV)) {
    console[type](logCont);
  }
};
export const sLog = simpleLog;
