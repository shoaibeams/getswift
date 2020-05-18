import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/auth/LoginScreen';
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {customHeader} from './config/ui';
import HomeScreen from './screens/HomeScreen';
import {getApiToken} from './redux/user/user.actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

const Routes = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const token = useSelector(state => state.userReducer.token);

  useEffect(() => {
    console.log('token :>> ', token);
    // AsyncStorage.clear();
    SplashScreen.show();
    if (!token) {
      dispatch(getApiToken());
    }
    SplashScreen.hide();

    if (token || token === null) {
      SplashScreen.hide();
    }
  }, [dispatch, token]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen
              name="Authentication"
              component={LoginScreen}
              options={customHeader()}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ResetPasswordScreen}
              options={customHeader()}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
