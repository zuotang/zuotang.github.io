import React, {Component} from 'react';
import cache from './cache';
// import memory from './memory';
import {getCacheName, getVariablesData} from './utils';

class MutationComponent extends Component {
  // cacheName 为本次请求的特征码
  async mutationData({props, variablesData, cacheName}) {
    let {store, setStore, mutation, mutationName, update} = props;

    await new Promise(resolve => setTimeout(resolve));
    //设置状态为加载中...
    setStore(mutationName, {loading: true});
    //请求数据
    let res;
    try {
      res = await mutation(variablesData);
    } catch (err) {
      setStore(mutationName, {error: err.message, loading: false});
      throw err;
    }
    //是否需要更新Store
    let resData = res;
    resData.loading = false;
    resData.error = null;
    cache.set(cacheName, {name: mutationName, data: res});
    setStore(mutationName, resData);
    if (update) update(resData);
    return resData;
  }

  getVariablesData(variables, aisle) {
    return getVariablesData(variables, aisle);
  }

  // 创建组件时首次请求数据
  send({variables}) {
    let {mutationName, aisle} = this.props;
    let variablesData = this.getVariablesData(variables, aisle);
    const cacheName = getCacheName(mutationName, variablesData);
    this.cacheName = cacheName;
    return this.mutationData({props: this.props, variablesData, cacheName});
  }

  render() {
    let {store, mutationName, WrappedComponent, renderFun, aisle, update} = this.props;
    let newProps = {
      ...aisle,
      [mutationName]: this.send.bind(this),
    };

    if (renderFun) {
      return renderFun(this.send.bind(this), store);
    } else if (WrappedComponent) {
      return <WrappedComponent {...newProps} />;
    }
  }
}

export default MutationComponent;
