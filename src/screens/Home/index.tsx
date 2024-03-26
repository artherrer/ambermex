import { faker } from '@faker-js/faker';
import { Avatar, Box, Divider, FlatList, HStack, Icon, Image, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image as ImageNative } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PersonalAlert from '../../assets/images/alerts/personal.png';
import ChatGroup from '../../assets/images/chat_group.png';
import ChatIndividual from '../../assets/images/chat_individual.png';
import ActionButton from '../../components/ActionButton/ActionButton';
import AlertSlider from '../../components/AlertSlider';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { colors } from '../../theme/colors';
import { AlertType } from '../../models';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertType as setAlertTypeReducer } from '../../slicers/profile';

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
  const profileReducer = useSelector((state: any) => state.profile);
  const [conversations, setConversations] = useState([] as any[]);
  const [refreshingChats, setRefreshingChats] = useState(false);
  const [filterText, setFilterText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const newConversations = new Array(0).fill(0).map((_, i) => ({ id: i }));
    setConversations(newConversations.map(item => ({ ...item, isAlert: Math.random() > 0.5 })));
  }, []);

  const alerts = [
    {
      id: 1,
      image: require('../../assets/images/alerts/personal.png'),
      text: 'Alerta Personal',
      alertType: AlertType.PERSONAL,
    },
    {
      id: 2,
      image: require('../../assets/images/alerts/medical.png'),
      text: 'Alerta Médica',
      alertType: AlertType.MEDICAL,
    },
    {
      id: 3,
      image: require('../../assets/images/alerts/womans.png'),
      text: 'Alerta Mujeres',
      alertType: AlertType.WOMAN,
    },
    {
      id: 4,
      image: require('../../assets/images/alerts/suspicious.png'),
      text: 'Alerta Sospecha',
      alertType: AlertType.SUSPICIOUS,
    },
    {
      id: 5,
      image: require('../../assets/images/alerts/neighborhood.png'),
      text: 'Alerta Vecinal',
      alertType: AlertType.NEIGHBORHOOD,
    },
  ];

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

  const setAlertType = (alert: any) => {
    dispatch(setAlertTypeReducer(alert));
  };

  const RenderEmptyList = () => (
    <Box flex={1} justifyContent={'center'} alignItems={'center'} pt={10}>
      <Icon as={MaterialIcons} name="chat" size={20} color="gray.600" />
      <Text>No hay conversaciones</Text>
    </Box>
  );

  const onRefresh = () => {
    setRefreshingChats(true);
    setTimeout(() => {
      setRefreshingChats(false);
    }, 2000);
  };

  return (
    <>
      <Header RightElement={GoToSettings} />
      <AlertSlider />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <SearchBar onClear={clearText} onSearch={filterConversations} filterText={filterText} />
        <FlatList
          data={conversations}
          ListEmptyComponent={RenderEmptyList}
          onRefresh={onRefresh}
          refreshing={refreshingChats}
          renderItem={({ item }) => <Conversation navigation={navigation} item={item} />}
        />
      </Box>



      <ActionButton
        bgColor={'rgba(0,0,0,0.5)'}
        buttonColor={'white'}
        backdrop={true}
        position="left"
        size={50}
        offsetX={15}
        offsetY={112}
        verticalOrientation={'down'}
        degrees={0}
        renderIcon={() => {
          const imageSource = alerts.find(alert => alert.alertType === profileReducer.alertType);

          if (!imageSource) return null;

          return (
            <ImageNative
              source={imageSource.image}
              resizeMode={'contain'}
              style={{
                width: 50,
                height: 50,
              }}
            />
          );
        }}>
        {alerts.map((alert, index) => (
          <ActionButton.Item title={alert.text} onPress={() => setAlertType(alert.alertType)} key={alert.id}>
            <Image
              source={alert.image}
              resizeMode={'contain'}
              alt="chat group"
              style={{
                width: 50,
                height: 50,
              }}
            />
          </ActionButton.Item>
        ))}
      </ActionButton>

      <ActionButton buttonColor={colors.primary} bgColor={'rgba(0,0,0,0.5)'}>
        <ActionButton.Item title="Nuevo canal grupal" onPress={() => goToCreateChat('groupal')}>
          <Image source={ChatGroup} resizeMode={'contain'} w={70} h={70} alt="chat group" />
        </ActionButton.Item>
        <ActionButton.Item title="Nuevo canal individual" onPress={() => goToCreateChat('individual')}>
          <Image source={ChatIndividual} resizeMode={'contain'} w={70} h={70} alt="chat individual" />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}
