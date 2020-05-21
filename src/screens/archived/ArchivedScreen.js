import React, {useEffect} from 'react';
import {BackHandler, View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Container, StyleProvider} from 'native-base';
import CustomHeader from '../../components/CustomHeader';
import GlobalStyles from '../../config/styles';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

const ArchivedScreen = ({navigation}) => {
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
        <CustomHeader>Archived</CustomHeader>
        <View style={styles.jobsContainer}>
          <View style={styles.jobsContainer}>
            <View style={GlobalStyles.centerText}>
              <Text>No archived jobs yet.</Text>
            </View>
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
  jobsContainer: {
    flex: 1,
  },
});

export default ArchivedScreen;
