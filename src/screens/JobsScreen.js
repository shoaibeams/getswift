import React from 'react';
import NewScreen from './NewScreen';
import SignatureScreen from './SignatureScreen';
import {createStackNavigator} from '@react-navigation/stack';
import JobScreen from './JobScreen';
import CheckListScreen from './CheckListScreen';

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
      <Stack.Screen
        name="CheckList"
        component={CheckListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signature"
        component={SignatureScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default JobsScreen;
