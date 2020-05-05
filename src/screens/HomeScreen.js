import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {StyleSheet, View, StatusBar} from 'react-native';
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';

const HomeScreen = ({navigation}) => {
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
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            // onPress={() => navigation.toggleDrawer()}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>HomeScreen</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Card>
          <CardItem>
            <Body>
              <Text>Find all the orders here.</Text>
            </Body>
          </CardItem>
        </Card>
        <Button
          full
          rounded
          dark
          style={{marginTop: 10}}
          // onPress={() => this.props.navigation.navigate('Chat')}
        >
          <Text>Track Order</Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={{marginTop: 10}}
          // onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Text>Go To My Account</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
});

export default HomeScreen;
