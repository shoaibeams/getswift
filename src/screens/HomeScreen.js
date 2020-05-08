import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import AcceptedScreen from './AcceptedScreen';
import ArchivedScreen from './ArchivedScreen';
import ProfileScreen from './ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../config/colors';
import JobsScreen from './JobsScreen';

const HomeScreen = ({route}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.PRIMARY,
      }}>
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="clock-outline"
              type={'MaterialCommunityIcons'}
              focused={focused}
              style={{color}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Accepted"
        component={AcceptedScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="star"
              type={'FontAwesome'}
              focused={focused}
              style={{color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Archived"
        component={ArchivedScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="archive"
              type={'Entypo'}
              focused={focused}
              style={{color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              focused={focused}
              name="user-circle"
              type={'FontAwesome5'}
              style={{color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
