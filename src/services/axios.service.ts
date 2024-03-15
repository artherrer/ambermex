import axios from 'axios';
import AsyncStorageService, { StorageKeys } from './asyncstorage';
import { store } from '../store';
import { signOut } from '../slicers/auth';
import { setProfile } from '../slicers/profile';


export const BASE_URL = 'https://alertamxv2prodcentralus.azurewebsites.net';

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use(
  async config => {
    const token = await AsyncStorageService.getItem(StorageKeys.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosPrivate.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {

    console.warn(error);


    if (!error.response) {
      AsyncStorageService.removeItem(StorageKeys.AUTH_TOKEN);
      store.dispatch(signOut());
      store.dispatch(setProfile(null));
    }

    if (error.response?.status === 401) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      AsyncStorageService.removeItem(StorageKeys.AUTH_TOKEN);
      store.dispatch(signOut());
      store.dispatch(setProfile(null));
    } else {
      return Promise.reject(error);
    }
  },
);

export { axiosPublic, axiosPrivate };
