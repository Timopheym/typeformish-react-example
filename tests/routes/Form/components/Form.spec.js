import React from 'react'
import { bindActionCreators } from 'redux'
import Form from 'routes/Form/components/Form'
import { shallow } from 'enzyme'

import * as Immutable from 'immutable';

const initialState = Immutable.fromJS({
  steps: [{
    type: 'checkbox',
    items: [{
      label: 'A1',
      value: 'A1',
    }, {
      label: 'A2',
      value: 'A2',
    }],
    propName: 'a',
    selected: null,
  }, {
    type: 'toggle',
    items: [{
      label: 'B1',
      value: 'B1',
    }, {
      label: 'B2',
      value: 'B2',
    }],
    propName: 'b',
    selected: null,
  }, {
    type: 'text',
    button: {
      label: 'Check',
    },
    propName: 'text',
    filter: {
      type: 'api',
      endpoint: '/check',
    },
    selected: null,
  }, {
    type: 'select',
    options: [{
      label: 'C1',
      value: 'C1',
    }, {
      label: 'C2',
      value: 'C2',
    }, {
      label: 'C3',
      value: 'C3',
    }],
    propName: 'c',
    selected: null,
  }],
  currentStep: 0,
  errorMessages: [],
  done: false,
  frozen: false,
  submitted: false,
});
describe('(Component) Form', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {
      step: initialState.get('steps').get(0),
      done: initialState.get('done'),
      frozen: initialState.get('frozen'),
      submitted: initialState.get('submitted'),
      errorMessages: initialState.get('errorMessages'),
      ...bindActionCreators({
        submitStep: (_spies.submitStep = sinon.spy()),
        submitForm: (_spies.submitForm = sinon.spy()),
      }, _spies.dispatch = sinon.spy()),
    };
    _wrapper = shallow(<Form {..._props} />);
  });

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true);
  });


  it('Should render exactly two checkboxes.', () => {
    expect(_wrapper.find('Checkbox')).to.have.length(2);
  });

  it('Should dispatch a `submitStep` action when clicked', () => {
    _spies.dispatch.should.have.not.been.called;

    const checkbox = _wrapper.find('Checkbox').first();
    checkbox.simulate('change');

    _spies.dispatch.should.have.been.called;
    _spies.submitStep.should.have.been.called;
  });
});
