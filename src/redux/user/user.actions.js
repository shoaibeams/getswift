import AsyncStorage from '@react-native-community/async-storage';
import {UserActionTypes} from './user.types';
import axios from 'axios';
import {config} from '../../config/config';
import {ToastAndroid} from 'react-native';

export const loginUser = formData => {
  return async dispatch => {
    const response = await axios.post(`${config.API_URL}/login`, formData);
    const {
      data: {data},
    } = response;
    // console.log('data', data);

    if (data.error) {
      ToastAndroid.showWithGravity(data.error, 3000, ToastAndroid.CENTER);
    }

    if (data.api_token) {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      await AsyncStorage.setItem('api_token', data.api_token);
      dispatch({
        type: UserActionTypes.GET_API_TOKEN,
        payload: data.api_token,
      });
    }
    dispatch({
      type: UserActionTypes.LOG_IN_USER,
      payload: data,
    });
    dispatch({
      type: UserActionTypes.GET_USER_DATA,
      payload: data,
    });
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

    // console.log('data :>> ', data);

    if (data.success) {
      ToastAndroid.showWithGravity(data.message, 3000, ToastAndroid.CENTER);
      dispatch({
        type: UserActionTypes.SEND_RESET_LINK_EMAIL,
        payload: data,
      });
    } else if (data.data.error) {
      ToastAndroid.showWithGravity(data.message, 3000, ToastAndroid.CENTER);
    }
  };
};

export const signUpUser = formData => {
  return async dispatch => {
    const response = await axios.post(`${config.API_URL}/register`, formData);
    const {data} = response;
    // console.log('data :>> ', data);
    if (data.success) {
      dispatch({
        type: UserActionTypes.LOG_IN_USER,
        payload: data,
      });
    }
  };
};

export const setApiToken = api_token => {
  return async dispatch => {
    await AsyncStorage.setItem('api_token', api_token);
    dispatch({
      type: UserActionTypes.GET_API_TOKEN,
      payload: api_token,
    });
  };
};

export const getApiToken = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('api_token');

    dispatch({
      type: UserActionTypes.GET_API_TOKEN,
      payload: token || null,
    });
  };
};

export const clearToken = () => {
  AsyncStorage.clear();

  return async dispatch => {
    // await AsyncStorage.setItem('token', '');
    // await AsyncStorage.setItem('userData', '');
    dispatch({
      type: UserActionTypes.GET_API_TOKEN,
      payload: null,
    });
  };
};

export const getUserData = () => {
  return async dispatch => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      dispatch({
        type: UserActionTypes.GET_USER_DATA,
        payload: JSON.parse(userData),
      });
    }
  };
};

export const signOutUser = api_token => {
  return async dispatch => {
    const response = await axios.get(
      `${config.API_URL}/logout?api_token=${api_token}`,
    );
    await AsyncStorage.clear();
    const {data} = response;
    if (data.success) {
      dispatch({
        type: UserActionTypes.GET_USER_DATA,
        payload: null,
      });
      dispatch({
        type: UserActionTypes.LOG_IN_USER,
        payload: null,
      });
      dispatch({
        type: UserActionTypes.GET_API_TOKEN,
        payload: null,
      });
      dispatch({
        type: UserActionTypes.SIGN_OUT_USER,
        payload: data,
      });
    }
  };
};
