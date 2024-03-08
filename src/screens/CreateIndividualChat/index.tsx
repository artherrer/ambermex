import { Box, Text } from 'native-base';
import React from 'react';
import { Contact } from 'react-native-contacts';
import ContactsList from '../../components/ContactsList';
import Header from '../../components/Header';

export default function CreateIndividualChat({ navigation }: any) {
  const selectContact = (contact: Contact) => {
    console.warn('Contact selected', contact);
    navigation.navigate('Conversation', { contact });
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom pt={3} px={3} flex={1}>
        <Text variant={'title'} mb={3} textAlign={'center'}>
          Seleccione un contacto
        </Text>
        <ContactsList onSelectedContact={selectContact} />
      </Box>
    </>
  );
}
