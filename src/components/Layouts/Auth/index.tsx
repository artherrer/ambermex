import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Image, KeyboardAvoidingView, ScrollView, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior="padding" flex={1} justifyContent={'space-evenly'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Box safeArea flex={1} px={3} justifyContent={'space-evenly'}>
          <TouchableOpacity onPress={goBack}>
            <Icon as={MaterialIcons} name="arrow-back" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Box alignItems={'center'} justifyContent={'space-evenly'}>
            <Image
              source={require('../../../assets/images/logo_with_text.png')}
              alt="logo"
              size={150}
              resizeMode="contain"
            />
            <VStack mt={10}>
              <Text variant={'title'} fontSize={24} textAlign={'center'}>
                {title}
              </Text>
              <Text mt={5} variant={'body'} fontSize={14} textAlign={'center'}>
                {description}
              </Text>
            </VStack>
          </Box>
          <Box justifyContent={'space-between'} flex={1} px={6}>
            {children}
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
