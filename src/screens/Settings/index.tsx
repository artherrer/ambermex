import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, HStack, Icon, SectionList, Text, VStack } from 'native-base';
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { colors } from '../../theme/colors';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { faker } from '@faker-js/faker';
import EditablePicture from '../../components/EditablePicture';

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
    {
      title: 'Soporte',
      data: [
        {
          title: 'Guía de referencia rápida',
          checked: true,
          action: () => {
            openLink('https://www.botonambermex.com/guiarapida');
          },
        },
        {
          title: 'Guía de uso',
          checked: true,
          action: () => {
            openLink('https://www.botonambermex.com/guia-de-uso');
          },
        },
        {
          title: 'Contacto',
          checked: true,
          action: () => {
            openLink('https://www.botonambermex.com/tecnologias');
          },
        },
      ],
    },
    {
      title: 'Legales',
      data: [
        {
          title: 'Términos y condiciones',
          checked: true,
          action: () => {
            navigation.navigate('MedicalRecord' as never);
          },
        },
        {
          title: 'Aviso de privacidad',
          checked: true,
          action: () => {
            navigation.navigate('MedicalRecord' as never);
          },
        },
        {
          title: 'Contrato de licencia para el usuario',
          checked: true,
          action: () => {
            navigation.navigate('MedicalRecord' as never);
          },
        },
      ],
    },
    {
      title: 'Cuenta',
      data: [
        {
          title: 'Cerrar sesión',
          checked: true,
          action: () => {
            navigation.navigate('AuthStack' as never);
          },
        },
      ],
    },
  ];

  const openLink = async (url: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: colors.primary,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = (image: any) => {
    console.log(image);
  }

  const renderHeader = () => {
    return (
      <Box px={6} bg={'white'} py={3} mb={5}>
        <HStack space={3} alignItems={'center'}>
          <EditablePicture image={null} onSelectImage={selectImage} />
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
        <Text variant={'title'}>{section.title}</Text>
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
