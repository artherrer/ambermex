import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSignedIn } from '../slicers/auth';

// Auth Screens
import Auth from '../screens/Auth';
import Login from '../screens/Login';

// Dashboard Screens
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import ChangePassword from '../screens/ChangePassword';
import ConfirmChangePassword from '../screens/ConfirmChangePassword';
import SetAddress from '../screens/SetAddress';
import MedicalRecord from '../screens/MedicalRecord';
import AddContact from '../screens/AddContact';
import ImportContact from '../screens/ImportContact';
import Conversation from '../screens/Conversation';
import AlertConversation from '../screens/AlertConversation';
import CreateIndividualChat from '../screens/CreateIndividualChat';
import CreateGroupChat from '../screens/CreateGroupChat';

// Layouts
import Loader from '../components/Loader';
import { dataToProfile } from '../models';
import AsyncStorageService, { StorageKeys } from '../services/asyncstorage';
import { axiosPrivate } from '../services/axios.service';
import { setProfile } from '../slicers/profile';
import Header from '../components/Header';
// import NotificationDetail from '../screens/NotificationDetail';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ConfirmChangePassword" component={ConfirmChangePassword} />
      <Stack.Screen name="SetAddress" component={SetAddress} />
      <Stack.Screen name="MedicalRecord" component={MedicalRecord} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="ImportContact" component={ImportContact} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="AlertConversation" component={AlertConversation} />
      <Stack.Screen name="CreateIndividualChat" component={CreateIndividualChat} />
      <Stack.Screen name="CreateGroupChat" component={CreateGroupChat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Group>
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Group>
  );
}

export default function AppNavigator() {
  const authReducer = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorageService.getItem(StorageKeys.AUTH_TOKEN);
      if (token) {
        const { data } = await axiosPrivate.get('/me');
        const profile = dataToProfile(data);

        dispatch(setProfile(profile));
        dispatch(setSignedIn());
      } else {
        dispatch(setLoading(false));
      }
    }
    checkAuth();
  }, []);

  if (authReducer.loading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!authReducer.signedIn && <Stack.Screen name="Dashboard" component={DashboardStack} />}
      {/* {!authReducer.signedIn && (
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Group>
      )} */}
    </Stack.Navigator>
  );
}
