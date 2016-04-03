import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signedIn: false
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SIGN_IN_STATUS:
      return Object.assign({}, state, { signedIn: action.status });
    default:
      return state
  }
}
