import { Box, Button, HStack, Modal, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { colors } from '../../theme/colors';
import Slider from '../Slider';
import styles from './styles';

import { Vibration } from 'react-native';
import { useSelector } from 'react-redux';
import { AlertType, AlertTypeColor } from '../../models';

export default function AlertSlider(props: any) {
  const profileReducer = useSelector((state: any) => state.profile);
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(5);
  const [timer, setTimer] = useState<any>(null);

  const callToSOS = () => {
    setShowModal(true);
    Vibration.vibrate(1000);
    const newTimer = setInterval(() => {
      // Assign the timer to a new variable
      setCounter(prev => prev - 1);
      Vibration.vibrate(1000);
    }, 1000);
    setTimer(newTimer); // Update the timer state
  };

  const closeModal = () => {
    setShowModal(false);
    if (timer) {
      clearInterval(timer);
      setTimer(null); // Reset timer state
      setCounter(5);
      Vibration.cancel();
    }
  };

  useEffect(() => {
    if (counter === 0) {
      closeModal();
    }
  }, [counter]);

  return (
    <Box px={6} mt={3}>
      <HStack>
        <Box w={59}></Box>
        <Box flex={1}>
          <Slider
            backgroundColor={AlertTypeColor[profileReducer.alertType as AlertType]}
            onEndReached={callToSOS}
            containerStyle={styles.container}
            sliderElement={<Box style={styles.button} />}>
            <Text style={styles.text}>SOS</Text>
          </Slider>
        </Box>
      </HStack>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content maxWidth="400px">
          <Box p={10} alignContent={'center'} alignItems={'center'}>
            <Text fontSize={20} fontWeight={'bold'}>
              Activando
            </Text>
            <Text fontSize={20} fontWeight={'bold'}>
              Alerta de Emergencia
            </Text>
            <Box>
              <Text fontSize={20} fontWeight={'bold'}>
                {counter}
              </Text>
            </Box>
            <Button bgColor={colors.error} onPress={closeModal} px={6}>
              Cancelar
            </Button>
          </Box>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
