// ข้อมูลส่วนบุคคล
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  idCard: string;
  address: string;
  phone: string;
  email: string;
  lineId?: string;
}

// ข้อมูลรถยนต์
export interface VehicleInfo {
  brand: string;
  model: string;
  subModel?: string;
  year: string;
  licensePlate: string;
  vin: string;
  engineNumber: string;
  color: string;
  engineSize: string;
  usageType: 'personal' | 'commercial';
  vehicleType?: 'sedan' | 'pickup4door' | 'pickupHalfCab' | 'pickupSingleCab' | 'van' | 'other';
  vehicleTypeOther?: string;
  accessories?: string;
}

// ข้อมูลการขับขี่
export interface DrivingInfo {
  drivingLicenseYears: string;
  drivingExperience: string;
  accidentHistory: boolean;
  claimHistory: boolean;
  numberOfDrivers: string;
  mainDriverAge: string;
}

// ข้อมูลประกันภัย
export interface InsuranceInfo {
  insuranceType: 'class1' | 'class2plus' | 'class3plus' | 'class3';
  coverageAmount: string;
  additionalCoverage: {
    flood: boolean;
    theft: boolean;
    medical: boolean;
    personalAccident: boolean;
  };
  coveragePeriod: string;
  coverageEndDate?: string;
  previousInsuranceCompany?: string;
  previousInsuranceType?: 'class1' | 'class2plus' | 'class3plus' | 'class3';
  previousPremium?: string;
  previousCoverage?: {
    serviceCenter?: boolean;
    garage?: boolean;
    flood?: boolean;
    fire?: boolean;
  };
  proposedInsuranceCompany?: string;
  proposedPremium?: string;
  proposedHighlights?: string;
  promotionDiscount?: string;
  status: 'new' | 'renewal';
}

// เอกสารประกอบ
export interface Documents {
  idCardImage?: string;
  vehicleRegistration?: string;
  drivingLicense?: string;
  previousPolicy?: string;
}

// ข้อมูลพนักงานขาย
export interface SalespersonInfo {
  name?: string;
  phone?: string;
}

// ข้อมูลจาก QuickQuote
export interface QuickQuoteData {
  brand: string;
  model: string;
  subModel?: string;
  year: string;
  insuranceType: 'class1' | 'class2plus' | 'class3plus' | 'class3';
  customerName: string;
  phone: string;
  email?: string;
}

// ข้อมูลลูกค้าครบถ้วน
export interface CustomerData {
  id?: string;
  personalInfo: PersonalInfo;
  vehicleInfo: VehicleInfo;
  drivingInfo: DrivingInfo;
  insuranceInfo: InsuranceInfo;
  documents: Documents;
  salespersonInfo?: SalespersonInfo;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  QuickQuote: undefined;
  InsuranceForm: { status?: 'new' | 'renewal'; quickQuoteData?: QuickQuoteData };
  CustomerList: undefined;
  CustomerDetail: { customerId: string };
};