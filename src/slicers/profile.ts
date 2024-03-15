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
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      } else {
        state.profile = action.payload;
      }
    },
    setAlertType: (state, action) => {
      state.alertType = action.payload;
    },

    setMedicalData: (state, action) => {
      if (state.profile) {
        state.profile.medicalData = { ...state.profile.medicalData, ...action.payload };
      }
    },

    setPrimaryAddress: (state, action) => {
      if (state.profile) {
        state.profile.primaryAddress = { ...state.profile.primaryAddress, ...action.payload };
      }
    },

    setEmergencyContacts: (state, action) => {
      if (state.profile) {
        state.profile.emergencyContacts = action.payload;
      }
    },

    addEmergencyContact: (state, action) => {
      if (state.profile) {
        state.profile.emergencyContacts.push(action.payload);
      }
    },

    removeEmergencyContact: (state, action) => {
      if (state.profile) {
        state.profile.emergencyContacts = state.profile.emergencyContacts.filter(
          (contact) => contact.phone !== action.payload.phone,
        );
      }
    },
  },
});

export const { setProfile, setAlertType, setMedicalData, addEmergencyContact, removeEmergencyContact, setEmergencyContacts } = profileSlice.actions;

export default profileSlice.reducer;
