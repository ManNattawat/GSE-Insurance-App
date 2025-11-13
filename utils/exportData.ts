import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import type { CustomerData } from '../types';

export async function exportToCSV(customers: CustomerData[], monthText: string) {
  try {
    // สร้าง CSV header
    const headers = [
      'วันที่สร้าง',
      'ชื่อ-นามสกุล',
      'เบอร์โทรศัพท์',
      'อีเมล',
      'ยี่ห้อรถ',
      'รุ่นรถ',
      'ปีรถ',
      'เลขทะเบียน',
      'ประเภทประกัน',
      'สถานะ',
      'พนักงานขาย',
      'หมายเหตุ'
    ];

    // แปลงข้อมูลเป็น CSV rows
    const rows = customers.map(customer => [
      customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('th-TH') : '',
      `${customer.personalInfo?.firstName || ''} ${customer.personalInfo?.lastName || ''}`.trim(),
      customer.personalInfo?.phone || '',
      customer.personalInfo?.email || '',
      customer.vehicleInfo?.brand || '',
      customer.vehicleInfo?.model || '',
      customer.vehicleInfo?.year || '',
      customer.vehicleInfo?.licensePlate || '',
      getInsuranceTypeText(customer.insuranceInfo?.insuranceType),
      customer.insuranceInfo?.status === 'new' ? 'สมัครใหม่' : 'ต่ออายุ',
      customer.salespersonInfo?.name || '',
      customer.notes || ''
    ]);

    // รวม header และ rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // เพิ่ม BOM สำหรับ UTF-8 เพื่อให้ Excel แสดงภาษาไทยได้ถูกต้อง
    const csvWithBOM = '\uFEFF' + csvContent;

    // สร้างชื่อไฟล์
    const fileName = `ลูกค้าประกันภัย_${monthText}.csv`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    // เขียนไฟล์
    await RNFS.writeFile(filePath, csvWithBOM, 'utf8');

    // แชร์ไฟล์
    const shareOptions = {
      title: 'ส่งออกข้อมูลลูกค้า',
      message: `ข้อมูลลูกค้าประกันภัย ${monthText}`,
      url: `file://${filePath}`,
      type: 'text/csv',
    };

    await Share.open(shareOptions);

  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
}

function getInsuranceTypeText(type?: string): string {
  switch (type) {
    case 'class1': return 'ชั้น 1';
    case 'class2plus': return 'ชั้น 2+';
    case 'class3plus': return 'ชั้น 3+';
    case 'class3': return 'ชั้น 3';
    default: return '';
  }
}