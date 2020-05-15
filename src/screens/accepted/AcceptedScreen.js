import React from 'react';
import SignatureScreen from './SignatureScreen';
import {createStackNavigator} from '@react-navigation/stack';
import CheckListScreen from './CheckListScreen';
import AcceptedJobsListScreen from './AcceptedJobsListScreen';

const AcceptedScreen = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AcceptedJobsList"
        component={AcceptedJobsListScreen}
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

export default AcceptedScreen;
