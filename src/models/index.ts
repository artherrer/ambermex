
export enum AlertType {
  PERSONAL = 'personal',
  MEDICAL = 'medical',
  WOMAN = 'woman',
  SUSPICIOUS = 'suspicious',
  NEIGHBORHOOD = 'neighborhood',
}

export interface Login {
  email?: string;
  password?: string;
  fingerprint: string | null;
  deviceId: string;
  oneSignalId: string;
  userId?: string | null;
}

export interface Profile {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image?: string;
  dob?: string;
  address?: string;
}


export const dataToProfile = (data: any) => {
  return {
    id: data.id,
    name: data.name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    image: data.image,
    customers: data.customers,
  };
};

