export const staticHost = '';
export const php = '//weixin.gstyun.cn:8080'; //灰度期间使用的host
export const phpHost = '//wx.gstyun.cn';
//运营管理后台
const _base = '//admin-gstzy.oss-cn-shenzhen.aliyuncs.com';
export const ossPath = '//wx-gstzy.oss-cn-shenzhen.aliyuncs.com/gstzy/';
const _picHost = '//www.gstzy.cn';

let __host = {
  php: `${staticHost}/api`,
  dr_img: `${_base}/data/upload`, //图片服务器
  picHost: `${_picHost}`, // 图片服务器地址(运营后台)
};
let isServer = typeof window == 'undefined';
switch (process.env.RUN_ENV) {
  case 'local':
  case 'dev': //开发过程使用
    __host = Object.assign({}, __host, {
      dr_img: `//admin.gstyun.local/data/upload`, //图片服务器
      cplus: isServer ? `http://cgi.gstyun.local` : `${staticHost}/apic/cgi.gstyun.local`,
      banner: isServer ? `http://admin.gstyun.local` : `${staticHost}/api/admin.gstyun.local`,
      healthAdHost: isServer ? `http://api.gstyun.local` : `${staticHost}/api/api.gstyun.local`,
      dplat: isServer ? `http://120.76.26.54:63306` : `${staticHost}/api/120.76.26.54:63306`,
      distribution: isServer ? `http://ec.gstyun.local` : `${staticHost}/api/ec.gstyun.local`,
      news: isServer ? `http://news.gstyun.local` : `${staticHost}/api/news.gstyun.local`,
      oldHost: isServer ? `http://chat.gstyun.local` : `${staticHost}/api/chat.gstyun.local`, // 轻问诊
      wxapi: `https://wx.gstyun.cn`,
      staticSource: `//static.gstyun.local`,
      defaultCashier: {
        //默认收银员
        id: '1',
        number: '1066',
        userName: 'mPay',
        realName: '移动收银员',
        email: 'mobilepay@360gst.com',
      },
    });
    break;
  case 'test':
    __host = Object.assign({}, __host, {
      dr_img: `//admin.gstyun.local/data/upload`, //图片服务器
      cplus: isServer ? `http://cgi.gstyun.local` : `${staticHost}/apic/cgi.gstyun.local`,
      banner: isServer ? `http://admin.gstyun.local` : `${staticHost}/api/admin.gstyun.local`,
      healthAdHost: isServer ? `http://api.gstyun.local` : `${staticHost}/api/api.gstyun.local`,
      dplat: isServer ? `http://data-api.gstzy.cn:63306` : `${staticHost}/apic/data-api.gstzy.cn:63306`,
      distribution: isServer ? `http://ec.gstyun.local` : `${staticHost}/api/ec.gstyun.local`,
      news: isServer ? `http://news.gstyun.local` : `${staticHost}/api/news.gstyun.local`,
      oldHost: isServer ? `http://chat.gstyun.local` : `${staticHost}/api/chat.gstyun.local`, // 轻问诊
      wxapi: `https://wx.gstyun.cn`,
      staticSource: `//static.gstyun.local`,
      defaultCashier: {
        //默认收银员
        id: '1',
        number: '1066',
        userName: 'mPay',
        realName: '移动收银员',
        email: 'mobilepay@360gst.com',
      },
    });
    break;
  // case "local":
  case 'stg':
    __host = Object.assign({}, __host, {
      cplus: isServer ? `http://stg-cgi.gstyun.cn` : `${staticHost}/apic/stg-cgi.gstyun.cn`,
      banner: isServer ? `http://admin.360gst.com` : `${staticHost}/apix/admin.360gst.com`,
      healthAdHost: isServer ? `http://api.gstyun.cn` : `${staticHost}/api/api.gstyun.cn`,
      dplat: isServer ? `http://data-api.gstzy.cn` : `${staticHost}/apic/data-api.gstzy.cn`,
      // dplat         : `${staticHost}/apic/120.76.26.54:63306`,
      distribution: isServer ? `http://ec.gstzy.cn` : `${staticHost}/api/ec.gstzy.cn`, //php没stg环境
      news: isServer ? `http://news.gstyun.cn` : `${staticHost}/api/news.gstyun.cn`,
      oldHost: isServer ? `http://chat.gstyun.cn` : `${staticHost}/api/chat.gstyun.cn`, // 轻问诊 线上环境
      wxapi: `https://wx.gstyun.cn`,
      staticSource: `//stg.gstyun.cn`,
      defaultCashier: {
        //默认收银员
        id: '966',
        number: '0221',
        userName: 'limeilan',
        realName: '移动收银员',
        email: 'meilan.li@360gst.com',
      },
    });
    break;

  case 'production':
  default:
    // 生产环境
    __host = Object.assign({}, __host, {
      cplus: isServer ? `http://cgi.gstyun.cn` : `${staticHost}/apic/cgi.gstyun.cn`,
      banner: isServer ? `http://admin.360gst.com` : `${staticHost}/api/admin.360gst.com`,
      dplat: isServer ? `http://data-api.gstzy.cn` : `${staticHost}/apic/data-api.gstzy.cn`,
      distribution: isServer ? `http://ec.gstzy.cn` : `${staticHost}/api/ec.gstzy.cn`,
      healthAdHost: isServer ? `http://api.gstyun.cn` : `${staticHost}/api/api.gstyun.cn`,
      news: isServer ? `http://news.gstyun.cn` : `${staticHost}/api/news.gstyun.cn`,
      oldHost: isServer ? `http://chat.gstyun.cn` : `${staticHost}/api/chat.gstyun.cn`, // 轻问诊
      wxapi: `https://wx.gstyun.cn`,
      staticSource: `//stg.gstyun.cn`,
      defaultCashier: {
        //默认收银员
        id: '966',
        number: '0221',
        userName: 'limeilan',
        realName: '移动收银员',
        email: 'meilan.li@360gst.com',
      },
    });
}

export const host = __host;
