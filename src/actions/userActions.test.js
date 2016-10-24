import expect from 'expect';
import * as userActions from './userActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('User Actions', () => {
  describe('authentication success', () => {
    it('should create a AUTHENTICATION_SUCCESS action', () => {
      //arrange
      const response = {loggedin: true, username: "test-user"};
      const expectedAction = {
        type: types.AUTHENTICATION_SUCCESS,
        response: response
      };

      //act
      const action = userActions.authenticationSuccess(response);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe('authentication fail', () => {
    it('should create a AUTHENTICATION_FAILED action', () => {
      //arrange
      const error = "TYPE OF ERROR";
      const expectedAction = {
        type: types.AUTHENTICATION_FAILED,
        error: error
      };

      //act
      const action = userActions.authenticationFailed(error);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create AUTHENTICATION_START and AUTHENTICATION_SUCCESS auth success', (done) => {

    const user = {username: "user-ok", password: "user-ok"};
    const result = {auth: {loggedin: true, username: "user-ok"}};

    const expectedActions = [
      {type: types.AUTHENTICATION_START, user},
      {type: types.AUTHENTICATION_SUCCESS, result}
    ];

    const store = mockStore({user: {}}, expectedActions);
    store.dispatch(userActions.authentication(user)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.AUTHENTICATION_START);
      expect(actions[1].type).toEqual(types.AUTHENTICATION_SUCCESS);
      done();
    });
  });
});
