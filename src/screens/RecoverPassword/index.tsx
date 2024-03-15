import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import AuthLayout from '../../components/Layouts/Auth';
import { axiosPublic } from '../../services/axios.service';
import { colors } from '../../theme/colors';
import { AlertType, ShowAlert } from '../../utils/alerts';

const schema = yup
  .object({
    phone: yup.string().required('Número telefónico requerido'),
  })
  .required();

interface RecoverPasswordProps {
  navigation: any;
}
export default function RecoverPassword({ navigation }: RecoverPasswordProps) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post('/Auth/GetValidationCode', { phone: data.phone });
      navigation.navigate('RestorePassword', { userId: response.data.userId, phone: data.phone });
    } catch (error) {
      console.error(error);
      ShowAlert('Error', 'No se pudo recuperar la contraseña', AlertType.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Recuperar contraseña"
      description="Para recuperar tu contraseña ingresa el número de teléfono con que te registraste.">
      <VStack space={3} justifyContent={'center'} flex={1}>
        <Box>
          <Text>Número telefónico</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Número telefónico"
                keyboardType="phone-pad"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
          />
          {errors.phone && <Text color={colors.error}>{errors.phone.message}</Text>}
        </Box>
      </VStack>
      <VStack>
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }} isLoading={loading}>
          Continuar
        </Button>
      </VStack>
    </AuthLayout>
  );
}
