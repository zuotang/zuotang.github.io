/**
 * 环境地址配置
 */
const staticHost = '';
const phpHost = 'http://wx.gstzy.cn';
const _base = '//admin.360gst.com'; //运营管理后台
const _picHost = '//www.gstzy.cn';

let defaultHost = {
    php: `${staticHost}/api`,
    dr_img: `${_base}/data/upload`, // 图片服务器
    picHost: `${_picHost}`, // 图片服务器地址(运营后台)
    adminHost: `${staticHost}/api/admin.360gst.com`,
  },
  __host = null;

switch (process.env.NODE_ENV) {
  case 'dev': //开发/测试服务器
  case 'local': //开发过程使用
  case 'test':
  case 'development':
    __host = Object.assign({}, defaultHost, {
      cHost: `/apic/cgi.gstyun.local`, //172.30.12.68  cgi.gstyun.local`,    // 后台内网测试地址
      mHost: '/api/admin.gstyun.local',
      dHost: '/api/data-api.gstzy.cn:63306',
      ec: '/api/ec.gstyun.local',
    });
    break;
  case 'stg': //预发布服务器,php后台连接线上环境,CPP连接预发布环境
    __host = Object.assign({}, defaultHost, {
      cHost: `/apic/stg-cgi.gstyun.cn`, // 后台stg
      mHost: '/api/admin.360gst.com',
      dHost: '/api/data-api.gstzy.cn',
      ec: '/api/ec.gstyun.local',
    });
    break;
  case 'prod':
  case 'production':
  default:
    // 生产环境
    __host = Object.assign({}, defaultHost, {
      cHost: `/apic/cgi.gstyun.cn`,
      mHost: '/api/admin.360gst.com',
      dHost: '/api/data-api.gstzy.cn',
      ec: '/api/ec.gstzy.cn',
    });
}

// 供本地开发用
const localProxyHost = {
  cplus: 'http://cgi.gstyun.local',
  ec: 'http://ec.gstyun.local',
  mHost: 'http://admin.gstyun.local',
  dHost: 'http://data-api.gstzy.cn:63306',
};

const originHost = __host;
const host = originHost;

/**
 * 配置API重写，给 webpack dev server 使用
 * test, stg, setA 等环境，因为配置 nginx rewrite
 * 故不用重复配置
 * 详细，可以到 /etc/nginx/rewrite 目录查看
 */
const getProxyConfig = () => {
  let proxy = {};
  for (let key in localProxyHost) {
    proxy[`${host[key]}`] = {
      target: localProxyHost[key],
      changeOrigin: true,
      pathRewrite: {
        [`^${host[key]}`]: '',
      },
    };
  }
  return proxy;
};

// 使用 module.exports，供 webpack config 和 APP 同时使用
module.exports = {
  host,
  getProxyConfig,
};
