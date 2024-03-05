import { Avatar, Box, Divider, Fab, FlatList, HStack, Icon, Input, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import PersonalAlert from '../../assets/images/alerts/personal.png';
import { faker } from '@faker-js/faker';
import { colors } from '../../theme/colors';

function Conversation({ navigation, item }: any) {
  console.warn(item);

  const goToConversation = () => {
    navigation.navigate('Conversation' as never);
  };

  const goToAlert = () => {
    navigation.navigate('AlertConversation' as never);
  };

  return (
    <TouchableOpacity onPress={item.isAlert ? goToAlert : goToConversation}>
      <HStack space={3} mb={3}>
        <Avatar
          source={
            item.isAlert
              ? PersonalAlert
              : {
                  uri: faker.image.avatar(),
                }
          }
        />
        <VStack flex={1}>
          <HStack justifyContent={'space-between'}>
            {item.isAlert && (
              <Text fontWeight={'bold'} color={colors.error}>
                Alerta de seguridad
              </Text>
            )}
            {!item.isAlert && <Text fontWeight="bold">{faker.internet.userName()}</Text>}
            <Text numberOfLines={1} ellipsizeMode="tail" color="gray.500" fontSize="sm">
              {faker.date.anytime().toDateString()}
            </Text>
          </HStack>
          {item.isAlert && <Text>{faker.lorem.sentence()}</Text>}
          {!item.isAlert && <Text>{faker.lorem.sentence()}</Text>}
          <Divider my={2} />
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}

export default function Home({ navigation }: any) {
  const [conversations, setConversations] = React.useState([] as any[]);

  useEffect(() => {
    const newConversations = new Array(10).fill(0).map((_, i) => ({ id: i }));
    setConversations(newConversations.map(item => ({ ...item, isAlert: Math.random() > 0.5 })));
  }, []);

  const GoToSettings = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Settings' as never)}>
      <Icon as={MaterialIcons} name="settings" size={6} color="gray.600" />
    </TouchableOpacity>
  );

  const clearText = () => {
    console.log('Clear text');
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
            InputLeftElement={<Icon as={MaterialIcons} name="search" size={6} color="gray.600" ml="2" />}
            InputRightElement={
              <Icon as={MaterialIcons} name="clear" size={6} color="gray.600" mr="2" onPress={clearText} />
            }
          />
        </VStack>
        <FlatList
          data={conversations}
          renderItem={({ item }) => <Conversation navigation={navigation} item={item} />}
        />
        <Fab position="absolute" size="lg" icon={<Icon as={MaterialIcons} color="white" fontSize="lg" name="add" />} />
      </Box>
    </>
  );
}
