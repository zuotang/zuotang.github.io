import axios from 'axios';
import {host as hostData} from './hostConf';

const CancelToken = axios.CancelToken;
let cancel;

axios.create({
  cancelToken: new CancelToken(function(c) {
    cancel = c;
  }),
});
//扩展位置
export const post = axios.post;
export const get = axios.get; //(url, data, ...other) => axios.get(url, { ...data, headers: { 'Access-Control-Allow-Origin': '*' } }, ...other);
export const host = hostData;

export const cancelFetch = cancel;
