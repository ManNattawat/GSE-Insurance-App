export interface InsuranceCompany {
  id: string;
  name: string;
  nameEn?: string;
}

export const INSURANCE_COMPANIES: InsuranceCompany[] = [
  { id: 'viriya', name: 'วิริยะประกันภัย', nameEn: 'Viriya Insurance' },
  { id: 'bki', name: 'บีเคไอ ประกันภัย', nameEn: 'BKI Insurance' },
  { id: 'tokio-marine', name: 'โตเกียว มารีน', nameEn: 'Tokio Marine' },
  { id: 'sri-muang', name: 'ศรีเมืองประกันภัย', nameEn: 'Sri Muang Insurance' },
  { id: 'ayudhya', name: 'กรุงเทพ-ประกันภัย', nameEn: 'Bangkok Insurance' },
  { id: 'aia', name: 'เอไอเอ', nameEn: 'AIA' },
  { id: 'cooperate', name: 'คูเปอร์เรท', nameEn: 'Cooperate Insurance' },
  { id: 'thai-re', name: 'ไทยรี', nameEn: 'Thai Re' },
  { id: 'thavi', name: 'ทวิประกันภัย', nameEn: 'Thavi Insurance' },
  { id: 'msig', name: 'เอ็มเอสไอจี', nameEn: 'MSIG' },
  { id: 'thai-nakorn', name: 'ไทยนครประกันภัย', nameEn: 'Thai Nakorn Insurance' },
  { id: 'thanachart', name: 'ธนชาตประกันภัย', nameEn: 'Thanachart Insurance' },
  { id: 'ergo', name: 'เออร์โก', nameEn: 'ERGO' },
  { id: 'allianz', name: 'อัลเลียนซ์', nameEn: 'Allianz' },
  { id: 'sompo', name: 'ซอมโป', nameEn: 'SOMPO' },
];