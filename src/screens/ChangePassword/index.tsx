import { Box, Button, Input, Text } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../components/Header';
import AuthService from '../../services/auth.service';
import { AlertType, ShowAlert } from '../../utils/alerts';
import SettingsLayout from '../../components/Layouts/Settings';

interface ChangePasswordProps {
  navigation: any;
}
export default function ChangePassword({ navigation }: ChangePasswordProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await AuthService.checkPassword(data.password);
      navigation.navigate('ConfirmChangePassword' as never, { currentPassword: data.password });
    } catch (error) {
      ShowAlert('Error', 'Contraseña incorrecta', AlertType.ERROR, error);
    }
  };

  const forgotPassword = async () => {
    ShowAlert(
      '¿Olvidaste tu contraseña?',
      'Para recuperar tu contraseña, comunícate con el soporte técnico',
      AlertType.INFO,
    );
  };

  return (
    <SettingsLayout
      title="Cambiar contraseña"
      description="Para crear una nueva contraseña escribe primero tu contraseña actual.">
      <Box justifyContent={'center'} flex={1} px={3}>
        <Box>
          <Text fontWeight={'bold'}>Contraseña actual</Text>
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
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.password && <Text color={'red.500'}>{errors.password.message}</Text>}
        </Box>
      </Box>

      <Box>
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
          Continuar
        </Button>
        <Button onPress={forgotPassword} style={{ marginTop: 10 }} variant={'link'}>
          ¿Olvidaste tu contraseña?
        </Button>
      </Box>
    </SettingsLayout>
  );
}
