import { Box } from 'native-base';
import React from 'react';
import Chat from '../../components/Chat';
import Header from '../../components/Header';

export default function Conversation() {
  return (
    <Box flex={1} safeAreaBottom>
      <Header />
      <Chat />
    </Box>
  );
}
