import { Actionsheet, Box, Icon, Text, useDisclose } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GiftedChat, IMessage, InputToolbar } from 'react-native-gifted-chat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../theme/colors';
import { Profile } from '../../models';
import { useSelector } from 'react-redux';

const ChatEmpty = () => (
  <Box flex={1} justifyContent={'center'} alignItems={'center'} style={{ transform: [{ scaleY: -1 }] }}>
    <Icon as={MaterialIcons} name={'chat'} size={100} color={'gray.300'} />
    <Text>No hay mensajes</Text>
  </Box>
);

const renderInputToolbar = (props: any) => (
  <InputToolbar
    {...props}
    containerStyle={{
      borderTopWidth: 1,
      borderTopColor: colors.primary,
    }}
  />
);

const renderActions = (props: any) => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 40,
      borderRadius: 20,
      marginRight: 10,
    }}
    onPress={props.onPressActionButton}>
    <Icon as={MaterialIcons} name="add" size={30} color={colors.primary} />
  </TouchableOpacity>
);

const renderSend = (props: any) => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 40,
      borderRadius: 20,
      marginRight: 10,
    }}
    disabled={!props.text}
    onPress={() => props.onSend(props)}>
    <Icon as={MaterialIcons} name="send" size={30} color={colors.primary} />
  </TouchableOpacity>
);

const Chat = ({ renderCustomHeader }: any) => {
  const [messages, setMessages] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclose();
  const profile: Profile = useSelector((state: any) => state.profile.profile);

  useEffect(() => {
    setMessages([]);
  }, []);

  const onSend = (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  };

  const appendMedia = (media: any) => {
    const message: IMessage = {
      _id: Math.random(),
      text: '',
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    if (media.type === 'image/jpg' || media.type === 'image/jpeg' || media.type === 'image/png') {
      message.image = media.uri;
    }

    if (media.type === 'video/mp4' || media.type === 'video/quicktime') {
      message.video = media.uri;
    }

    onSend([message] as any);
  };

  const handleMediaSelection = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.errorCode === 'camera_unavailable' || response.errorCode === 'permission') {
      console.error('Camera not available or permission denied');
    } else {
      console.log('Selected image:', response);
      if (response.assets?.length) {
        appendMedia(response.assets[0]);
      }
    }
    onClose();
  };

  const handleGallerySelection = () => {
    launchImageLibrary({ mediaType: 'photo' }, handleMediaSelection);
  };

  const handleCameraLaunch = () => {
    launchCamera({ mediaType: 'photo' }, handleMediaSelection);
  };

  return (
    <Box flex={1}>
      <GiftedChat
        renderLoadEarlier={() => <Text>Cargar más</Text>}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderChatEmpty={ChatEmpty}
        messages={messages}
        onSend={messages => onSend(messages as any)}
        placeholder="Escribe un mensaje..."
        renderUsernameOnMessage={true}
        renderActions={renderActions}
        onPressActionButton={onOpen}
        user={{
          _id: 1,
          name: `${profile.name} ${profile.lastName}`,
        }}
      />

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={handleGallerySelection}>Elegir de la galería</Actionsheet.Item>
          <Actionsheet.Item onPress={handleCameraLaunch}>Tomar foto o video</Actionsheet.Item>
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
};

export default Chat;
