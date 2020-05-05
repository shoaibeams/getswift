import {UserActionTypes} from './user.types';
import axios from 'axios';
import {config} from '../../config/config';
import {Alert} from 'react-native';

export const loginUser = formData => {
  return async dispatch => {
    const response = await axios.post(`${config.API_URL}/login`, formData);
    const {data} = response;
    console.log('data :>> ', data);
    // Alert.alert('Error');
    if (data.success) {
      dispatch({
        type: UserActionTypes.LOG_IN_USER,
        payload: data,
      });
    }
  };
};

export const signUpUser = formData => {
  console.log('formData action :>> ', formData);
  return async dispatch => {
    const response = await axios.post(`${config.API_URL}/register`, formData);
    const {data} = response;
    console.log('data :>> ', data);
    if (data.success) {
      dispatch({
        type: UserActionTypes.LOG_IN_USER,
        payload: data,
      });
    }
  };
};
