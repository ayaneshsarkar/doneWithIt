import apiClient from "./client";

const register = pushToken => apiClient.post('/expoPushTokens', { token: pushToken?.data || '' })

export default {
  register
}