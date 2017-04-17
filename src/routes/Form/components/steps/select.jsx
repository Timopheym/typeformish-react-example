import React from 'react';
import { Select } from 'antd';
import './../form.css';

const Option = Select.Option;
const SELECT_WIDTH = 120;
/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const SelectStep = (props) => {
  return <Select style={{ width: SELECT_WIDTH }}
                 onChange={ value => props.submitStep(value) }>
      {props.options.map((option, i) => <Option key={`o-${i}`}
                                                value={option.value}>{ option.label }</Option>)}
    </Select>
};

export default SelectStep;
