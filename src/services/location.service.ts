import { axiosPrivate } from './axios.service';

export default class LocationService {

  static SetAddress = (data: {
    latitude: number;
    longitude: number;
    address1: string;
    address2: string;
    entity: string;
    postalCode: string;
    city: string;
  }) => axiosPrivate.post('/User/AddAddressLocation', data);
}
