import React from 'react';
import { Box, Button, Icon, Image, Input, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { colors } from '../../theme/colors';
import { useDispatch } from 'react-redux';
import { setSignedIn } from '../../slicers/auth';
import { Linking, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { browserConfigs } from '../../lib/browserinapp';

const schema = yup
  .object({
    phoneNumber: yup.string().required('Número telefónico requerido'),
  })
  .required();

export default function RecoverPassword({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(setSignedIn());
  };

  const goBack = () => {
    navigation.goBack();
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
        <Text variant={'title'} fontSize={24} textAlign={'center'}>
          Recuperar contraseña
        </Text>
        <VStack width={300} space={3}>
          <Box>
            <Text>Número telefónico</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Número telefónico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && <Text color={colors.error}>{errors.phoneNumber.message}</Text>}
          </Box>
        </VStack>
        <VStack w={150}>
          <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
            Continuar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
