import { Avatar, Box, Divider, Fab, FlatList, HStack, Icon, Input, Text, VStack } from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Slider from '../../components/Slider';

function Conversation() {
  return (
    <HStack space={3} mb={3}>
      <Avatar
        source={{
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
      />
      <VStack flex={1}>
        <HStack justifyContent={'space-between'}>
          <Text>Nombre</Text>
          <Text>Fecha</Text>
        </HStack>
        <Text>Último mensaje</Text>
        <Divider my={2} />
      </VStack>
    </HStack>
  );
}

export default function Home() {
  const navigation = useNavigation();

  const GoToSettings = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Settings' as never)}>
        <Text>Settings</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header RightElement={GoToSettings} />
      <Slider />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <VStack w="100%" space={5} alignSelf="center" mb={3}>
          <Input
            backgroundColor={'gray.200'}
            placeholder="Search"
            variant="filled"
            width="100%"
            height={10}
            borderRadius="10"
            py="1"
            px="2"
            InputLeftElement={<Icon ml="2" size="4" color="gray.400" />}
          />
        </VStack>
        <FlatList data={new Array(10).fill(0).map((_, i) => ({ id: i }))} renderItem={Conversation} />
        <Fab position="absolute" size="lg" icon={<Icon as={Text} color="white" fontSize="lg" name="add" />} />
      </Box>
    </>
  );
}
