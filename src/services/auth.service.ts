import { Login, RecoverPassword, RestorePassword, SendCode } from '../models';
import { signOut } from '../slicers/auth';
import { setProfile } from '../slicers/profile';
import { store } from '../store';
import AsyncStorageService, { StorageKeys } from './asyncstorage';
import { axiosPrivate, axiosPublic } from './axios.service';

export default class AuthService {
  static async logout() {
    await axiosPrivate.post('/logout');
    AsyncStorageService.removeItem(StorageKeys.AUTH_TOKEN);
    store.dispatch(signOut());
    store.dispatch(setProfile(null));
  }

  static async localLogout() {
    AsyncStorageService.removeItem(StorageKeys.AUTH_TOKEN);
    store.dispatch(signOut());
    store.dispatch(setProfile(null));
  }



  static login = (data: Login) => axiosPublic.post('/Auth/LoginXMPP', data);

  static recoverPassword = (data: RecoverPassword) => axiosPublic.post('/Auth/GetValidationCode', data);

  static restorePassword = (data: RestorePassword) => axiosPublic.post('/Auth/ChangePassword', data);

  static sendCode = (data: SendCode) => axiosPublic.post('/Auth/RecoverAccount', data);

  static checkPassword = (password: string) => axiosPrivate.post('/Auth/CheckPassword', { password });

  static refreshToken = async () => {
    const refreshToken = await AsyncStorageService.getItem(StorageKeys.REFRESH_TOKEN);
    return axiosPublic.get('/Auth/RefreshToken', { headers: { Authorization: `Bearer ${refreshToken}` } });
  }
}
