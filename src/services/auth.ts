import AsyncStorageService, { StorageKeys } from './asyncstorage';
import store from '../store';
import { signOut } from '../slicers/auth';
import { setCustomer, setProfile } from '../slicers/profile';
import { axiosPrivate } from './axios.service';
export default class AuthService {
  static async logout() {
    await axiosPrivate.post('/logout');
    AsyncStorageService.removeItem(StorageKeys.AUTH_TOKEN);
    store.dispatch(signOut());
    store.dispatch(setCustomer(null));
    store.dispatch(setProfile(null));
  }

  static async localLogout() {
    AsyncStorageService.removeItem(StorageKeys.AUTH_TOKEN);
    store.dispatch(signOut());
    store.dispatch(setCustomer(null));
    store.dispatch(setProfile(null));
  }
}
