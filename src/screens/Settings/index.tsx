import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, HStack, Icon, SectionList, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { colors } from '../../theme/colors';
import { faker } from '@faker-js/faker';


export default function Setings() {
  const navigation = useNavigation();

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

  const renderHeader = () => {
    return (
      <Box px={6} bg={'white'} py={3} mb={5}>
        <HStack space={3} alignItems={'center'}>
          <Avatar
            size={'xl'}
            source={{
              uri: 'https://i.pravatar.cc/300',
            }}
          />
          <VStack>
            <Text fontWeight={'bold'}>{faker.person.fullName()}</Text>
            <Text>{faker.date.birthdate().toDateString()}</Text>
            <Text>{faker.internet.email()}</Text>
            <Text>{faker.phone.number()}</Text>
            <Text>{faker.location.streetAddress()}</Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  const renderSectionHeader = ({ section }: any) => {
    return (
      <Box px={6} py={2} bgColor={'gray.100'}>
        <Text variant={'title'}>
          {section.title}
        </Text>
      </Box>
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <Box bgColor={'white'} h={12} justifyContent={'center'}>
        <TouchableOpacity onPress={item.action}>
          <HStack justifyContent={'space-between'} justifyItems={'center'} alignContent={'center'} pl={6} pr={2}>
            <Text>{item.title}</Text>
            <HStack>
              {item.checked && (
                <Icon as={MaterialIcons} name={'check-circle-outline'} size={5} color={colors.primary} />
              )}
              <Icon as={MaterialIcons} name={'keyboard-arrow-right'} size={5} color={colors.primary} />
            </HStack>
          </HStack>
        </TouchableOpacity>
        {/* <Divider my={2} /> */}
      </Box>
    );
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom pt={3} flex={1}>
        {renderHeader()}

        <SectionList
          sections={data}
          keyExtractor={(item, index) => item.title + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </Box>
    </>
  );
}
