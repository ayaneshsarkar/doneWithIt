import { useState, useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';
import authApi from '../services/auth'
import Screen from '../components/Screen';
import { ErrorMessage, AppForm, AppFormField, SubmitButton } from '../components/forms'
import AuthContext from '../auth/context';
import authStorage from '../auth/storage'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LoginScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({ email, password }, { resetForm }) => {
    const res = await authApi.login(email, password )
    if (!res.ok) return setLoginFailed(true)
    
    setLoginFailed(false)
    resetForm()

    const user = jwtDecode(res.data)
    authContext.setUser(user)
    authStorage.storeToken(res.data)
  }

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo-red.png')} />
      <ErrorMessage error="Invalid email and/or password." visible={loginFailed} />
      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize='none'
          autoCorrent={false}
          icon='email'
          name='email'
          keyboardType='email-address'
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
        <SubmitButton title='Login' />
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

export default LoginScreen;
