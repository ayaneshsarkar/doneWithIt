import { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import userAPI from '../services/user'
import authAPI from '../services/auth'
import useAuth from '../auth/useAuth';
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../components/forms'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const RegisterScreen = ({ navigation }) => {
  const { logIn } = useAuth()
  const [error, setError] = useState(null)

  const handleSubmit = async (userInfo, { resetForm }) => {
    const res = await userAPI.register(userInfo)

    if (!res.ok) {
      console.log('res', res.data.error)
      if (res.data) setError(res.data.error) 
      else {
        setError('An Unexpected error occured.')
        console.log(res)
      }
      return
    }

    const { data: authToken } = await authAPI.login(userInfo.email, userInfo.password)
    logIn(authToken)

    setError(null)
    resetForm()
  }

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
