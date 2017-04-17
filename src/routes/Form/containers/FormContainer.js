import { connect } from 'react-redux';
import { actions } from '../modules/form';
import { createSelector } from 'reselect'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Form from '../components/Form.jsx';

/**
 *  Lenses
 * */

const formState = state => state.form;
const currentStep = createSelector(formState, form => form.get('steps').get(form.get('currentStep')));

const mapStateToProps = state => ({
  step: currentStep(state),
  errorMessages: formState(state).get('errorMessages'),
  done: formState(state).get('done'),
  frozen: formState(state).get('frozen'),
  submitted: formState(state).get('submitted'),
});

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, actions)(Form);
