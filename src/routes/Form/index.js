import { injectReducer } from '../../store/reducers'

export default(store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Form = require('./containers/FormContainer').default;
      const reducer = require('./modules/form').default;

      /*  Add the reducer to the store on key 'form'  */
      injectReducer(store, { key: 'form', reducer });

      /*  Return getComponent   */
      cb(null, Form);

    /* Webpack named bundle   */
    }, 'form');
  },
});
