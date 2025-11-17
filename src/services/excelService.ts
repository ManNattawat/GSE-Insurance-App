import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';
import { Customer } from '../types/customer';

export const excelService = {
  // Export ข้อมูลลูกค้าเป็น Excel
  async exportToExcel(customers: Customer[]): Promise<void> {
    // เตรียมข้อมูลสำหรับ Excel
    const data = customers.map((customer) => ({
      'รหัส': customer.id || '',
      'ชื่อ-นามสกุล': customer.name,
      'เบอร์โทร': customer.phone,
      'อีเมล': customer.email || '',
      'ที่อยู่': customer.address || '',
      'ประเภทประกัน': customer.insurance_type || '',
      'เลขที่กรมธรรม์': customer.policy_number || '',
      'สถานะ': customer.status || '',
      'วันที่สร้าง': customer.created_at ? new Date(customer.created_at).toLocaleDateString('th-TH') : '',
      'วันที่อัปเดต': customer.updated_at ? new Date(customer.updated_at).toLocaleDateString('th-TH') : '',
    }));

    // สร้าง Workbook
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ลูกค้า');

    // แปลงเป็นไฟล์
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const uri = FileSystem.documentDirectory + `customers_${Date.now()}.xlsx`;

    // บันทึกไฟล์
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // แชร์ไฟล์
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'ส่งออกข้อมูลลูกค้า',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  },
};

