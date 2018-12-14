//共用方法
import {host} from 'api_/hostConf';
export const dirServer = '../www';
export const dirBuild = '../build';
//图片地址
//export const adminImgUrl = '//admin-gstzy.oss-cn-shenzhen.aliyuncs.com/data/upload/';
export const getAdminImg = url => {
  return `${host.dr_img}/${url}`;
};
