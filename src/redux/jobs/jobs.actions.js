import axios from 'axios';
import {JobsActionTypes} from './jobs.types';
import {config} from '../../config/config';

export const getAllJobs = token => {
  return async dispatch => {
    const response = await axios.get(
      `${config.API_URL}/orders?api_token=${token}`,
    );

    const {
      data: {data},
    } = response;

    dispatch({
      type: JobsActionTypes.GET_ALL_JOBS,
      payload: data,
    });
  };
};

export const acceptJob = (token, jobId) => {
  return async dispatch => {
    const response = await axios.post(`${config.API_URL}/job-accept?page=1`, {
      api_token: token,
      order_id: jobId,
    });
    const {
      data: {data},
    } = response;

    // console.log('data :>> ', data);
    dispatch({
      type: JobsActionTypes.ACCEPT_JOB,
      payload: data,
    });

    dispatch({
      type: JobsActionTypes.GET_ALL_JOBS,
      payload: data,
    });
  };
};

export const rejectJob = (token, jobId) => {
  return async dispatch => {
    const response = await axios.post(`${config.API_URL}/job-reject?page=1`, {
      api_token: token,
      order_id: jobId,
    });
    const {
      data: {data},
    } = response;

    console.log('data :>> ', data);
    dispatch({
      type: JobsActionTypes.ACCEPT_JOB,
      payload: data,
    });

    dispatch({
      type: JobsActionTypes.GET_ALL_JOBS,
      payload: data,
    });
  };
};
