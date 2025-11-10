// รายชื่อบริษัทประกันที่ GSE ให้บริการ (จาก https://gseinsurebroker.com/)
export interface InsuranceCompany {
  id: string;
  name: string;
  nameEn?: string;
  logoUrl?: string;
  logoLocal?: string; // path to local logo file
}

export const INSURANCE_COMPANIES: InsuranceCompany[] = [
  {
    id: 'viriya',
    name: 'วิริยะประกันภัย',
    nameEn: 'Viriya Insurance',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0006_viriya.jpg',
  },
  {
    id: 'bki',
    name: 'บีเคไอ ประกันภัย',
    nameEn: 'BKI Insurance',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0014_BKI.jpg',
  },
  {
    id: 'tokio-marine',
    name: 'โตเกียว มารีน',
    nameEn: 'Tokio Marine',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0007_Tokio_Marine.svg.jpg',
  },
  {
    id: 'sri-muang',
    name: 'ศรีเมืองประกันภัย',
    nameEn: 'Sri Muang Insurance',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0003_4e5e365bf3d41fe25369109d06519246.jpg',
  },
  {
    id: 'ayudhya',
    name: 'กรุงเทพ-ประกันภัย',
    nameEn: 'Bangkok Insurance (Ayudhya)',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0001_ayd.jpg',
  },
  {
    id: 'aia',
    name: 'เอไอเอ',
    nameEn: 'AIA',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0010_logo-0a5-15.jpg',
  },
  {
    id: 'cooperate',
    name: 'คูเปอร์เรท',
    nameEn: 'Cooperate Insurance',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0004_3a2463797bef6e467fee58596901dd37ef56e192_logo-coperate.jpg',
  },
  {
    id: 'thai-re',
    name: 'ไทยรี',
    nameEn: 'Thai Re',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0011_logo_0.jpg',
  },
  {
    id: 'thavi',
    name: 'ทวิประกันภัย',
    nameEn: 'Thavi Insurance',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0008_thavi.jpg',
  },
  {
    id: 'msig',
    name: 'เอ็มเอสไอจี',
    nameEn: 'MSIG',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0002_8dff2156-ff60-4829-8fdb-878072f5d590.jpg',
  },
  {
    id: 'thai-nakorn',
    name: 'ไทยนครประกันภัย',
    nameEn: 'Thai Nakorn Insurance',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0000_LOGO.jpg',
  },
  {
    id: 'thanachart',
    name: 'ธนชาตประกันภัย',
    nameEn: 'Thanachart Insurance',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0005_ธนาคารธนชาต-จำกัด-มหาชน.jpg',
  },
  {
    id: 'ergo',
    name: 'เออร์โก',
    nameEn: 'ERGO',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0012_ergo.jpg',
  },
  {
    id: 'allianz',
    name: 'อัลเลียนซ์',
    nameEn: 'Allianz',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2023/06/0013_download.jpg',
  },
  {
    id: 'sompo',
    name: 'ซอมโป',
    nameEn: 'SOMPO',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2025/03/SOMPO_0-scaled.jpg',
  },
  {
    id: 'aioi',
    name: 'ไอโออิ',
    nameEn: 'AIOI',
    logoUrl: 'https://gseinsurebroker.com/wp-content/uploads/2025/03/Aioi_0.jpg',
  },
];

// ข้อมูลโปรโมชั่นของ GSE
export interface Promotion {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'free-quote',
    title: 'เช็คเบี้ยประกันฟรี',
    description: 'ตรวจสอบเบี้ยประกันได้ฟรี ไม่มีค่าใช้จ่าย',
    icon: 'check-circle',
  },
  {
    id: 'installment',
    title: 'ผ่อนชำระได้',
    description: 'ไม่มีบัตรเครดิตก็ผ่อนชำระได้ ให้เครดิตนานถึง 3-10 เดือน',
    icon: 'credit-card',
  },
  {
    id: 'free-porbor',
    title: 'แถมฟรี พรบ.',
    description: 'ซื้อสดประเภท 1 แถมฟรี พรบ. หรือเลือกรับส่วนลดเพิ่ม',
    icon: 'gift',
  },
  {
    id: 'no-credit-card',
    title: 'ไม่ต้องใช้บัตรเครดิต',
    description: 'ผ่อนชำระได้โดยไม่ต้องใช้บัตรเครดิต',
    icon: 'card-off',
  },
  {
    id: 'nationwide',
    title: 'สาขาทั่วประเทศ',
    description: 'มีสาขาดูแลทั่วประเทศ พร้อมให้บริการ',
    icon: 'map-marker',
  },
  {
    id: 'claim-consultant',
    title: 'เจ้าหน้าที่สินไหม',
    description: 'มีเจ้าหน้าที่สินไหมให้คำปรึกษา',
    icon: 'account-tie',
  },
  {
    id: 'free-delivery',
    title: 'ส่งกรมธรรม์ฟรี',
    description: 'บริการดูแล จัดส่งกรมธรรม์ถึงบ้าน ฟรี',
    icon: 'truck-delivery',
  },
  {
    id: '15-companies',
    title: '15+ บริษัทประกัน',
    description: 'มีบริษัทประกันชั้นนำให้เลือกกว่า 15 บริษัท',
    icon: 'office-building',
  },
];

