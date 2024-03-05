import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text } from 'native-base';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Header from '../../components/Header';

const schema = yup
  .object({
    name: yup.string().required('Nombre requerido'),
    phoneNumber: yup.string().required('Teléfono requerido'),
    gender: yup.string().required('Género requerido'),
  })
  .required();

export default function AddContact({ navigation, route }: any) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      gender: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (route.params?.contact) {
      console.warn(route.params?.contact);

      const { givenName, familyName, phoneNumbers } = route.params.contact;
      setValue('name', `${givenName} ${familyName}`);
      setValue('phoneNumber', phoneNumbers[0].number);
    }
  }, [route.params]);

  const goToImportContact = () => {
    navigation.navigate('ImportContact' as never);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('Settings' as never);
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <Box alignItems={'center'} mb={10}>
          <Text variant={'title'} my={3}>
            Añadir contacto de emergencia
          </Text>
          <Text textAlign={'center'}>
            Los contactos en esta lista serán notificados siempre que detones una alerta, sin importar el grupo en que
            lo hagas.
          </Text>
        </Box>
        <Box mb={3}>
          <Text>Nombre</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input placeholder="Nombre" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="name"
          />
          {errors.name && <Text color={'red.500'}>{errors.name.message}</Text>}
        </Box>
        <Box mb={3}>
          <Text>Teléfono</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input placeholder="Alergias" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && <Text color={'red.500'}>{errors.phoneNumber.message}</Text>}
        </Box>
        <Box mb={3}>
          <Text>Género</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input placeholder="Género" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="gender"
          />
          {errors.gender && <Text color={'red.500'}>{errors.gender.message}</Text>}
        </Box>
        <Button onPress={goToImportContact} variant={'link'}>
          Importar contacto
        </Button>
        <Button onPress={handleSubmit(onSubmit)} mt={6}>
          Guardar
        </Button>
      </Box>
    </>
  );
}
