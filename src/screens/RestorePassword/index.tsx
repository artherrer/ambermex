import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import * as yup from 'yup';
import AuthLayout from '../../components/Layouts/Auth';
import { axiosPublic } from '../../services/axios.service';
import { colors } from '../../theme/colors';
import { AlertType, ShowAlert } from '../../utils/alerts';

const schema = yup
  .object({
    password: yup
      .string()
      .required('Contraseña requerida')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'La contraseña debe tener al menos 8 caracteres, una letra y un número',
      }),
    confirm_password: yup
      .string()
      .required('Confirmar contraseña requerida')
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
    code: yup.string().required('Código de verificación requerido').length(6, 'Código de verificación inválido'),
  })
  .required();

interface RestorePasswordProps {
  navigation: any;
  route: any;
}
export default function RestorePassword({ navigation, route }: RestorePasswordProps) {
  const userId = route.params.userId;
  const phone = route.params.phone;

  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
      code: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    if (!userId) return Alert.alert('Error', 'No se pudo recuperar la contraseña');
    try {
      await axiosPublic.post('/Auth/ChangePassword', { userId, newPassword: data.password, code: data.code });
      ShowAlert('Éxito', 'Contraseña cambiada correctamente', AlertType.SUCCESS);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      ShowAlert('Error', 'No se pudo recuperar la contraseña', AlertType.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const sendCode = async () => {
    if (!phone) return ShowAlert('Error', 'No se pudo enviar el código de verificación', AlertType.ERROR);
    try {
      await axiosPublic.post('/Auth/RecoverAccount', { identificationString: phone });
      ShowAlert('Éxito', 'Código de verificación enviado', AlertType.SUCCESS);
    } catch (error) {
      console.error(error);
      ShowAlert('Error', 'No se pudo enviar el código de verificación', AlertType.ERROR);
    }
  };

  return (
    <AuthLayout
      title="Reestablecer contraseña"
      description="Elige una nueva contraseña de seis caracteres con una combinación de mayúsculas, minúsculas y números.">
      <VStack justifyContent={'center'} flex={1} space={7}>
        <Box>
          <Text>Código de verificación</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Código de verificación"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            )}
            name="code"
          />
          {errors.code && <Text color={colors.error}>{errors.code.message}</Text>}
        </Box>
        <Box>
          <Text>Nueva contraseña</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nueva contraseña"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
            name="password"
          />
          {errors.password && <Text color={colors.error}>{errors.password.message}</Text>}
        </Box>
        <Box>
          <Text>Confirmar contraseña</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirmar contraseña"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
            name="confirm_password"
          />
          {errors.confirm_password && <Text color={colors.error}>{errors.confirm_password.message}</Text>}
        </Box>
      </VStack>
      <VStack>
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }} isLoading={loading}>
          Continuar
        </Button>
        <Button onPress={sendCode} style={{ marginTop: 10 }} colorScheme="ambermex" variant={'link'}>
          Enviar código de nuevo
        </Button>
      </VStack>
    </AuthLayout>
  );
}
