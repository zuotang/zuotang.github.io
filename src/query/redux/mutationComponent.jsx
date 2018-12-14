import React, {Component} from 'react';
import MutationComponent from '../MutationComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {covenantAct, updateAct} from './covenantStore';

const mapDispatchToProps = dispatch => bindActionCreators({covenantAct: covenantAct, updateAct: updateAct}, dispatch);
const mapStateToProps = (state, props) => {
  if (!props.mutation) {
    throw new Error('mutation is essential');
  }
  let mutationName = props.name || props.mutation.name;
  return {
    mutationName,
    store: state.covenant[mutationName],
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class Mutation extends Component {
  render() {
    let {children, mutationName, store, mutation, getState, update, ...aisle} = this.props;
    if (typeof children !== 'function') {
      throw new Error('MutationComponent Children Not a function');
    }
    return (
      <MutationComponent
        aisle={aisle}
        mutationName={mutationName}
        store={store}
        mutation={mutation}
        clearStore={name => {
          this.props.covenantClearAct(name);
        }}
        setStore={(name, value) => {
          this.props.covenantAct(name, value);
        }}
        update={data => {
          this.props.updateAct(update, data);
        }}
        renderFun={children}
      />
    );
  }
}
export default Mutation;
