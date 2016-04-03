import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

// import { ddpReducer } from 'redux-meteor-ddp';
import { ddpReducer } from '../../redux-meteor-ddp';

const initialState = {
  signedIn: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SIGN_IN_STATUS:
      return Object.assign({}, state, { signedIn: action.status });
    default:
      return state
  }
}

export default combineReducers({
  app: appReducer,
  ddp: ddpReducer
});
