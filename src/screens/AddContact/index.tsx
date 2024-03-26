import { yupResolver } from '@hookform/resolvers/yup';
import { Actionsheet, Box, Button, HStack, Input, Text, VStack, useDisclose } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CountryCode from '../../components/CountryCode';
import SettingsLayout from '../../components/Layouts/Settings';
import EmergencyContactService from '../../services/emergencyContacts.service';
import { addEmergencyContact } from '../../slicers/profile';
import { AlertType, ShowAlert } from '../../utils/alerts';
import MaskInput from 'react-native-mask-input';

const schema = yup
  .object({
    name: yup.string().required('Nombre requerido'),
    phone: yup.string().required('Teléfono requerido').min(10, 'Teléfono inválido'),
    country_code: yup.string().required('Código de país requerido'),
    gender: yup.number().required('Género requerido'),
  })
  .required();

const genderOptions = [
  { label: 'Masculino', value: 1 },
  { label: 'Femenino', value: 2 },
  { label: 'Otro', value: 3 },
];

const countryCodes = ['+1', '+52'];

export default function AddContact({ navigation, route }: any) {
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<any>(null);
  const [phone, setPhone] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclose();
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
    },
    resolver: yupResolver(schema),
  });

  /**
   *
   */
  useEffect(() => {
    if (route.params?.contact) {
      const { givenName, familyName, phoneNumbers } = route.params.contact;
      const phoneNumber = phoneNumbers[0].number;

      // check if phone number has country code
      const hasCountryCode = countryCodes.some(code => phoneNumber.includes(code));

      if (hasCountryCode) {
        const countryCode = countryCodes.find(code => phoneNumber.includes(code));
        const phone = phoneNumber.replace(countryCode, '');
        console.warn('countryCode', countryCode);
        if (countryCode) {
          console.warn('countryCode', countryCode);

          setCountryCode(countryCode);
          setValue('country_code', countryCode);
        }
        setPhone(phone);
        setValue('phone', phone);
      } else {
        setPhone(phoneNumber);
        setValue('phone', phone);
      }

      setValue('name', `${givenName} ${familyName}`);
    }
  }, [route.params]);

  const goToImportContact = () => {
    navigation.navigate('ImportContact' as never);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.phone = `${data.country_code}${data.phone}`;

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
    } finally {
      setLoading(false);
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
          <HStack space={3}>
            <Box>
              <CountryCode
                value={countryCode}
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
                  borderBottomColor: '#000',
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
        </Box>
        <Box mb={3}>
          <Text>Género</Text>
          <Input placeholder="Género" value={selectedGender?.label} editable={false} onPressIn={onOpen} />
          {errors.gender && <Text color={'red.500'}>{errors.gender.message}</Text>}
        </Box>
      </VStack>
      <Box>
        <Button onPress={handleSubmit(onSubmit)} mt={6} isLoading={loading}>
          Guardar
        </Button>
        <Button onPress={goToImportContact} variant={'link'} disabled={loading}>
          Importar contacto
        </Button>
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {genderOptions.map((option, index) => (
            <Actionsheet.Item
              key={option.value.toString()}
              onPress={() => {
                setValue('gender', option.value);
                setSelectedGender(option);
                onClose();
              }}>
              {option.label}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </SettingsLayout>
  );
}
