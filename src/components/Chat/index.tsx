import { Actionsheet, Box, HStack, Icon, Text, useDisclose } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ChatEmpty = () => (
  <Box flex={1} justifyContent={'center'} alignItems={'center'}>
    <Text>No hay mensajes</Text>
  </Box>
);

const renderInputToolbar = (props: any, onOpen: any) => {
  return (
    <HStack borderColor="red.200">
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 1,
          borderTopColor: 'red.200',
          backgroundColor: 'red.200',
          width: 200,
        }}
      />
      <TouchableOpacity onPress={onOpen}>
        <Icon as={MaterialIcons} name="add" size={30} color="black" />
      </TouchableOpacity>
    </HStack>
  );
};

export default function Chat({ renderCustomHeader }: any) {
  const [messages, setMessages] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    setMessages([]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, []);

  const selectFromGallery = () => {
    launchImageLibrary({ mediaType: 'mixed' }, response => {
      console.log('response', response);
    });
  };

  const takeMedia = () => {
    launchCamera({ mediaType: 'mixed' }, response => {
      console.log('response', response);
    });
  };

  return (
    <Box flex={1}>
      <GiftedChat
        // renderLoadEarlier={() => <Text>Cargar más</Text>}
        renderCustomHeader={renderCustomHeader ? () => renderCustomHeader() : undefined}
        renderInputToolbar={(props: any) => renderInputToolbar(props, onOpen)}
        renderChatEmpty={ChatEmpty}
        messages={messages}
        onSend={messages => onSend(messages as any)}
        placeholder="Escribe un mensaje..."
        inverted={false}
        user={{
          _id: 1,
        }}
      />

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={selectFromGallery}>Elegir de la galería</Actionsheet.Item>
          <Actionsheet.Item onPress={takeMedia}>Tomar foto o video</Actionsheet.Item>
          <Actionsheet.Item
            onPress={onClose}
            _text={{
              color: 'red.500',
            }}>
            Cancelar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}
