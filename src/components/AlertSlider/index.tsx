import { Box, Button, HStack, Image, Modal, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { colors } from '../../theme/colors';
import Slider from '../Slider';
import styles from './styles';
import ActionButton from '../ActionButton/ActionButton';
import ALERT_PERSONAL from '../../assets/images/alerts/personal.png';
import ALERT_MEDICAL from '../../assets/images/alerts/medical.png';
import ALERT_WOMAN from '../../assets/images/alerts/womans.png';
import ALERT_SUSPICIOUS from '../../assets/images/alerts/suspicious.png';
import ALERT_NEIGHBORHOOD from '../../assets/images/alerts/neighborhood.png';

import { setAlertType as setAlertTypeReducer } from '../../slicers/profile';
import { Vibration } from 'react-native';
import { useDispatch } from 'react-redux';
import { AlertType } from '../../models';

export default function AlertSlider(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(5);
  const [timer, setTimer] = useState<any>(null);
  const dispatch = useDispatch();
  const alerts = [
    { id: 1, image: ALERT_PERSONAL, text: 'Alerta Personal', alertType: AlertType.PERSONAL },
    { id: 2, image: ALERT_MEDICAL, text: 'Alerta Médica', alertType: AlertType.MEDICAL },
    { id: 3, image: ALERT_WOMAN, text: 'Alerta Mujeres', alertType: AlertType.WOMAN },
    { id: 4, image: ALERT_SUSPICIOUS, text: 'Alerta Sospecha', alertType: AlertType.SUSPICIOUS },
    { id: 5, image: ALERT_NEIGHBORHOOD, text: 'Alerta Vecinal', alertType: AlertType.NEIGHBORHOOD },
  ];

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

  const setAlertType = (alert: any) => {
    dispatch(setAlertTypeReducer(alert));
  };

  return (
    <Box px={6} mt={3}>
      <HStack>
        <Box w={20}>
          <ActionButton
            buttonColor={'white'}
            backdrop={true}
            position="left"
            size={50}
            offsetX={0}
            offsetY={0}
            verticalOrientation={'down'}
            degrees={0}
            renderIcon={() => (
              <Image source={ALERT_PERSONAL} resizeMode={'contain'} w={70} h={70} alt="chat individual" />
            )}>
            {alerts.map((alert, index) => (
              <ActionButton.Item title={alert.text} onPress={() => setAlertType(alert.alertType)} key={alert.id}>
                <Image source={alert.image} resizeMode={'contain'} w={70} h={70} alt="chat group" />
              </ActionButton.Item>
            ))}
          </ActionButton>
        </Box>

        <Box flex={1}>
          <Slider
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
