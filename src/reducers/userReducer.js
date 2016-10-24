import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.REGISTRATION_START:
      return Object.assign({}, state, {registering: "inprogress"});

    case types.REGISTRATION_FAILED:
      return Object.assign({}, state, {registering: "failed"});

    case types.AUTHENTICATION_START:
      return Object.assign({}, state, {logginIn: "inprogress"});

    case types.AUTHENTICATION_FAILED:
      return Object.assign({}, state, {logginIn: "failed"});

    case types.AUTHENTICATION_SUCCESS:
      return Object.assign({},
        {auth: action.response});

    case types.USER_LOGOUT:
      return {};

    default:
      return state;
  }
}
