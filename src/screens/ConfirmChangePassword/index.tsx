import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text, VStack } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import SettingsLayout from '../../components/Layouts/Settings';
import { Profile } from '../../models';
import AuthService from '../../services/auth.service';
import { AlertType, ShowAlert } from '../../utils/alerts';
import { passwordRegex } from '../../utils/password';

const schema = yup
  .object({
    password: yup.string().required('Contraseña requerida').matches(passwordRegex, {
      message: 'La contraseña debe tener al menos 8 caracteres, una letra y un número',
    }),
    confirm_password: yup
      .string()
      .required('Confirmar contraseña requerida')
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
  })
  .required();

interface ConfirmChangePasswordProps {
  route: any;
  navigation: any;
}
export default function ConfirmChangePassword({ route, navigation }: ConfirmChangePasswordProps) {
  const profile: Profile = useSelector((state: any) => state.profile.profile);
  const currentPassword = route.params?.currentPassword;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (!currentPassword) {
      ShowAlert('Error', 'No se pudo recuperar la contraseña', AlertType.ERROR);
      return;
    }
    try {
      await AuthService.restorePassword({
        userId: profile.userId,
        newPassword: data.password,
        code: currentPassword,
        passwordProvided: true,
      });
      ShowAlert('Éxito', 'Contraseña cambiada correctamente', AlertType.SUCCESS);
      navigation.navigate('Settings');
    } catch (error) {
      ShowAlert('Error', 'No se pudo recuperar la contraseña', AlertType.ERROR, error);
    }
  };

  return (
    <SettingsLayout
      title="Asignar nueva contraseña"
      description="Elige una nueva contraseña de seis caracteres con una combinación de
    mayúsculas, minúsculas y números.">
      <VStack flex={1} justifyContent={'center'} space={10}>
        <Box>
          <Text fontWeight={'bold'}>Nueva contraseña</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Contraseña"
                secureTextEntry
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text color={'red.500'}>{errors.password.message}</Text>}
        </Box>
        <Box>
          <Text fontWeight={'bold'}>Confirmar contraseña</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirmar contraseña"
                secureTextEntry
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirm_password"
          />
          {errors.confirm_password && <Text color={'red.500'}>{errors.confirm_password.message}</Text>}
        </Box>
      </VStack>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
        Continuar
      </Button>
    </SettingsLayout>
  );
}
