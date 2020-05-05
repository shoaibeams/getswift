import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Text,
  TextInput,
} from 'react-native';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import imageLogo from '../assets/images/logo.png';
import {useForm} from 'react-hook-form';
import {signUpUser} from '../redux/user/user.actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

const SignUpScreen = ({navigation}) => {
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

  const handleNameChange = name => {
    setValue('name', name);
  };

  const handleEmailChange = email => {
    setValue('email', email);
  };

  const handlePasswordChange = password => {
    setValue('password', password);
  };

  const handleConfirmPasswordChange = confirmPassword => {
    setValue('confirmPassword', confirmPassword);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />
      <Image source={imageLogo} style={styles.logo} />
      <CustomInput
        name="name"
        placeholder="Full Name"
        onChangeText={handleNameChange}
      />
      <Text style={styles.error}>{errors.name?.message}</Text>
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
      <CustomInput
        placeholder="Confirm Password"
        onChangeText={handleConfirmPasswordChange}
        name="confirmPassword"
        secureTextEntry
      />
      <Text style={styles.error}>{errors.confirmPassword?.message}</Text>
      <Button label="Sign Up" onPress={handleSubmit(onSubmit)} />
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

export default SignUpScreen;
