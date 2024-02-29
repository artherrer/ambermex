import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slicers/auth';
import profileReducer from '../slicers/profile';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export { store }
