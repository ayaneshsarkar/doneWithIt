import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import expoPushTokensAPI from '../services/expoPushTokens'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const useNotifications = (notificationListener = () => {}) => {
  useEffect(() => {
    registerForPushNotifications()

    Notifications.addNotificationReceivedListener(notificationListener)
  }, [])

  const registerForPushNotifications = async () => {
    try {
      const { status: permission } = await Notifications.requestPermissionsAsync()
      if (permission !== 'granted') return
  
      const token = await Notifications.getExpoPushTokenAsync()
      expoPushTokensAPI.register(token)
    } catch (err) {
      console.log(err)
    }
  }
}

export default useNotifications