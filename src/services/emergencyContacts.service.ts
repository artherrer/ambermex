import { EmergencyContact } from '../models/index';
import { axiosPrivate } from './axios.service';


export default class EmergencyContactService {

  static getEmergencyContacts = () => axiosPrivate.get('/User/GetEmergencyContacts');

  static addEmergencyContact = (data: EmergencyContact) => axiosPrivate.post('/User/AddEmergencyContacts', [data]);

  static removeEmergencyContact = (data: EmergencyContact) => axiosPrivate.post('/User/RemoveEmergencyContact', data);

}