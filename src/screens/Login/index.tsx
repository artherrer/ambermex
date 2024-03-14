import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Icon, Image, Input, Text, VStack } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Linking, Platform, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { browserConfigs } from '../../lib/browserinapp';
import { dataToProfile } from '../../models';
import AsyncStorageService, { StorageKeys } from '../../services/asyncstorage';
import { axiosPublic } from '../../services/axios.service';
import { setSignedIn } from '../../slicers/auth';
import { setProfile } from '../../slicers/profile';
import { colors } from '../../theme/colors';

const schema = yup
  .object({
    email: yup.string().email('Correo electrónico inválido').required('Correo electrónico requerido'),
    password: yup.string().required('Contraseña requerida'),
  })
  .required();

export default function Login({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const deviceInfo = {
        os: Platform.OS,
        model: DeviceInfo.getDeviceId(),
        manufacturer: DeviceInfo.getBrand(),
        language: 'es-MX',
        serialNumber: await DeviceInfo.getUniqueId(),
        buildNumber: DeviceInfo.getBuildNumber(),
        codeName: await DeviceInfo.getDeviceName(),
      };

      console.warn(deviceInfo);

      const response = await axiosPublic.post('/Auth/LoginXMPP', { ...data, userDevice: deviceInfo });
      if (response.data.token) {
        console.warn('TOKEN: ', response.data.token);
        await AsyncStorageService.setItem(StorageKeys.AUTH_TOKEN, response.data.token);
      }
      dispatch(setProfile(dataToProfile(response.data)));
      dispatch(setSignedIn());
    } catch (error) {
      console.warn(error);
      Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goToRecoverPassword = () => {
    navigation.navigate('RecoverPassword' as never);
  };

  const goToRegister = async (redirectTo: 'terms' | 'privacy') => {
    let url = 'https://almxwebcentralus.azurewebsites.net/AccountWeb/UserRegister';
    if (redirectTo === 'terms') {
      url = 'https://www.botonambermex.com/terminos-de-uso';
    }
    if (redirectTo === 'privacy') {
      url = 'https://www.botonambermex.com/politicas-de-privacidad';
    }
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, browserConfigs);
      } else Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box safeArea flex={1} px={3} justifyContent={'space-evenly'}>
      <TouchableOpacity onPress={goBack}>
        <Icon as={MaterialIcons} name="arrow-back" size={30} color={colors.primary} />
      </TouchableOpacity>

      <Box alignItems={'center'} justifyContent={'space-evenly'} flex={1}>
        <Image source={require('../../assets/images/logo_with_text.png')} alt="logo" size={200} resizeMode="contain" />
        <VStack width={300} space={3}>
          <Box>
            <Text>Correo electrónico</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && <Text color={colors.error}>{errors.email.message}</Text>}
          </Box>
          <Box>
            <Text>Contraseña</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input placeholder="Contraseña" secureTextEntry onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="password"
            />
            {errors.password && <Text color={colors.error}>{errors.password.message}</Text>}
          </Box>
        </VStack>

        <VStack>
          <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
            Iniciar sesión
          </Button>
          <Button onPress={goToRecoverPassword} style={{ marginTop: 10 }} colorScheme="ambermex" variant={'link'}>
            ¿Olvidaste tu contraseña?
          </Button>
        </VStack>

        <Text style={[{ marginTop: 10, color: 'red.100' }]}>
          Al continuar, aceptas los
          <Text color={colors.primary} variant={'link'} onPress={() => goToRegister('terms')}>
            {' '}
            Términos y Condiciones{' '}
          </Text>
          y la
          <Text color={colors.primary} onPress={() => goToRegister('privacy')}>
            {' '}
            Política de Privacidad{' '}
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
