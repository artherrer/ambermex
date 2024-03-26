import { Avatar, Box, FlatList, HStack, Icon, Input, Text, VStack } from 'native-base';
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
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatService from '../../services/chat.service';
import { ChatMember, dataToCreateGroupChatResponse } from '../../models';
import { AlertType, ShowAlert } from '../../utils/alerts';

const schema = yup
  .object({
    name: yup.string().required('El nombre del canal es requerido'),
    description: yup.string(),
  })
  .required();

export default function CreateGroupChat({ navigation }: any) {
  const [chatThumbnail, setChatThumbnail] = useState<any>(null);
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

  const contactsToChatMembers = (contacts: Contact[]): ChatMember[] => {
    return contacts.map(contact => {
      return {
        name: `${contact.givenName} ${contact.familyName}`,
        phone: contact.phoneNumbers[0].number,
        avatar: contact.thumbnailPath,
      };
    });
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    if (!contacts.length) return;
    try {
      const response = await ChatService.createGroupChat({
        name: data.name,
        description: data.description,
        members: contactsToChatMembers(contacts),
        thumbnail: chatThumbnail,
      });

      const chat = dataToCreateGroupChatResponse(response.data);

      console.warn("chat", chat);
      

      navigation.navigate('Conversation', { groupId: chat.groupId });

      if (chat.message) {
        ShowAlert('Canal creado', chat.message, AlertType.SUCCESS);
      }
    } catch (error) {
      ShowAlert('Error', 'Ocurrió un error al crear el canal', AlertType.ERROR, error);
    }
  };

  const onSelectImage = (image: any) => {
    console.log(image);
    setChatThumbnail(image);
  };

  const selectContact = (contact: Contact) => {
    if (contacts.find(c => c.recordID === contact.recordID)) {
      setContacts(contacts.filter(c => c.recordID !== contact.recordID));
    } else {
      setContacts([...contacts, contact]);
    }
  };

  const renderContact = ({ item }: { item: Contact }) => {
    return (
      <VStack alignItems={'center'} ml={3} maxWidth={50}>
        <TouchableOpacity
          onPress={() => selectContact(item)}
          style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
          <Icon as={MaterialIcons} name={'remove-circle'} size={5} color={colors.gray[400]} />
        </TouchableOpacity>
        {item.thumbnailPath && <Avatar source={{ uri: item.thumbnailPath }} />}
        {!item.thumbnailPath && <Avatar source={require('../../assets/images/user_placeholder.png')} />}
        <Text fontSize={8} textAlign={'center'}>
          {item.givenName} {item.familyName}
        </Text>
      </VStack>
    );
  };

  return (
    <Box flex={1}>
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
      <Box mb={3}>
        <FlatList horizontal data={contacts} renderItem={renderContact} />
      </Box>
      <Box px={3} flex={1}>
        <ContactsList onSelectedContact={selectContact} multiple />
      </Box>
      <ActionButton buttonColor={colors.primary} onPress={handleSubmit(onSubmit)} useNativeDriver={true} active={false}>
        Crear
      </ActionButton>
    </Box>
  );
}
