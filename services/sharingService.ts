/**
 * Self-reliant Sharing Service
 * Wrapper สำหรับ sharing เพื่อลดการพึ่งพา Expo
 * ใช้ react-native-share แทน expo-sharing
 */

import Share from 'react-native-share';
import { Platform } from 'react-native';

class SharingService {
  /**
   * ตรวจสอบว่า sharing พร้อมใช้งานหรือไม่
   */
  async isAvailableAsync(): Promise<boolean> {
    // react-native-share ใช้ได้ทั้ง iOS และ Android
    return true;
  }

  /**
   * แชร์ไฟล์ (แทน expo-sharing shareAsync)
   */
  async shareAsync(fileUri: string, options: { mimeType?: string; dialogTitle?: string } = {}): Promise<void> {
    const { mimeType, dialogTitle } = options;

    try {
      const shareOptions = {
        url: Platform.OS === 'android' ? `file://${fileUri}` : fileUri,
        type: mimeType || 'text/csv',
        title: dialogTitle || 'ส่งออกข้อมูล',
        message: dialogTitle || 'ส่งออกข้อมูล',
      };

      await Share.open(shareOptions);
    } catch (error: any) {
      // User cancelled sharing
      if (error.message === 'User did not share') {
        return;
      }
      console.error('Sharing error:', error);
      throw new Error(`ไม่สามารถแชร์ไฟล์ได้: ${error.message}`);
    }
  }
}

// Export singleton instance
const sharingService = new SharingService();
export default sharingService;

// Export class สำหรับใช้ในที่อื่นถ้าต้องการ
export { SharingService };

