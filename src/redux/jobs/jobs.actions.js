import axios from 'axios';
import {JobsActionTypes} from './jobs.types';
import {config} from '../../config/config';

export const getAllJobs = token => {
  return async dispatch => {
    const response = await axios.get(
      `${config.API_URL}/orders?api_token=${token}`,
    );

    console.log('object', `${config.API_URL}/orders?api_token=${token}`);

    console.log('response', response);

    const {
      data: {data},
    } = response;

    dispatch({
      type: JobsActionTypes.GET_ALL_JOBS,
      payload: data,
    });
  };
};
