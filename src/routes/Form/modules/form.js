require('es6-symbol/implement');

import * as Immutable from 'immutable';
import {Effects, loop} from 'redux-loop';

// ------------------------------------
// API
// ------------------------------------
import {checkIt, submitIt} from '../utils/api.js';

// ------------------------------------
// Constants
// ------------------------------------

export const SUBMIT_STEP = 'SUBMIT_STEP';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const PROCESS_STEP = 'PROCESS_STEP';
export const FAILURE = 'FAILURE';
export const GO_BACK = 'GO_BACK';
export const GREETING = 'GREETING';

// ------------------------------------
// Actions
// ------------------------------------
function submitStep(value) {
  return {
    type: SUBMIT_STEP,
    payload: value,
  };
}

function submitForm() {
  return {
    type: SUBMIT_FORM
  };
}

function processStep(value) {
  return {
    type: PROCESS_STEP,
    payload: value,
  };
}

function failure(value) {
  return {
    type: FAILURE,
    payload: value,
  };
}

function greeting() {
  return {
    type: GREETING,
  };
}

function goBack() {
  return {
    type: GO_BACK,
  };
}

export const actions = {
  submitStep,
  submitForm,
  goBack,
};

// ------------------------------------
// Effects
// ------------------------------------
export const filterTextEffect = data =>
  checkIt(data)
    .then(() => processStep(data))
    .catch(failure);

export const submitEffect = data =>
  submitIt(data)
    .then(() => console.log(data)) // For presenting only
    .then(greeting)
    .catch(failure);


// ------------------------------------
// Action Handlers
// ------------------------------------
const hasFilter = state => state.getIn(['steps', state.get('currentStep'), 'filter']) !== undefined;
const decrementStep = state => state.get('currentStep') !== 0 && state.update('currentStep', stepIndex => stepIndex - 1);
const incrementStep = state => state.update('currentStep', stepIndex => stepIndex + 1);
const updateStep = (state, value) => state.update('steps', steps =>
  steps.update(state.get('currentStep'),
    step => step.set('selected', value),
  ),
);
const updateDone = state => state.set('done', state.get('steps').size === state.get('currentStep'));
const clearErrors = state => state.set('errorMessages', Immutable.List());
const unFreeze = state => state.set('frozen', false);

const modify = (state, modificators, value) =>
  modificators.reduce(
    (prevState, functionToApply) =>
      functionToApply.call(this, prevState, value), state);

const process = (state, value) =>
  // update state with modificators
  // order is important for logic purpose
  modify(state, [updateStep, incrementStep, updateDone, clearErrors, unFreeze], value);

const submitStepActionHandler = (state, action) => {
  if (hasFilter(state, action.payload)) {
    return loop(
      state.set('frozen', true),
      Effects.promise(filterTextEffect, action.payload),
    );
  }
  return process(state, action.payload);
};

const getDataForSubmition = state => Object.assign.apply(this, state
  .get('steps')
  .map(step => ({
    [step.get('propName')]: step.get('selected'),
  }))
  .toJS());

const submitFormActionHandler = state =>
  loop(
    state.set('frozen', true),
    Effects.promise(submitEffect, getDataForSubmition(state)),
  );

const processStepActionHandler = (state, action) => process(state, action.payload);

const setSubmited = state => state.set('submitted', true);
const greetingActionHandler = state =>
  modify(state, [setSubmited, unFreeze]);

const setError = (state, value) => state.set('errorMessages', Immutable.List.of(value.toString()));
const failureActionHandler = (state, action) =>
  modify(state, [setError, unFreeze], action.payload);
const goBackActionHandler = state => decrementStep(state);

const ACTION_HANDLERS = {
  [SUBMIT_STEP]: submitStepActionHandler,
  [PROCESS_STEP]: processStepActionHandler,
  [FAILURE]: failureActionHandler,
  [SUBMIT_FORM]: submitFormActionHandler,
  [GREETING]: greetingActionHandler,
  [GO_BACK]: goBackActionHandler,
};

// ------------------------------------
// Reducer
// ------------------------------------

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


export default function formReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
