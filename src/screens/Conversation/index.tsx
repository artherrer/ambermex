import { Box, Text } from 'native-base';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Header from '../../components/Header';

const ChatEmpty = () => (
  <Box flex={1} justifyContent={'center'} alignItems={'center'}>
    <Text>No hay mensajes</Text>
  </Box>
);

export default function Conversation() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <Box flex={1} safeAreaBottom>
      <Header />
      <GiftedChat
        renderChatEmpty={ChatEmpty}
        messages={messages}
        onSend={messages => onSend(messages as any)}
        user={{
          _id: 1,
        }}
      />
    </Box>
  );
}
