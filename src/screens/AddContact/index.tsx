import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SettingsLayout from '../../components/Layouts/Settings';
import EmergencyContactService from '../../services/emergencyContacts.service';
import { AlertType, ShowAlert } from '../../utils/alerts';
import { useDispatch } from 'react-redux';
import { addEmergencyContact } from '../../slicers/profile';

const schema = yup
  .object({
    name: yup.string().required('Nombre requerido'),
    phone: yup.string().required('Teléfono requerido'),
    gender: yup.string().required('Género requerido'),
  })
  .required();

export default function AddContact({ navigation, route }: any) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      gender: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (route.params?.contact) {
      const { givenName, familyName, phoneNumbers } = route.params.contact;
      setValue('name', `${givenName} ${familyName}`);
      setValue('phone', phoneNumbers[0].number);
    }
  }, [route.params]);

  const goToImportContact = () => {
    navigation.navigate('ImportContact' as never);
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const response = await EmergencyContactService.addEmergencyContact(data);

      if (response.data.contactsAdded.length > 0) {
        ShowAlert('Éxito', 'Contacto de emergencia guardado', AlertType.SUCCESS);
        dispatch(addEmergencyContact(response.data.contactsAdded[0]));
        navigation.navigate('EmergencyContacts');
      } else {
        ShowAlert('Error', 'No se pudo guardar el contacto de emergencia', AlertType.ERROR);
      }
    } catch (error) {
      ShowAlert('Error', 'No se pudo guardar el contacto de emergencia', AlertType.ERROR, error);
    }
  };

  return (
    <SettingsLayout
      title="Añadir contacto de emergencia"
      description="Los contactos en esta lista serán notificados siempre que detones una alerta, sin importar el grupo en que lo hagas.">
      <VStack flex={1} space={4} justifyContent={'center'}>
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
            name="phone"
          />
          {errors.phone && <Text color={'red.500'}>{errors.phone.message}</Text>}
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
      </VStack>
      <Box>
        <Button onPress={handleSubmit(onSubmit)} mt={6}>
          Guardar
        </Button>
        <Button onPress={goToImportContact} variant={'link'}>
          Importar contacto
        </Button>
      </Box>
    </SettingsLayout>
  );
}
