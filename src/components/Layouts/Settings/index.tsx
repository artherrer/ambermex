import { Box, KeyboardAvoidingView, ScrollView, Text, VStack } from 'native-base';
import Header from '../../Header';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  scrollEnabled?: boolean;
}
export default function SettingsLayout({ children, title, description, scrollEnabled = true }: AuthLayoutProps) {
  return (
    <Box safeAreaBottom flex={1}>
      <Header />
      <KeyboardAvoidingView behavior="padding" flex={1} justifyContent={'space-evenly'}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnabled}>
          <Box flex={1} px={3} justifyContent={'space-evenly'}>
            <Box alignItems={'center'} justifyContent={'space-evenly'}>
              <VStack mt={5}>
                <Text variant={'title'} fontSize={24} textAlign={'center'}>
                  {title}
                </Text>
                <Text mt={5} variant={'body'} fontSize={14} textAlign={'center'}>
                  {description}
                </Text>
              </VStack>
            </Box>
            <Box justifyContent={'space-between'} flex={1} mt={6}>
              {children}
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
