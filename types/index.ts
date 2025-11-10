// ข้อมูลส่วนบุคคล
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  idCard: string;
  address: string;
  phone: string;
  email: string;
  lineId?: string; // Line ID สำหรับการติดตาม
}

// ข้อมูลรถยนต์
export interface VehicleInfo {
  brand: string;
  model: string;
  subModel?: string; // รุ่นย่อย
  year: string;
  licensePlate: string;
  vin: string;
  engineNumber: string;
  color: string;
  engineSize: string; // ซีซี
  usageType: 'personal' | 'commercial';
  vehicleType?: 'sedan' | 'pickup4door' | 'pickupHalfCab' | 'pickupSingleCab' | 'van' | 'other'; // ประเภทรถ
  vehicleTypeOther?: string; // ประเภทรถอื่นๆ (ถ้าเลือก other)
  accessories?: string; // อุปกรณ์ตกแต่งรถ
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
  coverageEndDate?: string; // วันที่สิ้นสุดความคุ้มครอง
  previousInsuranceCompany?: string; // บริษัทประกันเดิม
  previousInsuranceType?: 'class1' | 'class2plus' | 'class3plus' | 'class3'; // ประเภทประกันเดิม
  previousPremium?: string; // เบี้ยประกันเดิม (บาท)
  previousCoverage?: {
    serviceCenter?: boolean; // ซ่อมศูนย์
    garage?: boolean; // อู่
    flood?: boolean; // น้ำท่วม
    fire?: boolean; // ไฟไหม้
  };
  // ข้อมูลแพ็กเกจใหม่ที่เสนอ
  proposedInsuranceCompany?: string; // บริษัทประกันที่เสนอ
  proposedPremium?: string; // เบี้ยประกันที่เสนอ
  proposedHighlights?: string; // จุดเด่นความคุ้มครอง
  promotionDiscount?: string; // ส่วนลดโปรโมชั่น
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
  name?: string; // ชื่อ-นามสกุล (พนักงานขาย)
  phone?: string; // เบอร์โทรศัพท์ (พนักงานขาย)
}

// ข้อมูลลูกค้าครบถ้วน
export interface CustomerData {
  id?: string;
  personalInfo: PersonalInfo;
  vehicleInfo: VehicleInfo;
  drivingInfo: DrivingInfo;
  insuranceInfo: InsuranceInfo;
  documents: Documents;
  salespersonInfo?: SalespersonInfo; // ข้อมูลพนักงานขาย
  notes?: string; // หมายเหตุ
  createdAt?: string;
  updatedAt?: string;
}

