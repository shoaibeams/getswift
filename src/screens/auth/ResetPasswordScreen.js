import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar, Text, ToastAndroid} from 'react-native';
import Button from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {
  sendResetLinkEmail,
  clearState,
  clearResetLinkEmail,
} from '../../redux/user/user.actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

const ResetPasswordScreen = ({navigation}) => {
  const {register, handleSubmit, setValue, errors} = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const resetPassword = useSelector(
    state => state.userReducer.resetPassword,
    shallowEqual,
  );

  const onSubmit = async email => {
    setError('');
    dispatch(sendResetLinkEmail(email));
  };

  useEffect(() => {
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

    console.log('state', resetPassword);
    if (resetPassword) {
      if (resetPassword.data.error) {
        ToastAndroid.showWithGravity(
          resetPassword.message,
          3000,
          ToastAndroid.CENTER,
        );
        setError(resetPassword.message);
      } else {
        ToastAndroid.showWithGravity(
          resetPassword.message,
          3000,
          ToastAndroid.CENTER,
        );
        dispatch(clearResetLinkEmail());
        navigation.pop();
      }
    }
  }, [register, navigation, resetPassword, dispatch]);

  const handleEmailChange = email => {
    setValue('email', email.trim());
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />

      <CustomInput
        name="email"
        placeholder="Email Address"
        onChangeText={handleEmailChange}
      />
      <Text style={styles.error}>{errors.email?.message}</Text>
      <Text style={styles.infoText}>
        You'll receive an email with a forgotten password link. Open the email
        on your phone and click the link to reset your password.
      </Text>

      <Button onPress={handleSubmit(onSubmit)}>RESET PASSWORD</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  infoText: {
    fontSize: 30,
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
});

export default ResetPasswordScreen;
