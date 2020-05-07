import React, {useEffect} from 'react';
import {View, Text, BackHandler, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Button from '../components/Button';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Container, StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import {
  getUserData,
  signOutUser,
  setApiToken,
  clearToken,
} from '../redux/user/user.actions';
import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../components/CustomHeader';

const ProfileScreen = ({navigation}) => {
  const userData = useSelector(
    state => state.userReducer.userData,
    shallowEqual,
  );
  const signOutResponse = useSelector(
    state => state.userReducer.signOutResponse,
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    dispatch(getUserData());

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [userData, dispatch, signOutResponse]);

  const handleBackButtonClick = () => {
    BackHandler.exitApp();
    return true;
  };

  const handleSignOut = async () => {
    dispatch(clearToken());
  };

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container>
        <CustomHeader>Profile</CustomHeader>
        <View style={styles.profileContainer}>
          <View style={styles.profileAvatarContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </View>
          <View style={styles.profileDetailsContainer}>
            <Text>Name</Text>
            <Text>Id</Text>
            <Text>Rating</Text>
          </View>
        </View>
        <Button onPress={handleSignOut}>SIGN OUT</Button>
      </Container>
    </StyleProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
});

export default ProfileScreen;
