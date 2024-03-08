import { createSlice } from '@reduxjs/toolkit';
import { AlertType, Profile } from '../models';
import { faker } from '@faker-js/faker';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null as Profile | null,
    alertType: AlertType.PERSONAL,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = {
        id: 1,
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dob: faker.date.past().toDateString(),
        address: faker.location.streetAddress(),
        image: faker.image.avatar(),
      }
    },
    setAlertType: (state, action) => {
      state.alertType = action.payload;
    }
  },
});

export const { setProfile, setAlertType } = profileSlice.actions;

export default profileSlice.reducer;
