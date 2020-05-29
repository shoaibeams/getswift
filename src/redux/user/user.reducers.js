import {UserActionTypes} from './user.types';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOG_IN_USER:
      return {...state, user: action.payload};
    case UserActionTypes.GET_API_TOKEN:
      return {...state, token: action.payload};
    case UserActionTypes.GET_USER_DATA:
      return {...state, userData: action.payload};
    case UserActionTypes.SIGN_OUT_USER:
      return {...state, signOutResponse: action.payload};

    case UserActionTypes.SEND_RESET_LINK_EMAIL:
      return {...state, resetPassword: action.payload};
    case UserActionTypes.CLEAR_SEND_RESET_LINK_EMAIL:
      return {...state, resetPassword: action.payload};
    default:
      return state;
  }
};

export default userReducer;
