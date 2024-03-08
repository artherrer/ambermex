import { faker } from '@faker-js/faker';
import { Avatar, Box, Divider, FlatList, HStack, Icon, Image, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PersonalAlert from '../../assets/images/alerts/personal.png';
import ChatGroup from '../../assets/images/chat_group.png';
import ChatIndividual from '../../assets/images/chat_individual.png';
import ActionButton from '../../components/ActionButton/ActionButton';
import AlertSlider from '../../components/AlertSlider';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
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
  const [conversations, setConversations] = useState([] as any[]);
  const [filterText, setFilterText] = useState('');

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
    if (type === 'groupal') {
      navigation.navigate('CreateGroupChat' as never);
    } else {
      navigation.navigate('CreateIndividualChat' as never);
    }
  };

  const clearText = () => {
    setFilterText('');
  };

  const filterConversations = (filterText: string) => {
    setFilterText(filterText);
  };

  return (
    <>
      <Header RightElement={GoToSettings} />
      <AlertSlider />
      <Box safeAreaBottom px={3} pt={3} flex={1} zIndex={-1}>
        <SearchBar onClear={clearText} onSearch={filterConversations} filterText={filterText} />
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
