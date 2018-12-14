function getProxyItem(key, url) {
  let rewrite = '^' + key;
  return {
    [key]: {
      target: url,
      changeOrigin: true,
      secure: false,
      pathRewrite: { [rewrite]: '' },
    },
  };
}

const proxy = {
  ...getProxyItem('/api-admin', 'https://admin.360gst.com'),
  ...getProxyItem('/api-cgi', 'http://cgi.gstyun.cn'),
  ...getProxyItem('/api-api', 'http://api.gstyun.cn'),
};
module.exports = proxy;
