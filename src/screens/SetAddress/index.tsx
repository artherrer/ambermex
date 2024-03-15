import Geolocation from '@react-native-community/geolocation';
import { Box, Button, Image, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { useSelector } from 'react-redux';
import SettingsLayout from '../../components/Layouts/Settings';
import { Profile } from '../../models';
import { colors } from '../../theme/colors';
import LocationService from '../../services/location.service';
import { AlertType, ShowAlert } from '../../utils/alerts';

export default function SetAddress() {
  const [location, setLocation] = useState<any>(null);
  const profile: Profile = useSelector((state: any) => state.profile.profile);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setLocation(position);
      },
      (error: any) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const onSubmit = async () => {
    console.log('Setting address', location);

    try {
      await LocationService.SetAddress(location);
      ShowAlert('Dirección actualizada', 'Tu dirección ha sido actualizada correctamente', AlertType.SUCCESS);
    } catch (error) {
      ShowAlert('Error', 'No se pudo actualizar tu dirección', AlertType.ERROR, error);
    }
  };

  return (
    <SettingsLayout
      scrollEnabled={false}
      title="Confirma la ubicación de tu dirección"
      description='Párate al aire libre en la puerta de tu casa y verifica tu posición en el mapa. Al finalizar presiona "Confirmar"'>
      <Box safeAreaBottom px={3} pt={3} flex={1} justifyContent={'space-between'}>
        <Box alignItems={'center'}>
          <Image source={require('../../assets/images/address.png')} alt="map" size={200} resizeMode="contain" />
        </Box>

        <Box>
          {profile.primaryAddress && (
            <Text color={colors.text} fontSize={12}>
              Dirección actual: {profile.primaryAddress.address1} {profile.primaryAddress.address2},{' '}
              {profile.primaryAddress.entity}. C.P {profile.primaryAddress.postalCode}, {profile.primaryAddress.city}
            </Text>
          )}
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
        </Box>
      </Box>
      <Button onPress={onSubmit} style={{ marginTop: 10 }}>
        Continuar
      </Button>
    </SettingsLayout>
  );
}
