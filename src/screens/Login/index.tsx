import React from 'react';
import { Box, Button, Image, Input, Text } from 'native-base';
import { Controller, useForm } from 'react-hook-form';

export default function Auth() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box safeArea px={6} flex={1}>
      <Image source={require('../../assets/images/logo_with_text.png')} alt="logo" width={200} height={200} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        rules={{
          required: 'Correo electrónico requerido',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Correo electrónico inválido' },
        }}
        defaultValue=""
      />
      {errors.email && <Text style={{ color: 'red.100' }}>{errors.email.message}</Text>}
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
        rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 6 caracteres' } }}
        defaultValue=""
      />
      {errors.password && <Text style={{ color: 'red.100' }}>{errors.password.message}</Text>}
      <Button onPress={() => {}} style={{ marginTop: 10 }} colorScheme="ambermex" variant={'link'}>
        ¿Olvidaste tu contraseña?
      </Button>
      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
        Iniciar sesión
      </Button>

      <Text style={[{ marginTop: 10, color: 'red.100' }]}>
        Al continuar, aceptas los
        <Text style={[{ color: 'ambermex.500' }]}> Términos y Condiciones </Text>y la
        <Text style={[{ color: 'ambermex.500' }]}> Política de Privacidad </Text>
      </Text>
    </Box>
  );
}
