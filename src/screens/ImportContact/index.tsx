import React from 'react';
import { Contact } from 'react-native-contacts';
import ContactsList from '../../components/ContactsList';
import Header from '../../components/Header';
import { Box } from 'native-base';

interface ItemProps {
  item: Contact;
}

export default function ImportContact({ navigation }: any) {
  const selectContact = (contact: Contact) => {
    navigation.navigate('AddContact' as never, { contact: contact });
  };

  return (
    <>
      <Header />
      <Box p={3}>
        <ContactsList onSelectedContact={selectContact} />
      </Box>
    </>
  );
}
