import React from 'react';
import {Checkbox, Button} from 'antd';
import './../form.css';

const CheckboxStep = (props) => {

  const updateValues = (value) =>
    props.selected ?
      props.selected.indexOf(value) === -1 ?
        props.selected.concat([value]) :
        props.selected.filter( i => i !== value)
      : [value];
  return (props.items.map((item, i) => {
      return <Checkbox key={`cb-${i}`} data-value={item.value}
                defaultChecked={props.selected ? props.selected.indexOf(item.value) !== -1 : false}
                onChange={() => props.submitStep(updateValues(item.value))}> {item.label } </Checkbox>

    })
  )
};

export default CheckboxStep;
