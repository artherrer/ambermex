import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, SectionList, Text, VStack } from 'native-base';
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import EditablePicture from '../../components/EditablePicture';
import Header from '../../components/Header';
import { AlertType, Profile } from '../../models';
import { signOut } from '../../slicers/auth';
import { colors } from '../../theme/colors';
import { browserConfigs } from '../../lib/browserinapp';
import { DateTime } from 'luxon';
import { ShowAlert, AlertType as AlertTypeNotif } from '../../utils/alerts';
import AssetService from '../../services/asset.service';
import { Image } from 'react-native-image-crop-picker';
import ProfileService from '../../services/profile.service';
import AuthService from '../../services/auth.service';

export default function Setings() {
  const [loadingPicture, setLoadingPicture] = React.useState(false);
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
          action: () => {
            navigation.navigate('Reports' as never, { type: AlertType.PERSONAL } as never);
          },
        },
        {
          title: 'Actividad sospechosa',
          checked: false,
          action: () => {
            navigation.navigate('Reports' as never, { type: AlertType.SUSPICIOUS } as never);
          },
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
          title: 'Administrar contactos de emergencia',
          checked: false,
          action: () => {
            navigation.navigate('EmergencyContacts' as never);
          },
        },
        {
          title: 'Agrear nuevo contacto',
          checked: false,
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
            openLink('https://www.botonambermex.com/terminos-de-uso');
          },
        },
        {
          title: 'Aviso de privacidad',
          checked: true,
          action: () => {
            openLink('https://www.botonambermex.com/politicas-de-privacidad');
          },
        },
        {
          title: 'Contrato de licencia para el usuario',
          checked: true,
          action: () => {
            openLink('https://www.botonambermex.com/tecnologias');
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
          action: async () => {
            AuthService.localLogout();
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

  const selectImage = async (image: Image) => {
    console.log(image);
    setLoadingPicture(true);
    try {
      const response = await AssetService.upload(image);
      console.log(response.data.secure_url);
      await ProfileService.updateProfilePicture(response.data.secure_url);
      ShowAlert('Imagen subida', 'La imagen se subió correctamente', AlertTypeNotif.SUCCESS);
    } catch (error) {
      ShowAlert('Error', 'No se pudo subir la imagen', AlertTypeNotif.ERROR, error);
    } finally {
      setLoadingPicture(false);
    }
  };

  const renderHeader = () => {
    return (
      <Box px={6} bg={'white'} py={3} mb={5}>
        <HStack space={3} alignItems={'center'}>
          <EditablePicture image={profile.pictureUrl} onSelectImage={selectImage} loading={loadingPicture} />
          <VStack flex={1}>
            <Text fontWeight={'bold'}>{`${profile.name} ${profile.lastName}`}</Text>
            <Text color={colors.text} fontSize={12}>
              {DateTime.fromISO(profile.dob).toFormat('dd/MM/yyyy')}
            </Text>
            <Text color={colors.text} fontSize={12}>
              {profile.email}
            </Text>
            <Text color={colors.text} fontSize={12}>
              {profile.phone}
            </Text>
            {profile.primaryAddress && (
              <Text color={colors.text} fontSize={12}>
                {profile.primaryAddress.address1} {profile.primaryAddress.address2}, {profile.primaryAddress.entity}.
                C.P {profile.primaryAddress.postalCode}, {profile.primaryAddress.city}
              </Text>
            )}
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
      <Box safeAreaBottom flex={1}>
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
