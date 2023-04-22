import { useState } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import userAPI from '../services/user';
import authAPI from '../services/auth';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from '../components/forms';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const RegisterScreen = ({ navigation }) => {
  const registerAPI = useApi(userAPI.register);
  const loginAPI = useApi(authAPI.login);

  const { logIn } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (userInfo, { resetForm }) => {
    const res = await registerAPI.request(userInfo);

    if (!res.ok) {
      if (res.data) setError(res.data.error);
      else {
        setError('An Unexpected error occured.');
        console.log(res);
      }
      return;
    }

    const { data: authToken } = await loginAPI.request(
      userInfo.email,
      userInfo.password
    );
    logIn(authToken);

    setError(null);
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo-red.png')} />
      <ErrorMessage error={error} visible={error ? true : false} />
      <AppForm
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize='none'
          autoCorrent={false}
          icon='account'
          name='name'
          placeholder='Name'
          textContentType='name'
        />
        <AppFormField
          autoCapitalize='none'
          autoCorrent={false}
          icon='email'
          name='email'
          keyboardType='default'
          placeholder='Email'
          textContentType='emailAddress'
        />
        <AppFormField
          autoCapitalize='none'
          autoCorrent={false}
          icon='lock'
          name='password'
          placeholder='Password'
          secureTextEntry
          textContentType='password'
        />
        <SubmitButton title='Register' />
        <ActivityIndicator
          animating={registerAPI.loading || loginAPI.loading}
          size='large'
          style={{ justifyContent: 'center', alignItems: 'center' }}
        />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
