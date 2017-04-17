require('es6-symbol/implement');

import {
  //constants
  SUBMIT_STEP,
  SUBMIT_FORM,
  PROCESS_STEP,
  FAILURE,
  GO_BACK,
  GREETING,
  COUNTER_INCREMENT,
  //acrions
  actions,
  goBack,
  //effects
  filterTextEffect,
  default as formReducer
} from 'routes/Form/modules/form'

import {Effects, loop} from 'redux-loop';

import * as Immutable from 'immutable';

const {submitStep, submitForm} = actions;

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
describe('(Redux Module) Form', () => {
  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(formReducer).to.be.a('function');
    });

    it('Should initialize with initialState.', () => {
      expect(formReducer(undefined, {})).to.deep.equal(initialState);
    });

    it('Should return the previous state if an action was not matched.', () => {
      let state = formReducer(undefined, {});
      expect(state).to.deep.equal(initialState);
      state = formReducer(state, {type: '@@@@@@@'});
      expect(state).to.deep.equal(initialState);
      state = formReducer(state, submitStep(['A1']));
      let shouldBeState = initialState.setIn(['steps', 0, 'selected'], ['A1']);
      shouldBeState = shouldBeState.setIn(['currentStep'], 1);
      expect(state.toJS()).to.deep.equal(shouldBeState.toJS());
      state = formReducer(state, {type: '@@@@@@@'});
      expect(state).to.deep.equal(shouldBeState);
    });
  });

  describe('(Action Creator) submitStep', () => {
    it('Should be exported as a function.', () => {
      expect(submitStep).to.be.a('function');
    })

    it('Should return an action with type "SUBMIT_STEP".', () => {
      expect(submitStep()).to.have.property('type', SUBMIT_STEP);
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(submitStep(5)).to.have.property('payload', 5);
    })

  });

  describe('(Action Creator) submitForm', () => {
    it('Should be exported as a function.', () => {
      expect(submitForm).to.be.a('function');
    });

    it('Should return an action with type "SUBMIT_FORM".', () => {
      expect(submitForm()).to.have.property('type', SUBMIT_FORM);
    });

    it('Should has no "payload" property.', () => {
      expect(submitForm(5)).to.have.not.property('payload');
    });
  });

  describe('(Action Creator) doubleAsync', () => {
    it('Should be exported as loop with frozen state and promise.', () => {
      const stateInStep3 = initialState.setIn(['currentStep'], 2);
      expect(
        formReducer(stateInStep3, submitStep('abracadabra'))
      ).to.deep.equal(
        loop(
          stateInStep3.set('frozen', true),
          Effects.promise(filterTextEffect, 'abracadabra'),
        ),
      );
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      filterTextEffect('abracadabra').should.eventually.be.fulfilled
    });
  });
});
