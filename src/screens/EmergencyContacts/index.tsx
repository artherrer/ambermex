import { Avatar, Box, Button, FlatList, HStack, Icon, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import SettingsLayout from '../../components/Layouts/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { EmergencyContact, Profile } from '../../models';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import EmergencyContactService from '../../services/emergencyContacts.service';
import { ShowAlert, AlertType } from '../../utils/alerts';
import { removeEmergencyContact, setEmergencyContacts } from '../../slicers/profile';

export default function EmergencyContacts({ navigation, route }: any) {
  const dispatch = useDispatch();
  const [contacts, setContacts] = React.useState<Profile['emergencyContacts']>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const profile: Profile = useSelector((state: any) => state.profile.profile);

  useEffect(() => {
    setContacts(profile.emergencyContacts);
  }, [profile]);

  const goToAddEmergencyContact = () => {
    navigation.navigate('AddContact' as never);
  };

  const deleteContact = async (contact: EmergencyContact) => {
    try {
      await EmergencyContactService.removeEmergencyContact(contact);
      dispatch(removeEmergencyContact(contact));
      ShowAlert('Éxito', 'Contacto de emergencia eliminado', AlertType.SUCCESS);
    } catch (error) {
      ShowAlert('Error', 'No se pudo eliminar el contacto de emergencia', AlertType.ERROR, error);
    }
  };

  // const editContact = (contact: EmergencyContact) => {};

  const refreshEmergencyContacts = async () => {
    try {
      const response = await EmergencyContactService.getEmergencyContacts();
      dispatch(setEmergencyContacts(response.data.contacts));
    } catch (error) {
      ShowAlert('Error', 'No se pudo obtener los contactos de emergencia', AlertType.ERROR, error);
    }
  };

  const renderEmptyList = () => {
    return (
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Icon as={MaterialIcons} name={'list'} size={100} color={colors.gray[300]} />
        <Text textAlign={'center'} color={'gray.400'} fontSize={18}>
          Historial de alertas vacío
        </Text>
      </Box>
    );
  };

  const renderReportItem = ({ item }: { item: EmergencyContact }) => {
    return (
      <Box
        p={3}
        mb={3}
        bg={'white'}
        borderRadius={10}
        shadow={1}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <HStack space={5}>
          <Avatar
            size={12}
            source={item.picture ? { uri: item.picture } : require('../../assets/images/user_placeholder.png')}
          />
          <Box>
            <Text fontSize={16} fontWeight={'bold'}>
              {item.name} {item.lastName}
            </Text>
            <Text fontSize={12} color={'gray.400'}>
              {item.phone}
            </Text>
          </Box>
        </HStack>
        <HStack space={5}>
          {/* <TouchableOpacity onPress={() => editContact(item)}>
            <Icon as={MaterialIcons} name={'edit'} size={6} color={colors.gray[400]} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => deleteContact(item)}>
            <Icon as={MaterialIcons} name={'delete'} size={6} color={colors.gray[400]} />
          </TouchableOpacity>
        </HStack>
      </Box>
    );
  };

  return (
    <SettingsLayout
      title="Contactos de emergencia"
      description="Agrega los contactos de emergencia que desees"
      scrollEnabled={false}>
      <Box flex={1}>
        <FlatList
          data={contacts}
          renderItem={renderReportItem}
          ListEmptyComponent={renderEmptyList}
          onRefresh={refreshEmergencyContacts}
          refreshing={refreshing}
        />
      </Box>
      <Box>
        <Button variant={'link'} onPress={goToAddEmergencyContact}>
          Agregar nuevo contacto de emergencia
        </Button>
      </Box>
    </SettingsLayout>
  );
}
