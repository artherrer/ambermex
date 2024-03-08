import { Box, HStack, Icon, Text } from 'native-base';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';

export default function ReportDetail({ navigation, route }: any) {
  useEffect(() => {
    console.warn(route.params);
  }, [route.params]);

  return (
    <>
      <Header />
      <Box safeAreaBottom px={3} pt={3} flex={1}>
        <Box alignItems={'center'} mb={10}>
          <Text variant={'title'} my={3}>
            Reporte
          </Text>
        </Box>
        <Box flex={1}>
          <Box p={3} mb={3} bg={'white'} borderRadius={10} shadow={1}>
            <Text fontSize={16} fontWeight={'bold'}>
              Emergencia
            </Text>
            <HStack space={1} alignItems={'center'} my={2}>
              <Icon as={MaterialIcons} name={'person'} size={6} color={colors.gray[400]} />
              <Text fontSize={14}>Arturo Olvera Herrera</Text>
            </HStack>
            <Text fontSize={12}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc.
            </Text>
            <HStack space={1} alignItems={'center'} my={2}>
              <Icon as={MaterialIcons} name={'location-pin'} size={6} color={colors.gray[400]} />
              <Text fontSize={12} color={'gray.400'}>
                20.0000, -100.0000
              </Text>
            </HStack>
            <HStack space={1} alignItems={'center'} my={2}>
              <Icon as={MaterialIcons} name={'calendar-today'} size={6} color={colors.gray[400]} />
              <Text fontSize={12} color={'gray.400'}>
                {new Date().toDateString()}
              </Text>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
