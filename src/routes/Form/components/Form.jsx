import React from 'react'
import PropTypes from 'prop-types'
import {Button, Alert} from 'antd';

import {
  CheckboxStep,
  SelectStep,
  ToggleStep,
  TextStep
} from './steps';
import './form.css';

export const CHANGE_STEP_TIMEOUT = 500;

const stepType2StepComponent = {
  'checkbox': CheckboxStep,
  'select': SelectStep,
  'toggle': ToggleStep,
  'text': TextStep,
};

export default class Form extends React.Component {
  constructor(){
    super();
  }
  componentDidMount() {
    document.addEventListener('keydown', event => {
      if (event.key === "ArrowUp") {
        this.props.goBack();
      }
    });
  }
  render() {
    const {step, done, frozen, submitted, errorMessages, submitForm, submitStep} = this.props;
    const centringStyle = {margin: '0 auto'};
    const errors =
      (errorMessages.size > 0) ? errorMessages.map((message, i) => <Alert key={`e-${i}`}
                                                                          message={ message }
                                                                          type="error"/>) : null;

    if (submitted) {
      return (<div style={centringStyle}> Thanks! </div>);
    }

    return (
      <div style={centringStyle}>
        { frozen ? <div className="ant-modal-mask"/> : null }
        { errors }
        {
          !done ? stepType2StepComponent[step.get('type')]({...step.toJS(), submitStep})
          :
            <Button onClick={submitForm}> Submit </Button>
        }
      </div>
    )
  }
}

