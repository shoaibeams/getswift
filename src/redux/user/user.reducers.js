import {UserActionTypes} from './user.types';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOG_IN_USER:
      return {...state, user: action.payload.data};

    default:
      return state;
  }
};

export default userReducer;
