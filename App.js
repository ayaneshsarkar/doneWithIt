import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import jwtDecode from 'jwt-decode';
import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage'

export default function App() {
  const [user, setUser] = useState(null)

  const restoreToken = async () => {
    const token = await authStorage.getToken()
    console.log('token', token)
    if (!token) return

    setUser(jwtDecode(token))
  }

  useEffect(() => {
    restoreToken()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        { user ? <AppNavigator /> : <AuthNavigator /> }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
