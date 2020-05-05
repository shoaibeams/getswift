import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import {useForm} from 'react-hook-form';
import {signUpUser} from '../redux/user/user.actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

const ResetPasswordScreen = ({navigation}) => {
  const {register, handleSubmit, setValue, errors, getValues} = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer.user, shallowEqual);

  const onSubmit = async formData => {
    setError('');
    dispatch(signUpUser(formData));
  };

  useEffect(() => {
    register(
      {name: 'name'},
      {
        required: 'Full Name is required',
        minLength: {
          value: 6,
          message: 'Name must be 6 characters long',
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
      {name: 'confirmPassword'},
      {
        required: 'Confirm Password is required',
        minLength: {
          value: 6,
          message: 'Password must be 6 characters long',
        },
        validate: value => {
          if (value === getValues().password) {
            return true;
          } else {
            return 'The passwords do not match';
          }
        },
      },
    );
    console.log('state', userData);
    if (userData) {
      console.log('object 1');
      if (userData.error) {
        setError(userData.error);
      } else {
        console.log('object 2');
        navigation.navigate('Login');
      }
    }
  }, [register, getValues, navigation, userData]);

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
      <Text style={styles.infoText}>
        You'll receive an email with a forgotten password link. Open the email
        on your phone and click the link to reset your password.
      </Text>
      <Text style={styles.error}>{errors.email?.message}</Text>

      <Button label="RESET PASSWORD" onPress={handleSubmit(onSubmit)} />
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
});

export default ResetPasswordScreen;
