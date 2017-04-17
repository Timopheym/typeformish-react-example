import CounterRoute from 'routes/Form'

describe('(Route) Form', () => {
  let _route;

  beforeEach(() => {
    _route = CounterRoute({});
  });

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  });

});
