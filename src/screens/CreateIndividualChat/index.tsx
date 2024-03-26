import { Box, Text } from 'native-base';
import React from 'react';
import { Contact } from 'react-native-contacts';
import ContactsList from '../../components/ContactsList';
import Header from '../../components/Header';
import { CreateIndividualChatResponse, dataToCreateIndividualChatResponse } from '../../models';
import ChatService from '../../services/chat.service';
import { AlertType, ShowAlert } from '../../utils/alerts';

export default function CreateIndividualChat({ navigation }: any) {
  const selectContact = async (contact: Contact) => {
    try {
      const response = await ChatService.createIndividualChat({ phone: contact.phoneNumbers[0].number });
      const chat: CreateIndividualChatResponse = dataToCreateIndividualChatResponse(response.data);
      navigation.navigate('Conversation', { groupId: chat.groupId });
    } catch (error) {
      ShowAlert('Error', 'No se pudo crear el chat', AlertType.WARNING, error);
    }
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
