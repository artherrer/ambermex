import { Box, Button, Image, Text } from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import MapView from 'react-native-maps';

export default function SetAddress() {
  const onSubmit = () => {
    console.log("Setting address");
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <Text>Confirma la ubicación de tu dirección</Text>
        <Text>
          Párate al aire libre en la puerta de tu casa y verifica tu posición en el mapa. Al finalizar presiona{' '}
          <Text style={{ fontWeight: '700' }}>"Confirmar"</Text>
        </Text>
        <Image source={require('../../assets/images/address.png')} alt="map" size={200} resizeMode="contain" />
        <Text>Dirección: </Text>

        <Box>
          <MapView
            style={{ width: '100%', height: 200 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </Box>

        <Button onPress={onSubmit} style={{ marginTop: 10 }}>
          Continuar
        </Button>
      </Box>
    </>
  );
}
