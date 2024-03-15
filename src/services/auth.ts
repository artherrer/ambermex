import { signOut } from '../slicers/auth';
import { setProfile } from '../slicers/profile';
import { store } from '../store';
import AsyncStorageService, { StorageKeys } from './asyncstorage';
import { axiosPrivate } from './axios.service';
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
}
