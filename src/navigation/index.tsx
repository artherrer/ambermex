import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSignedIn } from '../slicers/auth';

// Auth Screens
import Auth from '../screens/Auth';
import Login from '../screens/Login';
import RecoverPassword from '../screens/RecoverPassword';
import DeviceAlreadyLinked from '../screens/DeviceAlreadyLinked';
import TransferDevice from '../screens/TransferDevice';
import RestorePassword from '../screens/RestorePassword';

// Dashboard Screens
import AddContact from '../screens/AddContact';
import AlertConversation from '../screens/AlertConversation';
import ChangePassword from '../screens/ChangePassword';
import ConfirmChangePassword from '../screens/ConfirmChangePassword';
import Conversation from '../screens/Conversation';
import CreateGroupChat from '../screens/CreateGroupChat';
import CreateIndividualChat from '../screens/CreateIndividualChat';
import Home from '../screens/Home';
import ImportContact from '../screens/ImportContact';
import MedicalRecord from '../screens/MedicalRecord';
import SetAddress from '../screens/SetAddress';
import Settings from '../screens/Settings';
import Reports from '../screens/Reports';
import ReportDetail from '../screens/ReportDetail';
import EmergencyContacts from '../screens/EmergencyContacts';

// Layouts
import Loader from '../components/Loader';
import { dataToProfile } from '../models';
import AsyncStorageService, { StorageKeys } from '../services/asyncstorage';
import { axiosPrivate } from '../services/axios.service';
import { setProfile } from '../slicers/profile';
import ProfileService from '../services/profile.service';
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
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="ReportDetail" component={ReportDetail} />
      <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
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
      const refreshToken = await AsyncStorageService.getItem(StorageKeys.REFRESH_TOKEN);
      if (token && refreshToken) {
        const { data } = await ProfileService.getProfile();
        dispatch(setProfile(dataToProfile(data.user)));
        dispatch(setSignedIn());
      } else {
        dispatch(setProfile(null));
        dispatch(setLoading(false));
      }
    }
    checkAuth().catch(console.error);
  }, []);

  if (authReducer.loading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {authReducer.signedIn && <Stack.Screen name="Dashboard" component={DashboardStack} />}
      {!authReducer.signedIn && (
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          <Stack.Screen name="DeviceAlreadyLinked" component={DeviceAlreadyLinked} />
          <Stack.Screen name="TransferDevice" component={TransferDevice} />
          <Stack.Screen name="RestorePassword" component={RestorePassword} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
