import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, HStack, SectionList, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';


export default function ImportContact() {
  const navigation = useNavigation();

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
      if (permission === RESULTS.DENIED) {
        console.log('Permission denied');
      } else if (permission === RESULTS.GRANTED) {
        console.log('Permission granted');
      } else if (permission === RESULTS.BLOCKED) {
        console.log('Permission blocked');
      }

      // const contacts = await getContacts();
    }
  }, []);

  const getCotacts = () => {

  }

  return (
    <>
      <Header />
      <Box safeAreaBottom pt={3} flex={1}>
        <Box px={6}>
          <HStack space={3}>
            <Avatar
              size={'xl'}
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            />
            <VStack>
              <Text>Nombre</Text>
              <Text>DOB</Text>
              <Text>Correo</Text>
              <Text>Teléfono</Text>
              <Text>Dirección</Text>
            </VStack>
          </HStack>
        </Box>

      
      </Box>
    </>
  );
}
