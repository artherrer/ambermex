import { useNavigation } from '@react-navigation/native';
import { Box, Button, Image, Text, VStack } from 'native-base';
import React from 'react';
import { ImageBackground, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { browserConfigs } from '../../lib/browserinapp';

export default function Auth() {
  const navigate = useNavigation();

  /**
   * Navigate to Login screen
   */
  const goToLogin = () => {
    navigate.navigate('Login' as never);
  };

  const goToRegister = async () => {
    const url = 'https://almxwebcentralus.azurewebsites.net/AccountWeb/UserRegister';
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, browserConfigs);
      } else Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/auth_background.png')} style={{ flex: 1 }}>
      <Box safeArea px={6} flex={1} alignItems={'center'} justifyContent={'space-evenly'}>
        <Image source={require('../../assets/images/logo_with_text.png')} alt="logo" size={200} resizeMode="contain" />
        <VStack space={3}>
          <Text variant={'title'} fontSize={24} textAlign={'center'}>
            ¡Bienvenido a Botón Ambermex!
          </Text>
          <Text textAlign={'center'}>
            Inicia sesión para ser parte de la Red de Comunidad Ambermex. Si aún no tienes cuenta, regístrate.
          </Text>
        </VStack>
        <VStack>
          <Box width={200}>
            <Button onPress={goToLogin} style={{ marginTop: 10 }}>
              Iniciar sesión
            </Button>
            <Button onPress={goToRegister} style={{ marginTop: 10 }}>
              Regístrarse
            </Button>
          </Box>
        </VStack>
      </Box>
    </ImageBackground>
  );
}
