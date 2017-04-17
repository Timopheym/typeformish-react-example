import React from 'react';
import {Switch} from 'antd';
import './../form.css';
import {CHANGE_STEP_TIMEOUT} from './../Form.jsx';

const ToggleStep = (props) => {
  return props.items.map( (item, i)=>
    [<Switch key={`tgl-${i}`}
             defaultChecked={item.value === props.selected}
             onChange={() => setTimeout(() => props.submitStep(item.value), CHANGE_STEP_TIMEOUT)} />,
      item.label ]
  );

};

export default ToggleStep;
