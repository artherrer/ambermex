import { Box, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatEmpty = () => (
  <Box flex={1} justifyContent={'center'} alignItems={'center'}>
    <Text>No hay mensajes</Text>
  </Box>
);

export default function Chat({ renderCustomHeader }: any) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <Box flex={1}>
      <GiftedChat
        // renderLoadEarlier={() => <Text>Cargar más</Text>}
        renderCustomHeader={renderCustomHeader ? () => renderCustomHeader() : undefined}
        renderChatEmpty={ChatEmpty}
        messages={messages}
        onSend={messages => onSend(messages as any)}
        placeholder="Escribe un mensaje..."
        inverted={false}
        user={{
          _id: 1,
        }}
      />
    </Box>
  );
}
