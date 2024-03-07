import { Box, Button, Icon, Image } from 'native-base';
import { colors } from '../../theme/colors';
import ImagePicker, { Image as CropedImage } from 'react-native-image-crop-picker';
import { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface EditablePictureProps {
  image: string | null;
  onSelectImage: (image: CropedImage) => void;
}

export default function EditablePicture({ image, onSelectImage }: EditablePictureProps) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    setCurrentImage(image);
  }, []);

  const selectImage = async () => {
    try {
      const newImage = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      setCurrentImage(newImage.path);

      onSelectImage(newImage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box >
      <Box
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Image
          source={currentImage ? { uri: currentImage } : require('../../assets/images/user_placeholder.png')}
          style={{ width: 100, height: 100, borderRadius: 100 }}
          alt="image"
        />
        <Button
          onPress={selectImage}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: colors.primary,
            borderRadius: 100,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon as={MaterialIcons} name="edit" color={'white'} size={15} />
        </Button>
      </Box>
    </Box>
  );
}
