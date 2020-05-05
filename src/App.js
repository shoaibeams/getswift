import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import store from './redux/store';
import AsyncStorage from '@react-native-community/async-storage';
import SideBar from './components/SideBar';
import colors from './config/colors';
import {customHeader} from './config/ui';

const App = () => {
  const Stack = createStackNavigator();
  // const Drawer = createDrawerNavigator();
  const [token, setToken] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
    AsyncStorage.clear();
    async function getToken() {
      const token = await AsyncStorage.getItem('api_token');
      console.log('token :>> ', token);
      setToken(token);
    }
    getToken();
  }, [token]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {!token && (
            <>
              <Stack.Screen
                name="Authentication"
                component={LoginScreen}
                options={customHeader()}
              />

              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={customHeader()}
              />
            </>
          )}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerLeft: null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
