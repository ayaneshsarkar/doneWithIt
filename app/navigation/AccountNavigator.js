// import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name='AccountPage'
      component={AccountScreen}
    />
    <Stack.Screen
      name='Messages'
      component={MessagesScreen}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
