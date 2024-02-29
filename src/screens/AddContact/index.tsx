import { useNavigation } from '@react-navigation/native';
import { Box, Input, Text, Button } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../components/Header';

export default function AddContact() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      gender: '',
    },
  });

  const goToImportContact = () => {
    navigation.navigate('ImportContact' as never);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('MedicalRecord' as never);
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <Text textAlign={'center'}>
          Los contactos en esta lista serán notificados siempre que detones una alerta, sin importar el grupo en que lo
          hagas.
        </Text>
        <Text fontWeight={'bold'}>Añadir contacto de emergencia</Text>
        <Button onPress={goToImportContact} variant={'link'}>
          Importar contacto
        </Button>
        <Box>
          <Text>Nombre</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nombre"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            rules={{ required: 'Nombre requerido', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.name && <Text color={'red.500'}>{errors.name.message}</Text>}
        </Box>
        <Box>
          <Text>Teléfono</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Alergias"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phoneNumber"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.phoneNumber && <Text color={'red.500'}>{errors.phoneNumber.message}</Text>}
        </Box>
        <Box>
          <Text>Género</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Género"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="gender"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.gender && <Text color={'red.500'}>{errors.gender.message}</Text>}
        </Box>
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
          Guardar
        </Button>
      </Box>
    </>
  );
}
