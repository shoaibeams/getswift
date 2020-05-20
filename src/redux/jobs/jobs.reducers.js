import {JobsActionTypes} from './jobs.types';

const initialState = {};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JobsActionTypes.GET_ALL_JOBS:
      return {...state, jobs: action.payload};
    case JobsActionTypes.ACCEPT_JOB:
      return {...state, job: action.payload};
    default:
      return state;
  }
};

export default jobsReducer;
