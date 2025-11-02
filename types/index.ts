// ข้อมูลส่วนบุคคล
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  idCard: string;
  address: string;
  phone: string;
  email: string;
}

// ข้อมูลรถยนต์
export interface VehicleInfo {
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  vin: string;
  engineNumber: string;
  color: string;
  engineSize: string; // ซีซี
  usageType: 'personal' | 'commercial';
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
  status: 'new' | 'renewal';
}

// เอกสารประกอบ
export interface Documents {
  idCardImage?: string;
  vehicleRegistration?: string;
  drivingLicense?: string;
  previousPolicy?: string;
}

// ข้อมูลลูกค้าครบถ้วน
export interface CustomerData {
  id?: string;
  personalInfo: PersonalInfo;
  vehicleInfo: VehicleInfo;
  drivingInfo: DrivingInfo;
  insuranceInfo: InsuranceInfo;
  documents: Documents;
  createdAt?: string;
  updatedAt?: string;
}

