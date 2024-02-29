import { Avatar, Box, Divider, HStack, SectionList, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

export default function Setings() {
  const navigation = useNavigation();

  const fakeContacts = [
    {
      name: 'Nombre',
      phone: '1234567890',
    },
  ]

  const data = [
    {
      title: 'Reportes',
      data: [
        {
          title: 'Emergencias',
          checked: false,
          action: () => {},
        },
        {
          title: 'Actividad sospechosa',
          checked: false,
          action: () => {},
        },
      ],
    },
    {
      title: 'Ajustes',
      data: [
        {
          title: 'Contraseña',
          checked: true,
          action: () => {
            navigation.navigate('ChangePassword' as never);
          },
        },
        {
          title: 'Ubicación',
          checked: false,
          action: () => {
            navigation.navigate('SetAddress' as never);
          },
        },
      ],
    },
    {
      title: 'Contactos de emergencia',
      data: [
        {
          title: 'Agrear nuevo contacto',
          checked: true,
          action: () => {
            navigation.navigate('AddContact' as never);
          },
        },
      ],
    },
    {
      title: 'Datos médicos',
      data: [
        {
          title: 'Ficha médica',
          checked: true,
          action: () => {
            navigation.navigate('MedicalRecord' as never);
          },
        },
      ],
    },
  ];

  const renderHeader = ({ section }: any) => {
    return (
      <Box backgroundColor={'error.100'} px={6}>
        <Text color={'primary.500'} fontSize={'18'} fontWeight={'bold'}>
          {section.title}
        </Text>
      </Box>
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <Box px={6}>
        <TouchableOpacity onPress={item.action}>
          <HStack justifyContent={'space-between'}>
            <Text>{item.title}</Text>
            <HStack>
              {item.checked ? <Text>Activado</Text> : <Text>Desactivado</Text>}
              <Text>Fecha</Text>
            </HStack>
          </HStack>
        </TouchableOpacity>
        <Divider my={2} />
      </Box>
    );
  };

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

        <SectionList
          sections={data}
          keyExtractor={(item, index) => item.title + index}
          renderItem={renderItem}
          renderSectionHeader={renderHeader}
        />
      </Box>
    </>
  );
}
