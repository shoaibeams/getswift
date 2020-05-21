import React, {useEffect} from 'react';
import {View, Text, BackHandler, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Button from '../../components/Button';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Container, StyleProvider, Icon} from 'native-base';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
import {getUserData, signOutUser} from '../../redux/user/user.actions';
import CustomHeader from '../../components/CustomHeader';
import colors from '../../config/colors';
import GlobalStyles from '../../config/styles';

const ProfileScreen = () => {
  const userData = useSelector(state => state.userReducer.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      dispatch(getUserData());
    }
    console.log('userData', userData);

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [userData, dispatch]);

  const handleBackButtonClick = () => {
    BackHandler.exitApp();
    return true;
  };

  let name, id, thumb, avg_rating;
  if (userData) {
    name = userData.name;
    id = userData.id;
    avg_rating = userData.avg_rating;
    const userMedia = userData.media.slice(-1);
    thumb = userMedia[0].thumb;
  }

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container>
        <CustomHeader>Profile</CustomHeader>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.profileAvatar}>
              <Image
                style={styles.avatar}
                source={{
                  uri: thumb,
                }}
              />
              <Text style={styles.statusText}>Status: Online</Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={GlobalStyles.txtBg}>{name}</Text>
              <Text style={GlobalStyles.txtMd}>
                id: {id}{' '}
                <Icon
                  name="car-alt"
                  type={'FontAwesome5'}
                  style={GlobalStyles.txtMd}
                />
              </Text>
              <Text style={GlobalStyles.txtMd}>
                Rating: {avg_rating ? avg_rating.slice(0, 1) : ''}/5
              </Text>
              <Text style={GlobalStyles.linkText}>Change Password</Text>
              <Text style={GlobalStyles.linkText}>Account Setting</Text>
              <Text style={GlobalStyles.linkText}>Notification Setting</Text>
              <Text style={GlobalStyles.linkText}>Location Setting</Text>
            </View>
          </View>
          <Button onPress={() => dispatch(signOutUser(userData.api_token))}>
            SIGN OUT
          </Button>
          <Text style={styles.btnBelowText}>
            officia aperiam Mollitia, optio{' '}
          </Text>
        </View>
      </Container>
    </StyleProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  profileAvatar: {
    alignItems: 'center',
  },
  statusText: {
    paddingTop: 10,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  profileDetails: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    margin: 10,
    borderWidth: 5,
    borderColor: colors.PRIMARY,
  },
  btnBelowText: {
    textAlign: 'right',
  },
});

export default ProfileScreen;
