import { Box } from 'native-base';
import React, { useEffect } from 'react';
import Chat from '../../components/Chat';
import Header from '../../components/Header';

export default function Conversation({ route }: any) {
  useEffect(() => {
    const groupId = route.params.groupId;
    console.log('Conversation with groupId: ', groupId);
  }, []);

  return (
    <Box flex={1} safeAreaBottom>
      <Header />
      <Chat />
    </Box>
  );
}
