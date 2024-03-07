import { Avatar, Box, FlatList, HStack, Input, Text } from 'native-base';
import React, { useState } from 'react';
import { Contact } from 'react-native-contacts';
import ContactsList from '../../components/ContactsList';
import Header from '../../components/Header';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { colors } from '../../theme/colors';
import ActionButton from '../../components/ActionButton/ActionButton';
import EditablePicture from '../../components/EditablePicture';

const schema = yup
  .object({
    name: yup.string().required('El nombre del canal es requerido'),
    description: yup.string(),
  })
  .required();

export default function CreateGroupChat({ navigation }: any) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onSelectImage = (image: any) => {
    console.log(image);
  };

  const selectContact = (contact: Contact) => {
    if (contacts.find(c => c.recordID === contact.recordID)) {
      setContacts(contacts.filter(c => c.recordID !== contact.recordID));
    } else {
      setContacts([...contacts, contact]);
    }
  };

  return (
    <>
      <Header />
      <HStack space={3} alignItems={'center'} px={6} py={6}>
        <EditablePicture image={null} onSelectImage={onSelectImage} />
        <Box flex={1}>
          <Text>Nombre del canal</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nombre del canal"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <Text color={colors.error}>{errors.name.message}</Text>}
          <Text>Nombre del canal</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Descripción del canal"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
        </Box>
      </HStack>
      <FlatList
        horizontal
        data={contacts}
        renderItem={({ item }: { item: Contact }) => (
          <Box>
            {item.hasThumbnail && <Avatar source={{ uri: item.thumbnailPath }} />}
            {!item.hasThumbnail && <Avatar source={require('../../assets/images/user_placeholder.png')} />}
            <Box>
              <Text fontSize={10}>
                {item.givenName} {item.familyName}
              </Text>
              <Text fontSize={10}>{item.phoneNumbers[0].number}</Text>
            </Box>
          </Box>
        )}
      />
      <Box>
        <ContactsList onSelectedContact={selectContact} multiple />
      </Box>
      <ActionButton buttonColor={colors.primary} onPress={handleSubmit(onSubmit)} useNativeDriver={true} active={true}>
        Crear
      </ActionButton>
    </>
  );
}
