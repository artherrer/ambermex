import { Box, Button, Image, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { faker } from '@faker-js/faker';

export default function SetAddress() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        console.warn(position);

        setLocation(position);
      },
      (error: any) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const onSubmit = () => {
    console.log('Setting address');
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1} justifyContent={'space-between'}>
        <Box alignItems={'center'}>
          <Text variant={'title'} my={3}>
            Confirma la ubicación de tu dirección
          </Text>
          <Text>
            Párate al aire libre en la puerta de tu casa y verifica tu posición en el mapa. Al finalizar presiona{' '}
            <Text style={{ fontWeight: '700' }}>"Confirmar"</Text>
          </Text>
          <Image source={require('../../assets/images/address.png')} alt="map" size={200} resizeMode="contain" />
        </Box>

        <Box>
          <Text mb={3}>Dirección: {faker.location.streetAddress()}</Text>
          {location?.coords && (
            <MapView
              style={{ width: '100%', height: 200 }}
              showsUserLocation
              zoomEnabled
              initialRegion={{
                latitude: location?.coords?.latitude || 0,
                longitude: location?.coords?.longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          )}
          <Button onPress={onSubmit} style={{ marginTop: 10 }}>
            Continuar
          </Button>
        </Box>
      </Box>
    </>
  );
}
