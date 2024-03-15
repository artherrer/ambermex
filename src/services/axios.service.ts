import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorageService, { StorageKeys } from './asyncstorage';
import { store } from '../store';
import { signOut } from '../slicers/auth';
import { setProfile } from '../slicers/profile';
import AuthService from './auth.service';

export const BASE_URL = 'https://alertamxv2prodcentralus.azurewebsites.net';

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

axiosPrivate.interceptors.request.use(
  async config => {
    const token = await AsyncStorageService.getItem(StorageKeys.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await AuthService.refreshToken();
          AsyncStorageService.setItem(StorageKeys.AUTH_TOKEN, response.data.token);
          AsyncStorageService.setItem(StorageKeys.REFRESH_TOKEN, response.data.refresh);

          onRefreshed(response.data.token);
          originalRequest.headers!.Authorization = 'Bearer ' + response.data.token;
          originalRequest._retry = true;
          return axiosPrivate(originalRequest);
        } catch (error) {
          AsyncStorageService.removeItem(StorageKeys.AUTH_TOKEN);
          AsyncStorageService.removeItem(StorageKeys.REFRESH_TOKEN);
          store.dispatch(signOut());
          store.dispatch(setProfile(null));
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers!.Authorization = 'Bearer ' + token;
            resolve(axiosPrivate(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export { axiosPublic, axiosPrivate };
