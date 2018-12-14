/**
 * 请求方法封装
 */
import axios from 'axios';
import {Modal} from 'antd-mobile';

const iAlert = mes => Modal.alert('请求错误', mes);

// 创建 request 实例
const ax = axios.create({
  baseURL: '',
  timeout: 5000, // 请求超时时间
  withCredentials: true, //是否带cookie请求
});

// request拦截器
ax.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export const errorHandler = err => {
  if (err.message || err.mes || err.info) {
    iAlert(err.message || err.mes || err.info);
  } else {
    iAlert(JSON.stringify(err));
  }
};

export const get = (url, config = {}) => {
  let errHandler = config.errorHandler ? config.errorHandler : errorHandler;
  config.params = config.data;
  return ax
    .get(url, config)
    .then(resp => {
      if (!resp.data || +resp.data.status !== 0) {
        errHandler(resp.data);
      }
      if (+resp.data.status === 0 || +resp.data.status === 8193) resp.data.isOk = true;
      return resp.data;
    })
    .catch(err => {
      errHandler(err);
      throw err;
    });
};

export const post = (url, data, config = {}) => {
  let errHandler = config.errorHandler ? config.errorHandler : errorHandler;
  return ax
    .post(url, data, config)
    .then(resp => {
      if (!resp.data || +resp.data.status !== 0) {
        errHandler(resp.data);
      }
      if (+resp.data.status === 0) resp.data.isOk = true;
      return resp.data;
    })
    .catch(err => {
      errHandler(err);
      throw err;
    });
};

export const phpPost = (url, data, config = {}) => {
  let errHandler = config.errorHandler ? config.errorHandler : errorHandler;
  return ax
    .post(url, data, {headers: {'Content-Type': 'multipart/form-data'}, ...config})
    .then(resp => {
      if (!resp.data || +resp.data.status !== 0) {
        errHandler(resp.data);
      }
      if (+resp.data.status === 0) resp.data.isOk = true;
      return resp.data;
    })
    .catch(err => {
      errHandler(err);
      throw err;
    });
};
