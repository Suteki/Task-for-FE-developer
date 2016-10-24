import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as userActions from '../actions/userActions';

describe('User', function() {
  it('Should handle user login', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const response = {
      loggedin: true,
      username: 'user-ok'
    };

    // act
    const action = userActions.authenticationSuccess(response);
    store.dispatch(action);

    // assert
    const actual = store.getState();
    const expected = {
      user: {
        auth: {
          loggedin: true,
          username: 'user-ok'
        }
      }
    };

    expect(actual).toEqual(expected);
  });
});
