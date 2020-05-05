import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, StatusBar, Text} from 'react-native';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import imageLogo from '../assets/images/logo.png';
import {useForm} from 'react-hook-form';
import {loginUser} from '../redux/user/user.actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({navigation}) => {
  const {register, handleSubmit, setValue, errors} = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer.user, shallowEqual);

  const onSubmit = async formData => {
    setError('');
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    register(
      {name: 'password'},
      {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be 6 characters long',
        },
      },
    );
    register(
      {name: 'email'},
      {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    );
    if (userData) {
      if (userData.error) {
        setError(userData.error);
      } else {
        setValue('email', '');
        setValue('password', '');
        navigation.navigate('Home');
        AsyncStorage.setItem('api_token', userData.api_token);
      }
    }
  }, [register, userData, error, navigation, setValue]);

  const handleEmailChange = email => {
    setError('');
    setValue('email', email);
  };

  const handlePasswordChange = password => {
    setError('');
    setValue('password', password);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />
      <Image source={imageLogo} style={styles.logo} />

      <CustomInput
        name="email"
        placeholder="Email"
        onChangeText={handleEmailChange}
      />
      <Text style={styles.error}>{errors.email?.message}</Text>
      <CustomInput
        placeholder="Password"
        onChangeText={handlePasswordChange}
        name="password"
        secureTextEntry
      />
      <Text style={styles.error}>{errors.password?.message}</Text>
      <Text style={styles.error}>{error}</Text>
      <Button label="Login" onPress={handleSubmit(onSubmit)} />
      <Button label="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  error: {
    color: 'red',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

export default LoginScreen;
