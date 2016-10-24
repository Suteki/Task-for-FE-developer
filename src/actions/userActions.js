import * as types from './actionTypes';
import userApi from '../api/mockUserApi';

export function authenticationStart(user) {
  return {type: types.AUTHENTICATION_START, user};
}

export function authenticationSuccess(response) {
  return {type: types.AUTHENTICATION_SUCCESS, response};
}

export function authenticationFailed(error) {
  return {type: types.AUTHENTICATION_FAILED, error};
}

export function registrationStart(user) {
  return {type: types.REGISTRATION_START, user};
}

export function registrationFailed(error) {
  return {type: types.REGISTRATION_FAILED, error};
}

export function loggedOut(userData) {
  return {type: types.USER_LOGOUT, userData};
}

export function authentication(user) {
  return function (dispatch, getState) {
    dispatch(authenticationStart(user));

    return userApi.login(user).then(response => {
      dispatch(authenticationSuccess(response));
    }).catch(error => {
      dispatch(authenticationFailed(error));
      throw(error);
    });
  };
}

export function registration(user) {
  return function (dispatch, getState) {
    dispatch(registrationStart(user));

    return userApi.register(user).then(response => {
      dispatch(authenticationSuccess(response));
    }).catch(error => {
      dispatch(registrationFailed(error));
      throw(error);
    });
  };
}

export function logout() {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      resolve(dispatch(loggedOut(), {}));
    });
  };
}
