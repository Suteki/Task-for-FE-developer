import expect from 'expect';
import userReducer from './userReducer';
import * as actions from '../actions/userActions';

describe('User Reducer', () => {
  it('should create auth when passed AUTHENTICATION_SUCCESS', () => {
    // arrange
    const initialState = {user: {}};

    const response = {loggedin: true, username: "user-ok"};

    const action = actions.authenticationSuccess(response);

    //act
    const newState = userReducer(initialState, action);

    //assert
    expect(newState).toEqual({auth: {loggedin: true, username: "user-ok"}});
  });
});
