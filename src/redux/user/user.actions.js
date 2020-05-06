import {UserActionTypes} from './user.types';
import axios from 'axios';
import {config} from '../../config/config';
import AsyncStorage from '@react-native-community/async-storage';

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

export const clearResetLinkEmail = () => ({
  type: UserActionTypes.SEND_RESET_LINK_EMAIL,
  payload: null,
});

export const sendResetLinkEmail = email => {
  return async dispatch => {
    const response = await axios.post(
      `${config.API_URL}/send_reset_link_email`,
      email,
    );
    const {data} = response;

    if (data.success) {
      dispatch({
        type: UserActionTypes.SEND_RESET_LINK_EMAIL,
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

export const getApiToken = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('api_token');
    if (token) {
      dispatch({
        type: UserActionTypes.GET_API_TOKEN,
        payload: token,
      });
    } else {
      dispatch({
        type: UserActionTypes.GET_API_TOKEN,
        payload: null,
      });
    }
  };
};

export const getUserData = () => {
  return async dispatch => {
    const userData = await AsyncStorage.getItem('userData');
    console.log('userData', userData);
    if (userData) {
      dispatch({
        type: UserActionTypes.GET_USER_DATA,
        payload: userData,
      });
    }
  };
};
