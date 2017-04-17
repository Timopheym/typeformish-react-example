import React from 'react';
import {Checkbox, Button} from 'antd';
import './../form.css';

const CheckboxStep = (props) => {
  console.log(props);
  return (props.items.map((item, i) =>
      <Checkbox key={`cb-${i}`} data-value={item.value}
                onChange={() => [props.submitStep(item.value)] }> {item.label } </Checkbox>
    )
  )
};

export default CheckboxStep;
