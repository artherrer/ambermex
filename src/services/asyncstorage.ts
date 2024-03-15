import AsyncStorage from '@react-native-async-storage/async-storage';
enum StorageKeys {
  AUTH_TOKEN = 'auth_token',
  AUTH_TOKEN_REFRESH = 'auth_token_refresh',
  DEVICE_ID = 'device_id',
  ONE_SIGNAL_ID = 'one_signal_id',
  FINGERPRINT = 'fingerprint',
  USER_ID = 'user_id',
  LANGUAGE = 'language',
  PREVIOUS_LOGIN = 'previous_login',
  CUSTOMER_ID = 'customer_id',
}
export default class AsyncStorageService {
  static async setItem(key: StorageKeys, value: string) {
    try {
      await AsyncStorage.setItem(key.toString(), value);
    } catch (error) {
      console.error(error);
    }
  }

  static async getItem(key: StorageKeys) {
    try {
      return await AsyncStorage.getItem(key.toString());
    } catch (error) {
      console.error(error);
    }
  }

  static async removeItem(key: StorageKeys) {
    try {
      await AsyncStorage.removeItem(key.toString());
    } catch (error) {
      console.error(error);
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }
}

export { StorageKeys };
