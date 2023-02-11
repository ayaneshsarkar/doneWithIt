// import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingsScreen from '../screens/ListingsScreen';

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      presentation: 'modal',
      animation: 'slide_from_bottom',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}
  >
    <Stack.Screen
      name='Listings'
      component={ListingsScreen}
    />
    <Stack.Screen
      name='ListingDetails'
      component={ListingDetailsScreen}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
