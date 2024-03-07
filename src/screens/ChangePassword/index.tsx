import { Box, Button, Input, Text } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../components/Header';

export default function ChangePassword({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('ConfirmChangePassword' as never);
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <Box alignItems={'center'} mb={10}>
          <Text variant={'title'} my={3}>
            Cambiar contraseña
          </Text>
          <Text textAlign={'center'}>Para crear una nueva contraseña escribe primero tu contraseña actual.</Text>
        </Box>
        <Box px={3} mt={6}>
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

        <Button onPress={() => {}} style={{ marginTop: 10 }} variant={'link'}>
          ¿Olvidaste tu contraseña?
        </Button>

        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
          Continuar
        </Button>
      </Box>
    </>
  );
}
