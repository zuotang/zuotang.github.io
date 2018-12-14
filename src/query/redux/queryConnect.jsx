import React, {Component} from 'react';
import QueryComponent from './../QueryComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {covenantAct, covenantClearAct} from './covenantStore';

// 连接器
const queryConnect = (query, options = {}) => WrappedComponent => {
  const QueryConsumer = props => {
    let {store, hold, ssr, ...aisle} = props;
    let isSsr = !(options.ssr === false || ssr === false);
    return (
      <QueryComponent
        ssr={isSsr}
        aisle={aisle}
        queryName={options.name}
        hold={options.hold || hold}
        store={store}
        query={query}
        WrappedComponent={WrappedComponent}
        variables={options.variables}
        forcedUpdate={options.forcedUpdate}
        updateQuery={options.updateQuery}
        setStore={(name, value) => {
          return props.covenantAct(name, value);
        }}
        clearStore={name => {
          return props.covenantClearAct(name);
        }}
      />
    );
  };
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        covenantAct: covenantAct,
        covenantClearAct: covenantClearAct,
      },
      dispatch
    );

  const mapStateToProps = state => {
    return {
      store: state.covenant[options.name],
    };
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(QueryConsumer);
};
export default queryConnect;
