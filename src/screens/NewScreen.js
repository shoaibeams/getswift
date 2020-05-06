import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {StyleSheet} from 'react-native';
import {Container, StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';
import CustomCard from '../components/CustomCard';

import commonColor from '../native-base-theme/variables/commonColor';

const NewScreen = ({navigation}) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container>
        <CustomHeader>New Jobs</CustomHeader>
        <CustomCard>Go to My Account</CustomCard>
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
});

export default NewScreen;
