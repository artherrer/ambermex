import { Box, Button, Icon, Image, Input, KeyboardAvoidingView, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { axiosPublic } from '../../services/axios.service';
import { useDispatch, useSelector } from 'react-redux';
import { Profile, dataToProfile } from '../../models';
import { setProfile } from '../../slicers/profile';
import { setSignedIn } from '../../slicers/auth';
import AsyncStorageService, { StorageKeys } from '../../services/asyncstorage';

interface TransferDeviceProps {
  navigation: any;
}
export default function TransferDevice({ navigation }: TransferDeviceProps) {
  const { email, password, phone } = useSelector((state: any) => state.profile.profile) as Profile;
  console.warn(email, password);

  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      if (!email || !code || !password) {
        Alert.alert('Error', 'No se encontró información de usuario');
        return;
      }

      const response = await axiosPublic.post('/Auth/ChallengeDevice', { code, username: email, password });
      dispatch(setProfile(dataToProfile(response.data.user_data)));

      if (response.data.token) {
        await AsyncStorageService.setItem(StorageKeys.AUTH_TOKEN, response.data.token);
      }

      dispatch(setSignedIn());
    } catch (error) {
      console.warn(error);
      Alert.alert('Error', 'Ocurrió un error al intentar transferir el servicio');
    }
  };

  const sendCode = async () => {
    if (!email || !phone) {
      Alert.alert('Error', 'No se encontró información de usuario');
      return;
    }

    try {
      await axiosPublic.post('/Auth/GetChallengeDeviceValidationCode', { email, phone });
      Alert.alert('Listo', 'El código ha sido enviado');
    } catch (error) {
      console.warn(error);
      Alert.alert('Error', 'Ocurrió un error al intentar enviar el código');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" flex={1} px={3} justifyContent={'space-evenly'}>
      <Box safeArea flex={1} px={3} justifyContent={'space-evenly'}>
        <TouchableOpacity onPress={goBack}>
          <Icon as={MaterialIcons} name="arrow-back" size={30} color={colors.primary} />
        </TouchableOpacity>

        <Box alignItems={'center'} justifyContent={'space-evenly'} flex={1}>
          <Image
            source={require('../../assets/images/logo_with_text.png')}
            alt="logo"
            size={200}
            resizeMode="contain"
          />
          <VStack>
            <Text variant={'title'} fontSize={24} textAlign={'center'}>
              Transferencia de dispositivo
            </Text>
            <Text variant={'body'} fontSize={14} textAlign={'center'}>
              Ingresa el código que recibiste via SMS en el teléfono registrado.
            </Text>
          </VStack>
          <VStack width={300} space={3}>
            <Box>
              <Text>Código de validación</Text>
              <Input placeholder="Código de validación" keyboardType="number-pad" onChangeText={setCode} value={code} />
            </Box>
          </VStack>
          <VStack w={150}>
            <Button onPress={onSubmit} style={{ marginTop: 10 }}>
              Continuar
            </Button>
            <Button variant={'cancel'} onPress={goBack} style={{ marginTop: 10 }}>
              Cancelar
            </Button>
          </VStack>
          <Text style={[{ marginTop: 10, color: 'red.100' }]} onPress={sendCode}>
            El código puede tomar un minuto en llegar. Si no recibiste el código presiona aquí.
          </Text>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}
