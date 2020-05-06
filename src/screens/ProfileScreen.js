import React, {useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {StyleSheet} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {Container, StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import CustomHeader from '../components/CustomHeader';

const ProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state.userReducer.user, shallowEqual);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    console.log('userData', userData);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [userData]);

  const handleBackButtonClick = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container>
        <CustomHeader>Profile</CustomHeader>
        <View style={styles.profileContainer}>
          <View style={styles.profileAvatarContainer} />
          <View style={styles.profileDetailsContainer}>
            <Text>Name</Text>
            <Text>Id</Text>
            <Text>Rating</Text>
          </View>
        </View>
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
  },
});

export default ProfileScreen;
