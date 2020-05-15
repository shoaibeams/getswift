import React from 'react';
import {Icon} from 'native-base';
import AcceptedScreen from './accepted/AcceptedScreen';
import ArchivedScreen from './archived/ArchivedScreen';
import ProfileScreen from './profile/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../config/colors';
import JobsScreen from './new/JobsScreen';
import MapScreen from './accepted/MapScreen';

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.PRIMARY,
      }}>
      <Tab.Screen
        name="New"
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

      {/* <Tab.Screen
        name="Map"
        component={MapScreen}
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
      /> */}
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
