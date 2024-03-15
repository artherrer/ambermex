import { Login, MedicalData, RecoverPassword } from '../models';
import { axiosPrivate } from './axios.service';

export default class ProfileService {

  static getProfile = () => axiosPrivate.get('/Auth/GetUserData');

  static setMedicalRecord = (data: MedicalData) => axiosPrivate.post('/User/AddMedicalData', data);

  static updateProfilePicture = (imageUrl: string) => axiosPrivate.post('/User/UpdateProfilePicture', imageUrl);

}
