import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, Button, Icon, Input, Text, VStack } from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';

export default function ChangePassword() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bloodType: '',
      allergies: '',
      diseases: '',
      medications: '',
      weight: '',
      height: '',
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
        <Avatar
          size={'xl'}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
        <Box>
          <Text>Grupo sanguíneo</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Grupo sanguíneo"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="bloodType"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.bloodType && <Text color={'red.500'}>{errors.bloodType.message}</Text>}
        </Box>

        <Box>
          <Text>Alergias</Text>
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
            name="allergies"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.allergies && <Text color={'red.500'}>{errors.allergies.message}</Text>}
        </Box>

        <Box>
          <Text>Enfermedades</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enfermedades"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="diseases"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.diseases && <Text color={'red.500'}>{errors.diseases.message}</Text>}
        </Box>

        <Box>
          <Text>Medicamentos</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Medicamentos"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="medications"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.medications && <Text color={'red.500'}>{errors.medications.message}</Text>}
        </Box>

        <Box>
          <Text>Peso</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Peso"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="weight"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.weight && <Text color={'red.500'}>{errors.weight.message}</Text>}
        </Box>

        <Box>
          <Text>Altura</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Altura"
                style={{ marginTop: 10 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="height"
            rules={{ required: 'Contraseña requerida', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
            defaultValue=""
          />
          {errors.height && <Text color={'red.500'}>{errors.height.message}</Text>}
        </Box>

        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
          Continuar
        </Button>
      </Box>
    </>
  );
}
