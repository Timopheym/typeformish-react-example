import React from 'react';
import {Input, Button} from 'antd';
import './../form.css';


const TextStep = (props) => {
  let input;
  const handleSubmit = () => props.submitStep(input.refs.input.value);

  return [<Input key="txt-input"
                 onPressEnter={handleSubmit}
                 ref={c => (input = c)}/>,
    <Button key="txt-btn"
            onClick={handleSubmit}>
      {props.button.label}
    </Button>]
};

export default TextStep;
