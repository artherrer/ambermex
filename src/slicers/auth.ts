import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signedIn: false,
    loading: true,
  },
  reducers: {
    setSignedIn: state => {
      state.signedIn = true;
      state.loading = false;
    },
    signOut: state => {
      state.signedIn = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSignedIn, signOut, setLoading } = authSlice.actions;

export default authSlice.reducer;
