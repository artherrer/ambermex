import { Box, Button, HStack, Image, Modal, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { colors } from '../../theme/colors';
import Slider from '../Slider';
import styles from './styles';
import ActionButton from '../ActionButton/ActionButton';
import ChatGroup from '../../assets/images/chat_group.png';
import ChatIndividual from '../../assets/images/chat_individual.png';

export default function AlertSlider(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(5);
  const [timer, setTimer] = useState<any>(null);

  const callToSOS = () => {
    setShowModal(true);
    const newTimer = setInterval(() => {
      // Assign the timer to a new variable
      setCounter(prev => prev - 1);
    }, 1000);
    setTimer(newTimer); // Update the timer state
  };

  const closeModal = () => {
    setShowModal(false);
    if (timer) {
      clearInterval(timer);
      setTimer(null); // Reset timer state
      setCounter(5);
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
        <Box w={20}>
          <ActionButton
            buttonColor={colors.primary}
            position="left"
            size={50}
            offsetX={0}
            offsetY={0}
            verticalOrientation={'down'}>
            <ActionButton.Item title="Nuevo canal grupal" onPress={() => {}}>
              <Image source={ChatGroup} resizeMode={'contain'} w={70} h={70} alt="chat group" />
            </ActionButton.Item>
            <ActionButton.Item title="Nuevo canal individual" onPress={() => console.log('notes tapped!')}>
              <Image source={ChatIndividual} resizeMode={'contain'} w={70} h={70} alt="chat individual" />
            </ActionButton.Item>
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
