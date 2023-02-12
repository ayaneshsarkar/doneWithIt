import { StyleSheet, View } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import colors from '../config/colors'
import Text from './AppText/AppText'
import Constants from 'expo-constants'

const OfflineNotice = () => {
  const netInfo = useNetInfo()

  if (netInfo.type !== 'unknown' && !netInfo.isInternetReachable) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection.</Text>
      </View>
    )
  }

  return <></>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: Constants.statusBarHeight,
    width: '100%',
    zIndex: 1,
    elevation: 1
  },
  text: {
    color: colors.white
  }
})

export default OfflineNotice