import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Box } from 'native-base';
// import Lottie from 'lottie-react-native';

interface LoaderProps {
  style?: Object;
}

export default function Loader({ style }: LoaderProps) {
  return (
    <Box style={{ ...styles.container, ...style }}>
      <ActivityIndicator size="large" color="#FFF" />
    </Box>
  );
}
