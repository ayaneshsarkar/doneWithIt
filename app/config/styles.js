import { Platform } from 'react-native-web';
import colors from './colors';

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: (Platform.OS === 'android' || Platform.OS === 'web') ? 'Roboto' : 'Avenir',
  },
};
