import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, Input, Text, VStack } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import SettingsLayout from '../../components/Layouts/Settings';
import { MedicalData, Profile } from '../../models';
import ProfileService from '../../services/profile.service';
import { AlertType, ShowAlert } from '../../utils/alerts';
import { setMedicalData } from '../../slicers/profile';

const schema = yup
  .object({
    bloodType: yup.string(),
    allergies: yup.string(),
    ailments: yup.string(),
    medications: yup.string(),
    weight: yup.number(),
    height: yup.number(),
  })
  .required();

export default function MedicalRecord() {
  const profile: Profile = useSelector((state: any) => state.profile.profile);
  const dispatch = useDispatch();

  console.warn("PROFILE", profile.medicalData);
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bloodType: profile.medicalData?.bloodType ?? '',
      allergies: profile.medicalData?.allergies ?? '',
      ailments: profile.medicalData?.ailments ?? '',
      medications: profile.medicalData?.medications ?? '',
      weight: profile.medicalData?.weight ?? 0,
      height: profile.medicalData?.height ?? 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await ProfileService.setMedicalRecord(data);
      console.warn("RES", response.data);
      console.warn("DATA", data);
      
      
      dispatch(setMedicalData(data));
      ShowAlert('Éxito', 'Datos médicos guardados', AlertType.SUCCESS);
    } catch (error: any) {
      ShowAlert('Error', 'No se pudieron guardar los datos médicos', AlertType.ERROR, error);
    }
  };

  return (
    <SettingsLayout
      title="Fichatos médica"
      description="Completa tu información médica para que en caso de emergencia, los servicios de salud puedan atenderte de manera más eficiente.">
      <Box flex={1}>
        <Box alignItems={'center'} mb={6}>
          <Avatar
            size={120}
            source={
              profile.pictureUrl ? { uri: profile.pictureUrl } : require('../../assets/images/user_placeholder.png')
            }
          />
          <Text fontWeight={'bold'} fontSize={18} textAlign={'center'}>
            {profile.name} {profile.lastName}
          </Text>
        </Box>

        <VStack space={5}>
          <Box>
            <Text>Grupo sanguíneo</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input placeholder="Grupo sanguíneo" onBlur={onBlur} onChangeText={onChange} value={value} />
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
                <Input placeholder="Alergias" onBlur={onBlur} onChangeText={onChange} value={value} />
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
                <Input placeholder="Enfermedades" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="ailments"
            />
            {errors.ailments && <Text color={'red.500'}>{errors.ailments.message}</Text>}
          </Box>

          <Box>
            <Text>Medicamentos</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input placeholder="Medicamentos" onBlur={onBlur} onChangeText={onChange} value={value} />
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
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value?.toString()}
                  keyboardType="numeric"
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
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value?.toString()}
                  keyboardType="numeric"
                />
              )}
              name="height"
            />
            {errors.height && <Text color={'red.500'}>{errors.height.message}</Text>}
          </Box>
        </VStack>

        <Button mt={10} onPress={handleSubmit(onSubmit)}>
          Continuar
        </Button>
      </Box>
    </SettingsLayout>
  );
}
