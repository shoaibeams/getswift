import React from 'react';
import NewScreen from './NewScreen';
import {createStackNavigator} from '@react-navigation/stack';
import JobScreen from './JobScreen';

const JobsScreen = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="New"
        component={NewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Job"
        component={JobScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default JobsScreen;
