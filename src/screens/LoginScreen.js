import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Text,
  Alert,
  Linking,
} from 'react-native';
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
    // Alert.alert('Form Data', formData);
    console.log('formData', formData);
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (userData) {
      if (userData.error) {
        // Alert.alert('Error in useeffect');
        console.log('error');
        setError(userData.error);
      } else {
        Alert.alert('api_token in useeffect');
        // Alert.alert('api_token', userData.api_token);
        navigation.push('Home');
        AsyncStorage.setItem('api_token', userData.api_token);
      }
    }
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
  }, [register, userData, error, navigation, setValue]);

  const handleEmailChange = email => {
    setError('');
    setValue('email', email.trim());
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
      <Button label="SIGN IN" onPress={handleSubmit(onSubmit)} />
      <Text
        style={styles.centerText}
        onPress={() => navigation.push('ResetPassword')}>
        Forgot Password?
      </Text>
      <View style={styles.bottomTextView}>
        <Text>Flowerful Driver Production 1.0.0 </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('http://google.com')}>
          Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  error: {
    color: 'red',
  },
  logo: {
    // flex: 1,
    display: 'flex',
    width: '100%',
    // justifyContent: 'center',
    resizeMode: 'contain',
    //   // alignSelf: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  bottomTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
    textAlign: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

export default LoginScreen;
