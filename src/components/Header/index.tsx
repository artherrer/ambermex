import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Box } from 'native-base';

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
          <Text style={styles.backIcon}>Back</Text>
        </TouchableOpacity>
      )}
      <Image source={require('../../assets/images/logo_horizontal.png')} style={styles.logo} />
      {RightElement && <RightElement />}
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
    top: 75,
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
  rightIcon: {},
  rightIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Header;
