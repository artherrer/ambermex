import { Box, FlatList, Icon, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { colors } from '../../theme/colors';
import { AlertType } from '../../models';
import { TouchableOpacity } from 'react-native';

export default function Reports({ navigation, route }: any) {
  const [reports, setReports] = useState<any>([]);

  useEffect(() => {
    if (route.params?.type === AlertType.PERSONAL) {
      setReports([{ type: AlertType.PERSONAL, date: new Date() }]);
    }
  }, [route.params]);

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

  const renderReportItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ReportDetail' as never, { report: item } as never)}>
        <Box
          p={3}
          mb={3}
          bg={'white'}
          borderRadius={10}
          shadow={1}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Box>
            <Text fontSize={16} fontWeight={'bold'}>
              {item.type === AlertType.PERSONAL ? 'Emergencia' : 'Actividad sospechosa'}
            </Text>
            <Text fontSize={12} color={'gray.400'}>
              {item.date.toDateString()}
            </Text>
          </Box>
          <Icon as={MaterialIcons} name={'chevron-right'} size={30} color={colors.gray[400]} />
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <Box alignItems={'center'} mb={10}>
          <Text variant={'title'} my={3}>
            Reportes
          </Text>
          <Text textAlign={'center'}>Tu historial de reportes se mostrará aquí.</Text>
        </Box>
        <Box flex={1}>
          <FlatList data={reports} renderItem={renderReportItem} ListEmptyComponent={renderEmptyList} />
        </Box>
      </Box>
    </>
  );
}
