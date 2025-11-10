/**
 * Self-reliant File Service
 * Wrapper สำหรับ file operations เพื่อลดการพึ่งพา Expo
 * ใช้ react-native-fs แทน expo-file-system
 */

import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

class FileService {
  /**
   * อ่านไฟล์เป็น string (แทน expo-file-system readAsStringAsync)
   */
  async readAsStringAsync(fileUri: string, options: { encoding?: 'utf8' | 'base64' } = {}): Promise<string> {
    const { encoding = 'utf8' } = options;

    try {
      if (encoding === 'base64') {
        return await RNFS.readFile(fileUri, 'base64');
      }
      return await RNFS.readFile(fileUri, 'utf8');
    } catch (error: any) {
      console.error('File read error:', error);
      throw new Error(`ไม่สามารถอ่านไฟล์ได้: ${error.message}`);
    }
  }

  /**
   * เขียนไฟล์ (แทน expo-file-system writeAsStringAsync)
   */
  async writeAsStringAsync(fileUri: string, contents: string, options: { encoding?: 'utf8' | 'base64' } = {}): Promise<void> {
    const { encoding = 'utf8' } = options;

    try {
      if (encoding === 'base64') {
        await RNFS.writeFile(fileUri, contents, 'base64');
      } else {
        await RNFS.writeFile(fileUri, contents, 'utf8');
      }
    } catch (error: any) {
      console.error('File write error:', error);
      throw new Error(`ไม่สามารถเขียนไฟล์ได้: ${error.message}`);
    }
  }

  /**
   * ดึง document directory path
   */
  get documentDirectory(): string {
    return Platform.OS === 'ios' 
      ? RNFS.DocumentDirectoryPath 
      : RNFS.DocumentDirectoryPath;
  }

  /**
   * Constants สำหรับ encoding (เพื่อความเข้ากันได้กับ expo-file-system)
   */
  static EncodingType = {
    UTF8: 'utf8' as const,
    Base64: 'base64' as const,
  };
}

// Export singleton instance
const fileService = new FileService();
export default fileService;

// Export class สำหรับใช้ในที่อื่นถ้าต้องการ
export { FileService };

