
export enum AlertType {
  PERSONAL = 'personal',
  MEDICAL = 'medical',
  WOMAN = 'woman',
  SUSPICIOUS = 'suspicious',
  NEIGHBORHOOD = 'neighborhood',
}


export interface Login {
  username: string;
  password: string;
  userDevice?: UserDevice;
}

export interface RecoverPassword {
  phone: string;
}

export interface RestorePassword {
  userId: string;
  newPassword: string;
  code: string;
  passwordProvided?: boolean;
}

export interface SendCode {
  identificationString: string;
}

export interface UserDevice {
  os: string;
  model: string;
  manufacturer: string;
  language: string;
  serialNumber: string;
  buildNumber: string;
  codeName: string;
}

export interface Profile {
  alias: string
  email: string
  nickname: string
  jid: string
  admin: boolean
  owner: boolean
  isSupport: boolean
  isEmergencyContact: boolean
  verifiedPhone: boolean
  verifiedIdentity: number
  verifiedEmail: boolean
  totalUsers: number
  nearbyUsers: number
  medicalDataEnabled: boolean
  userId: string
  dobString: string
  completeProfile: boolean
  termsAccepted: boolean
  responseType: number
  gender: number
  age: number
  isOfficial: boolean
  isResponseAssigned: boolean
  responseElementSchedule: any
  name: string
  lastName: string
  phone: string
  hasPicture: boolean
  pictureUrl: string
  addresses: any
  unit: any
  dob: string
  medicalData?: MedicalData
  primaryAddress?: PrimaryAddress
  emergencyContacts?: EmergencyContact[]
  membershipProducts?: MembershipProduct[]
  password?: string
}


export interface EmergencyContact {
  name: string
  phone: string
  jid?: any
  nickname?: any
  picture?: any
  lastName?: any
  gender: number
}


export interface MedicalData {
  bloodType: string
  allergies: string
  medications: string
  ailments: string
  height: number
  weight: number
}

export interface PrimaryAddress {
  address1: string
  address2: string
  city: string
  entity: string
  postalCode: string
  state: number
  coordinates: any
  hasLocation: boolean
}

export interface MembershipProduct {
  providerName: string
  productName: string
  providerLogo: any
  type: number
}



export const dataToProfile = (data: any): Profile => {
  return {
    alias: data.alias,
    email: data.email,
    nickname: data.nickname,
    jid: data.jid,
    admin: data.admin,
    owner: data.owner,
    isSupport: data.isSupport,
    isEmergencyContact: data.isEmergencyContact,
    verifiedPhone: data.verifiedPhone,
    verifiedIdentity: data.verifiedIdentity,
    verifiedEmail: data.verifiedEmail,
    totalUsers: data.totalUsers,
    nearbyUsers: data.nearbyUsers,
    medicalDataEnabled: data.medicalDataEnabled,
    userId: data.userId,
    dobString: data.dobString,
    completeProfile: data.completeProfile,
    medicalData: dataToMedicalData(data.medicalData),
    primaryAddress: dataToPrimaryAddress(data.primaryAddress),
    membershipProducts: data.membershipProducts && dataToMembershipProducts(data.membershipProducts),
    emergencyContacts: data.emergencyContacts && dataToEmergencyContacts(data.emergencyContacts),
    termsAccepted: data.termsAccepted,
    responseType: data.response,
    gender: data.gender,
    age: data.age,
    isOfficial: data.isOfficial,
    isResponseAssigned: data.isResponseAssigned,
    responseElementSchedule: data.responseElementSchedule,
    name: data.name,
    lastName: data.lastName,
    phone: data.phone,
    hasPicture: data.hasPicture,
    pictureUrl: data.pictureUrl,
    addresses: data.addresses,
    unit: data.unit,
    dob: data.dob,
    password: data.password,
  };
};

export const dataToMedicalData = (data: any): MedicalData => {
  return {
    bloodType: data?.bloodType ?? '',
    allergies: data?.allergies ?? '',
    medications: data?.medications ?? '',
    ailments: data?.ailments ?? '',
    height: data?.height ?? 0,
    weight: data?.weight ?? 0,
  };
}


export const dataToPrimaryAddress = (data: any): PrimaryAddress => {
  return {
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    entity: data.entity,
    postalCode: data.postalCode,
    state: data.state,
    coordinates: data.coordinates,
    hasLocation: data.hasLocation,
  };
}


export const dataToMembershipProduct = (data: any): MembershipProduct => {
  return {
    providerName: data.providerName,
    productName: data.productName,
    providerLogo: data.providerLogo,
    type: data.type,
  };
}

export const dataToMembershipProducts = (data: any): MembershipProduct[] => {
  return data.map((membershipProduct: any) => dataToMembershipProduct(membershipProduct));
}


export const dataToEmergencyContact = (data: any): EmergencyContact => {
  return {
    gender: data.gender,
    jid: data.jid,
    name: data.name,
    lastName: data.lastName,
    nickname: data.nickname,
    phone: data.phone,
    picture: data.picture,
  };
}

export const dataToEmergencyContacts = (data: any): EmergencyContact[] => {
  return data.map((emergencyContact: any) => dataToEmergencyContact(emergencyContact));
}