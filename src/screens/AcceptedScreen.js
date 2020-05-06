import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Title,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  StyleProvider,
} from 'native-base';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import CustomHeader from '../components/CustomHeader';

const AcceptedScreen = ({navigation}) => {
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
        <CustomHeader>Accepted Jobs</CustomHeader>
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

export default AcceptedScreen;
