import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, Button, Input, Text } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import Header from '../../components/Header';
import { Profile } from '../../models';

const schema = yup
  .object({
    bloodType: yup.string().required('El grupo sanguíneo es requerido'),
    allergies: yup.string().required('Las alergias son requeridas'),
    diseases: yup.string().required('Las enfermedades son requeridas'),
    medications: yup.string().required('Los medicamentos son requeridos'),
    weight: yup.string().required('El peso es requerido'),
    height: yup.string().required('La altura es requerida'),
  })
  .required();

export default function MedicalRecord() {
  const profile: Profile = useSelector((state: any) => state.profile.profile);
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
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('ConfirmChangePassword' as never);
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <Box alignItems={'center'} my={6}>
          <Avatar
            size={120}
            source={profile.image ? { uri: profile.image } : require('../../assets/images/user_placeholder.png')}
          />
          <Text fontWeight={'bold'} fontSize={18} textAlign={'center'}>
            {profile.name} {profile.lastName}
          </Text>
        </Box>
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
