import axios from 'axios';
import { Image } from 'react-native-image-crop-picker';


// buildConfigField("String", "File_preset", '"qsl9mgxs"')
// buildConfigField("String", "Picture_preset", '"rtakadgy"')
// buildConfigField("String", "Video_preset", '"ss65e0iu"')
// buildConfigField("String", "Thumbnail_preset", '"n5uwl3pg"')

export default class AssetService {

  static upload = (image: Image) => {

    const formData = new FormData();

    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: image.filename,
    });

    formData.append('upload_preset', 'rtakadgy');

    return axios.post('https://api.cloudinary.com/v1_1/ambermex/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    })
  }

}
