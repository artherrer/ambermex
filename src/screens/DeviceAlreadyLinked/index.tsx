import { Box, Button, Icon, Image, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { axiosPublic } from '../../services/axios.service';
import { useSelector } from 'react-redux';
import { Profile } from '../../models';

interface DeviceLinkedProps {
  navigation: any;
}
export default function DeviceAlreadyLinked({ navigation }: DeviceLinkedProps) {
  const [loading, setLoading] = useState(false);
  const { email, phone } = useSelector((state: any) => state.profile.profile) as Profile;

  const goBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!email || !phone) {
        Alert.alert('Error', 'No se encontró información de usuario');
        return;
      }

      await axiosPublic.post('/Auth/GetChallengeDeviceValidationCode', {
        email: email,
        phoneNumber: phone,
      });
      navigation.navigate('TransferDevice');
    } catch (error: any) {
      console.warn(error);

      Alert.alert('Error', 'Ocurrió un error al intentar transferir el servicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box safeArea flex={1} px={3} justifyContent={'space-evenly'}>
      <TouchableOpacity onPress={goBack}>
        <Icon as={MaterialIcons} name="arrow-back" size={30} color={colors.primary} />
      </TouchableOpacity>

      <Box alignItems={'center'} justifyContent={'space-evenly'} flex={1}>
        <Image source={require('../../assets/images/logo_with_text.png')} alt="logo" size={200} resizeMode="contain" />
        <VStack>
          <Text variant={'title'} fontSize={24} textAlign={'center'}>
            ¡Atención!
          </Text>
          <Text variant={'body'} fontSize={14} textAlign={'center'}>
            El usuario que ingresaste se encuentra activo en otro dispositivo. Deseas iniciar el proceso de
            transferencia de servicio? (El dispositivo actual firmado en Ambermex perderá acceso a la plataforma)
          </Text>
        </VStack>
        <VStack w={150}>
          <Button onPress={onSubmit} style={{ marginTop: 10 }} isLoading={loading}>
            Continuar
          </Button>
          <Button variant={'danger'} onPress={goBack} style={{ marginTop: 10 }} isLoading={loading}>
            Cancelar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
