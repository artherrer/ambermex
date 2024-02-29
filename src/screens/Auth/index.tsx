import { useNavigation } from '@react-navigation/native';
import { Box, Button, Image, Text } from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';

export default function Auth() {
  const navigate = useNavigation();

  /**
   * Navigate to Login screen
   */
  const goToLogin = () => {
    navigate.navigate('Login' as never);
  };

  return (
    <ImageBackground source={require('../../assets/images/auth_background.png')} style={{ flex: 1 }}>
      <Box safeArea px={6} flex={1} alignItems={'center'}>
        <Image source={require('../../assets/images/logo_with_text.png')} alt="logo" width={100} height={100} />
        <Text style={[{ marginBottom: 0, color: 'red.100' }]}>¡Bienvenido a Botón Ambermex!</Text>
        <Text style={[{ marginBottom: 0, color: 'red.100' }]}>
          Inicia sesión para ser parte de la Red de Comunidad Ambermex. Si aún no tienes cuenta, regístrate.
        </Text>
        <Box width={200}>
          <Button onPress={goToLogin} style={{ marginTop: 10 }}>
            Iniciar sesión
          </Button>
          <Button onPress={() => {}} style={{ marginTop: 10 }}>
            Registrarse
          </Button>
        </Box>
      </Box>
    </ImageBackground>
  );
}
