import { faker } from '@faker-js/faker';
import { Avatar, Box, HStack, Icon, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Animated, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Chat from '../../components/Chat';

const AlertCard = () => {
  const location = faker.location
    .nearbyGPSCoordinate()
    .map(item => item.toFixed(2))
    .join(', ');

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location}`;
    Linking.openURL(url);
  };
  return (
    <VStack bgColor={'red.100'} mx={10} p={3} rounded={5} space={3} mt={3}>
      <HStack space={3}>
        <Avatar source={require('../../assets/images/alerts/personal.png')} />
        <VStack>
          <Text fontWeight={'bold'}>Alerta Mujeres</Text>
          <TouchableOpacity onPress={openInMaps}>
            <HStack>
              <Icon as={MaterialIcons} name="location-pin" size={5} />
              <Text style={{ textDecorationLine: 'underline' }}>{location}</Text>
            </HStack>
          </TouchableOpacity>
        </VStack>
      </HStack>
      <HStack space={3}>
        <Avatar source={{ uri: faker.image.avatar() }} />
        <VStack>
          <Text>
            Alerta Mujeres detonada por {faker.person.fullName()} de {faker.number.int({ min: 18, max: 60 })} años.
          </Text>
          <Text>
            Ubicación:{' '}
            <TouchableOpacity onPress={openInMaps}>
              <Text style={{ textDecorationLine: 'underline' }}>{location}</Text>
            </TouchableOpacity>
          </Text>
          <Text fontWeight={'bold'}> ¡Tú puedes ayudar!</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default function AlertConversation({ navigation }: any) {
  const [chatVisible, setChatVisible] = useState(true);
  const [animation] = useState(new Animated.Value(1));

  const goBack = () => {
    navigation.goBack();
  };

  const toggleChat = () => {
    console.warn('toggleChat');

    const toValue = chatVisible ? 0 : 1; // Determine the target value based on current visibility
    Animated.timing(animation, {
      toValue,
      duration: 300, // Set duration for transition
      useNativeDriver: true,
    }).start();
    setChatVisible(!chatVisible); // Toggle chat visibility state
  };

  return (
    <Box flex={1} safeAreaBottom>
      <Box flex={1}>
        <TouchableOpacity
          onPress={goBack}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 60,
            left: 20,
            padding: 5,
            backgroundColor: 'white',
            borderRadius: 100,
          }}>
          <Icon as={MaterialIcons} name="arrow-back" size={6} />
        </TouchableOpacity>
        <MapView
          style={{ flex: 1 }}
          showsMyLocationButton
          showsUserLocation
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title={'Alerta'}
            description={'Alerta de seguridad'}
          />
        </MapView>
      </Box>

      <HStack justifyContent={'space-evenly'}>
        <Box alignItems={'center'}>
          <Icon as={MaterialIcons} name="people" size={8} />
          <Text>Notificadas</Text>
        </Box>
        <Box alignItems={'center'}>
          <TouchableOpacity onPress={toggleChat}>
            <Icon as={MaterialIcons} name="arrow-downward" size={6} />
          </TouchableOpacity>
          <Text>A {34} km de ti</Text>
        </Box>
        <Box alignItems={'center'}>
          <Icon as={MaterialIcons} name="people" size={8} />
          <Text>Participantes</Text>
        </Box>
      </HStack>

      {/* Use Animated.View for Chat component to add transitions */}
      <Animated.View style={{ transform: [{ translateY: 0 }] }}>
        <Chat renderCustomHeader={AlertCard} />
      </Animated.View>
      {/* <Chat renderCustomHeader={AlertCard} /> */}
    </Box>
  );
}
