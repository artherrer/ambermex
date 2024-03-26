import { Box, Button, Icon, Image, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { Profile } from '../../models';
import { axiosPublic } from '../../services/axios.service';
import { colors } from '../../theme/colors';
import { AlertType, ShowAlert } from '../../utils/alerts';

interface DeviceLinkedProps {
  navigation: any;
}
export default function DeviceAlreadyLinked({ navigation }: DeviceLinkedProps) {
  const [loading, setLoading] = useState(false);
  const profileReducer = useSelector((state: any) => state.profile.profile) as Profile;

  console.warn(profileReducer);
  

  const goBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!profileReducer.email || !profileReducer.phone) {
        ShowAlert('Error', 'No se encontró información de usuario', AlertType.ERROR);
        return;
      }

      await axiosPublic.post('/Auth/GetChallengeDeviceValidationCode', {
        email: profileReducer.email,
        phoneNumber: profileReducer.phone,
      });
      navigation.navigate('TransferDevice');
    } catch (error: any) {
      console.warn(error);
      
      ShowAlert('Error', 'No se pudo enviar el código', AlertType.ERROR, error);
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
