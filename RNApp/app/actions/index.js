import * as actionTypes from './actionTypes';

export function changeSignInStatus(status = false) {
  return { type: actionTypes.CHANGE_SIGN_IN_STATUS, status };
}
