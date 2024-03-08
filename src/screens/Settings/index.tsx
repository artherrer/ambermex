import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, SectionList, Text, VStack } from 'native-base';
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import EditablePicture from '../../components/EditablePicture';
import Header from '../../components/Header';
import { Profile } from '../../models';
import { signOut } from '../../slicers/auth';
import { colors } from '../../theme/colors';
import { browserConfigs } from '../../lib/browserinapp';

export default function Setings() {
  const profile: Profile = useSelector((state: any) => state.profile.profile);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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
            dispatch(signOut());
          },
        },
      ],
    },
  ];

  const openLink = async (url: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, browserConfigs);
      } else Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = (image: any) => {
    console.log(image);
  };

  const renderHeader = () => {
    return (
      <Box px={6} bg={'white'} py={3} mb={5}>
        <HStack space={3} alignItems={'center'}>
          <EditablePicture image={profile.image} onSelectImage={selectImage} />
          <VStack>
            <Text fontWeight={'bold'}>{`${profile.name} ${profile.lastName}`}</Text>
            <Text>{profile.dob}</Text>
            <Text>{profile.email}</Text>
            <Text>{profile.phoneNumber}</Text>
            <Text>{profile.address}</Text>
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
