import { createSlice } from '@reduxjs/toolkit';
import { AlertType, Profile } from '../models';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null as Profile | null,
    alertType: AlertType.PERSONAL,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAlertType: (state, action) => {
      state.alertType = action.payload;
    }
  },
});

export const { setProfile, setAlertType } = profileSlice.actions;

export default profileSlice.reducer;
