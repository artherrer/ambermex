import { faker } from '@faker-js/faker';
import { Avatar, Box, Divider, FlatList, HStack, Icon, Image, Input, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PersonalAlert from '../../assets/images/alerts/personal.png';
import ChatGroup from '../../assets/images/chat_group.png';
import ChatIndividual from '../../assets/images/chat_individual.png';
import ActionButton from '../../components/ActionButton/ActionButton';
import AlertSlider from '../../components/AlertSlider';
import Header from '../../components/Header';
import { colors } from '../../theme/colors';

function Conversation({ navigation, item }: any) {
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


  const goToCreateChat = (type: string) => {
    if(type === 'groupal') {
      navigation.navigate('CreateGroupChat' as never);
    } else {
      navigation.navigate('CreateIndividualChat' as never);
    }
  }

  const clearText = () => {
    console.log('Clear text');
  };

  return (
    <>
      <Header RightElement={GoToSettings} />
      <AlertSlider />
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
        <ActionButton buttonColor={colors.primary}>
          <ActionButton.Item title="Nuevo canal grupal" onPress={() => goToCreateChat('groupal')}>
            <Image source={ChatGroup} resizeMode={'contain'} w={70} h={70} alt="chat group" />
          </ActionButton.Item>
          <ActionButton.Item title="Nuevo canal individual" onPress={() => goToCreateChat('individual')}>
            <Image source={ChatIndividual} resizeMode={'contain'} w={70} h={70} alt="chat individual" />
          </ActionButton.Item>
        </ActionButton>
      </Box>
    </>
  );
}
