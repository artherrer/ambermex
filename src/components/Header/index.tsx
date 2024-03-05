import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Box, Icon } from 'native-base';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CustomHeaderProps {
  RightElement?: React.FC;
}

const Header: React.FC<CustomHeaderProps> = ({ RightElement }: CustomHeaderProps) => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);

  const handleBackButton = () => {
    navigation.goBack();
  };

  // Determine whether to show the back button based on navigation history
  const showBackButton = navigationState.routes.length > 1;

  return (
    <Box safeAreaTop style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Icon as={MaterialIcons} name="arrow-back" size={'lg'} style={styles.backIcon} />
        </TouchableOpacity>
      )}
      <Image source={require('../../assets/images/logo_horizontal.png')} style={styles.logo} />
      {RightElement && (
        <Box style={styles.rightIcon}>
          <RightElement />
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#fff', // You can change the background color as needed
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 70,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logo: {
    width: 150, // Adjust the width as per your logo's size
    height: 30, // Adjust the height as per your logo's size
    resizeMode: 'contain',
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    top: 70,
  },
  rightIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Header;
