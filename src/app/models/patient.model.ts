export interface Patient {
  PatientId?: string;
  Title?: string;
  FirstName: string;
  Surname: string;
  IdNumber: string;
  DOB: string;
  Gender: string;
  Email: string;
  Cellphone: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  City: string;
  PostCode: string;
  CreateUserId: string;
  ModifyUserId: string;
  StatusId: number;
  Province?: string;
  MemberShipNumber?: string;
}
