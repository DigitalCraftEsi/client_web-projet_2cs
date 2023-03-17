import React from 'react';

import Bar from './Bar';
import './barStyles.css';

const BarContainer = (props) => {
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);

  return (
    <div className='chart'>
      {props.dataPoints.map((dataPoint) => (
        <Bar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={dataPoint.maxValue}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default BarContainer;
