import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import type { CustomerData } from '../types';

/**
 * แปลงข้อมูลลูกค้าเป็น CSV format ตามแบบฟอร์ม
 */
export function formatCustomerDataForExport(customers: CustomerData[]): string {
  // Header row
  const headers = [
    'ลำดับที่',
    'ชื่อ-นามสกุล (ลูกค้า)',
    'เบอร์โทรศัพท์ (ลูกค้า)',
    'ทะเบียนรถ',
    'ยี่ห้อรถ/รุ่นรถ',
    'บริษัทประกันเดิม',
    'วันที่สิ้นสุดความคุ้มครอง',
    'ชื่อ-นามสกุล (พนักงานขาย)',
    'เบอร์โทรศัพท์ (พนักงานขาย)',
    'หมายเหตุ',
  ];

  // Data rows
  const rows = customers.map((customer, index) => {
    const personalInfo = customer.personalInfo || {};
    const vehicleInfo = customer.vehicleInfo || {};
    const insuranceInfo = customer.insuranceInfo || {};
    const salespersonInfo = customer.salespersonInfo || {};

    return [
      (index + 1).toString(), // ลำดับที่
      `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim(), // ชื่อ-นามสกุล (ลูกค้า)
      personalInfo.phone || '', // เบอร์โทรศัพท์ (ลูกค้า)
      vehicleInfo.licensePlate || '', // ทะเบียนรถ
      `${vehicleInfo.brand || ''} ${vehicleInfo.model || ''}`.trim(), // ยี่ห้อรถ/รุ่นรถ
      insuranceInfo.previousInsuranceCompany || '', // บริษัทประกันเดิม
      insuranceInfo.coverageEndDate || '', // วันที่สิ้นสุดความคุ้มครอง
      salespersonInfo.name || '', // ชื่อ-นามสกุล (พนักงานขาย)
      salespersonInfo.phone || '', // เบอร์โทรศัพท์ (พนักงานขาย)
      customer.notes || '', // หมายเหตุ
    ];
  });

  // Combine headers and rows
  const csvRows = [headers, ...rows];

  // Convert to CSV format (handle commas and quotes)
  return csvRows
    .map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma or quote
          const cellStr = String(cell || '');
          if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        })
        .join(',')
    )
    .join('\n');
}

/**
 * สร้างไฟล์ CSV และแชร์
 */
export async function exportToCSV(
  customers: CustomerData[],
  month?: string
): Promise<void> {
  try {
    const csvContent = formatCustomerDataForExport(customers);
    const fileName = `รายชื่อลูกค้าใหม่_ประกันรถยนต์_${month || 'เดือน'}_${new Date().getTime()}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    // Write file
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Check if sharing is available
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'ส่งออกข้อมูลลูกค้า',
      });
    } else {
      throw new Error('การแชร์ไฟล์ไม่พร้อมใช้งาน');
    }
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
}

/**
 * สร้างข้อมูลสำหรับ PDF (HTML format)
 */
export function formatCustomerDataForPDF(customers: CustomerData[], month?: string): string {
  const monthText = month || 'เดือน ....................................';
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Sarabun', 'TH Sarabun New', sans-serif;
          font-size: 14px;
          padding: 20px;
        }
        h1 {
          text-align: center;
          font-size: 18px;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>
    </head>
    <body>
      <h1>แบบฟอร์ม รายชื่อลูกค้าใหม่ ประกันรถยนต์ ${monthText}</h1>
      <table>
        <thead>
          <tr>
            <th>ลำดับที่</th>
            <th>ชื่อ-นามสกุล (ลูกค้า)</th>
            <th>เบอร์โทรศัพท์ (ลูกค้า)</th>
            <th>ทะเบียนรถ</th>
            <th>ยี่ห้อรถ/รุ่นรถ</th>
            <th>บริษัทประกันเดิม</th>
            <th>วันที่สิ้นสุดความคุ้มครอง</th>
            <th>ชื่อ-นามสกุล (พนักงานขาย)</th>
            <th>เบอร์โทรศัพท์ (พนักงานขาย)</th>
            <th>หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
  `;

  customers.forEach((customer, index) => {
    const personalInfo = customer.personalInfo || {};
    const vehicleInfo = customer.vehicleInfo || {};
    const insuranceInfo = customer.insuranceInfo || {};
    const salespersonInfo = customer.salespersonInfo || {};

    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${`${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim()}</td>
        <td>${personalInfo.phone || ''}</td>
        <td>${vehicleInfo.licensePlate || ''}</td>
        <td>${`${vehicleInfo.brand || ''} ${vehicleInfo.model || ''}`.trim()}</td>
        <td>${insuranceInfo.previousInsuranceCompany || ''}</td>
        <td>${insuranceInfo.coverageEndDate || ''}</td>
        <td>${salespersonInfo.name || ''}</td>
        <td>${salespersonInfo.phone || ''}</td>
        <td>${customer.notes || ''}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  return html;
}

