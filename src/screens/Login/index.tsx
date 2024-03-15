import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text, VStack } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import AuthLayout from '../../components/Layouts/Auth';
import { browserConfigs } from '../../lib/browserinapp';
import { dataToProfile } from '../../models';
import AsyncStorageService, { StorageKeys } from '../../services/asyncstorage';
import { axiosPublic } from '../../services/axios.service';
import { setSignedIn } from '../../slicers/auth';
import { setProfile } from '../../slicers/profile';
import { colors } from '../../theme/colors';
import { AlertType, ShowAlert } from '../../utils/alerts';

const schema = yup
  .object({
    username: yup.string().email('Correo electrónico inválido').required('Correo electrónico requerido'),
    password: yup.string().required('Contraseña requerida'),
  })
  .required();

export default function Login({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

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

      const response = await axiosPublic.post('/Auth/LoginXMPP', { ...data, userDevice: deviceInfo });

      dispatch(
        setProfile(
          dataToProfile({
            ...response.data.user_data,
            password: data.password,
          }),
        ),
      );

      if (response.data.challenge) {
        navigation.navigate('DeviceAlreadyLinked');
        return;
      }

      if (response.data.token) {
        console.warn('TOKEN: ', response.data.token);
        await AsyncStorageService.setItem(StorageKeys.AUTH_TOKEN, response.data.token);
      }

      dispatch(setSignedIn());
    } catch (error: any) {
      console.warn(error);
      if (error.response.data) {
        console.warn(error.response.data);
      }
      ShowAlert('Error', 'Correo electrónico o contraseña incorrectos', AlertType.ERROR);
    } finally {
      setLoading(false);
    }
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
    <AuthLayout title="Iniciar sesión" description="Ingresa tu correo electrónico y contraseña para continuar.">
      <VStack  justifyContent={'center'} flex={1} space={7}>
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
            name="username"
          />
          {errors.username && <Text color={colors.error}>{errors.username.message}</Text>}
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
      <Box>
        <VStack>
          <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }} isLoading={loading}>
            Iniciar sesión
          </Button>
          <Button onPress={goToRecoverPassword} style={{ marginTop: 10 }} colorScheme="ambermex" variant={'link'}>
            ¿Olvidaste tu contraseña?
          </Button>
        </VStack>

        <Text mt={5} textAlign={'center'}>
          Al continuar, aceptas los
          <Text color={colors.primary} onPress={() => goToRegister('terms')}>
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
    </AuthLayout>
  );
}
