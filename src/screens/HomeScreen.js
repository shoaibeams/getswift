import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
import NewScreen from './NewScreen';
import AcceptedScreen from './AcceptedScreen';
import ArchivedScreen from './ArchivedScreen';
import ProfileScreen from './ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../config/colors';

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.PRIMARY,
      }}>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Icon name="user-circle" type={'FontAwesome5'} />,
        }}
      />
      <Tab.Screen
        name="New"
        component={NewScreen}
        options={{
          tabBarIcon: () => <Icon name="history" type={'FontAwesome'} />,
        }}
      />
      <Tab.Screen
        name="Accepted"
        component={AcceptedScreen}
        options={{
          tabBarIcon: () => <Icon name="star" type={'FontAwesome'} />,
        }}
      />
      <Tab.Screen
        name="Archived"
        component={ArchivedScreen}
        options={{
          tabBarIcon: () => <Icon name="archive" type={'Entypo'} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
