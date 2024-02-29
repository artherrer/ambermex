import { useNavigation } from '@react-navigation/native';
import { Box, Button, Icon, Image, Input, Text, VStack } from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';

export default function SetAddress() {
  const onSubmit = (data: any) => {
    console.log(data);
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

        <Button onPress={() => {}} style={{ marginTop: 10 }}>
          Continuar
        </Button>
      </Box>
    </>
  );
}
