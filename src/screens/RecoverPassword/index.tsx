import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, HStack, Input, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import AuthLayout from '../../components/Layouts/Auth';
import { axiosPublic } from '../../services/axios.service';
import { colors } from '../../theme/colors';
import { AlertType, ShowAlert } from '../../utils/alerts';
import AuthService from '../../services/auth.service';
import { RecoverPassword } from '../../models';
import CountryCode from '../../components/CountryCode';
import MaskInput from 'react-native-mask-input';

const schema = yup
  .object({
    phone: yup.string().required('Número telefónico requerido').min(10, 'Número telefónico inválido'),
    country_code: yup.string().required('Código de país requerido'),
  })
  .required();

interface RecoverPasswordProps {
  navigation: any;
}
export default function RecoverPasswordScreen({ navigation }: RecoverPasswordProps) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<any>(null);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      phone: '',
      country_code: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload: RecoverPassword = {
        phone: data.country_code + data.phone,
      };
      
      const response = await AuthService.recoverPassword(payload);
      navigation.navigate('RestorePassword', { userId: response.data.userId, phone: payload.phone });
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
        <HStack>
          <HStack space={3} flex={1}>
            <Box>
              <CountryCode
                onSelected={option => {
                  setValue('country_code', option.value);
                }}
              />
              {errors.country_code && <Text color={'red.500'}>{errors.country_code.message}</Text>}
            </Box>
            <Box flex={1}>
              <Text>Teléfono</Text>
              <MaskInput
                placeholder="(000) 000 0000"
                keyboardType="numeric"
                value={phone}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  fontSize: 12,
                  paddingBottom: 7,
                  paddingTop: 8,
                }}
                onChangeText={(masked, unmasked) => {
                  setPhone(masked);
                  setValue('phone', unmasked);
                }}
                mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              />
              {errors.phone && <Text color={'red.500'}>{errors.phone.message}</Text>}
            </Box>
          </HStack>
        </HStack>
      </VStack>
      <VStack>
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }} isLoading={loading}>
          Continuar
        </Button>
      </VStack>
    </AuthLayout>
  );
}
