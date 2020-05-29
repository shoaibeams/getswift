import React, {useEffect} from 'react';
import {StyleSheet, Image, View, StatusBar, Text, Linking} from 'react-native';
import Button from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import imageLogo from '../../assets/images/logo.png';
import {useForm} from 'react-hook-form';
import {loginUser, setApiToken} from '../../redux/user/user.actions';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({navigation}) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer.user);

  const onSubmit = async (formData, e) => {
    const token = await messaging().getToken();
    formData.device_token = token;
    dispatch(loginUser(formData));
    reset(formData);
  };

  useEffect(() => {
    if (userData && userData.api_token) {
      dispatch(setApiToken(userData.api_token));
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
  }, [register, userData, navigation, dispatch, setValue, reset, getValues]);

  const handleEmailChange = email => {
    setValue('email', email.trim());
  };

  const handlePasswordChange = password => {
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
      <Button onPress={handleSubmit(onSubmit)}>SIGN IN</Button>
      <Text
        style={styles.centerText}
        onPress={() => navigation.push('ForgotPassword')}>
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
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  error: {
    color: 'red',
  },
  logo: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    resizeMode: 'contain',
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
