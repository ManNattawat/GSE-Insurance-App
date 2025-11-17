// ข้อมูลลูกค้าแบบง่าย
export interface Customer {
  id: string;
  name: string;
  phone: string;
  licensePlate: string;
  insuranceType: string;
  createdAt: string;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  AddCustomer: undefined;
  CustomerList: undefined;
};
