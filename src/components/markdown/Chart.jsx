import React, {useState, useEffect, useRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
//import Chart from 'chart.js';
import Chart from 'chart';

const styles = theme => ({
  code: {
    margin: '10px 0',
  },
});

function Code(props) {
  let chartRef = useRef();
  useEffect(() => {
    var ctx = chartRef.current.getContext('2d');
    new Chart(ctx, JSON.parse(props.value));
  });
  return <canvas ref={chartRef} id="myChart" width="400" height="400" />;
}

export default withStyles(styles)(Code);
