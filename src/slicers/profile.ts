import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '../models';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null as Profile | null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
