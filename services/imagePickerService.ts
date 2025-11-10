/**
 * Self-reliant Image Picker Service
 * Wrapper สำหรับ image picker เพื่อลดการพึ่งพา Expo
 * ใช้ react-native-image-picker แทน expo-image-picker
 */

import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { Platform, Alert, PermissionsAndroid } from 'react-native';

class ImagePickerService {
  /**
   * ขอ permission สำหรับ camera (Android)
   */
  async requestCameraPermissionsAsync(): Promise<{ status: 'granted' | 'denied' }> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'ต้องการสิทธิ์กล้อง',
            message: 'แอพต้องการเข้าถึงกล้องเพื่อถ่ายรูปเอกสาร',
            buttonNeutral: 'ถามภายหลัง',
            buttonNegative: 'ยกเลิก',
            buttonPositive: 'อนุญาต',
          }
        );
        return {
          status: granted === PermissionsAndroid.RESULTS.GRANTED ? 'granted' : 'denied',
        };
      } catch (err) {
        console.warn('Camera permission request error:', err);
        return { status: 'denied' };
      }
    }
    // iOS จะขอ permission อัตโนมัติเมื่อเรียก launchCamera
    return { status: 'granted' };
  }

  /**
   * ขอ permission สำหรับ media library (Android)
   */
  async requestMediaLibraryPermissionsAsync(): Promise<{ status: 'granted' | 'denied' }> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'ต้องการสิทธิ์เข้าถึงรูปภาพ',
            message: 'แอพต้องการเข้าถึงรูปภาพเพื่ออัปโหลดเอกสาร',
            buttonNeutral: 'ถามภายหลัง',
            buttonNegative: 'ยกเลิก',
            buttonPositive: 'อนุญาต',
          }
        );
        return {
          status: granted === PermissionsAndroid.RESULTS.GRANTED ? 'granted' : 'denied',
        };
      } catch (err) {
        console.warn('Media library permission request error:', err);
        return { status: 'denied' };
      }
    }
    // iOS จะขอ permission อัตโนมัติเมื่อเรียก launchImageLibrary
    return { status: 'granted' };
  }

  /**
   * เปิด image library (แทน expo-image-picker launchImageLibraryAsync)
   */
  async launchImageLibraryAsync(options: {
    mediaTypes?: 'images' | 'videos' | 'all';
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
  } = {}): Promise<ImagePickerResponse> {
    const { mediaTypes = 'images', allowsEditing = true, aspect, quality = 0.8 } = options;

    const imageLibraryOptions: ImageLibraryOptions = {
      mediaType: mediaTypes === 'images' ? 'photo' : mediaTypes === 'videos' ? 'video' : 'mixed',
      quality,
      selectionLimit: 1,
    };

    if (allowsEditing && aspect) {
      imageLibraryOptions.cropStyle = 'default';
    }

    return new Promise((resolve) => {
      launchImageLibrary(imageLibraryOptions, (response) => {
        // แปลง response format ให้เหมือน expo-image-picker
        if (response.didCancel) {
          resolve({
            canceled: true,
            assets: [],
          } as any);
        } else if (response.assets && response.assets.length > 0) {
          resolve({
            canceled: false,
            assets: response.assets.map(asset => ({
              uri: asset.uri || '',
              width: asset.width,
              height: asset.height,
              fileName: asset.fileName,
              type: asset.type,
              fileSize: asset.fileSize,
            })),
          } as any);
        } else {
          resolve({
            canceled: true,
            assets: [],
          } as any);
        }
      });
    });
  }

  /**
   * เปิด camera (แทน expo-image-picker launchCameraAsync)
   */
  async launchCameraAsync(options: {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
  } = {}): Promise<ImagePickerResponse> {
    const { allowsEditing = true, aspect, quality = 0.8 } = options;

    // ตรวจสอบ permission ก่อน
    const { status } = await this.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('ต้องใช้สิทธิ์', 'ต้องการเข้าถึงกล้องเพื่อถ่ายรูปเอกสาร');
      return {
        canceled: true,
        assets: [],
      } as any;
    }

    const cameraOptions: CameraOptions = {
      mediaType: 'photo',
      quality,
      saveToPhotos: false,
    };

    if (allowsEditing && aspect) {
      cameraOptions.cropStyle = 'default';
    }

    return new Promise((resolve) => {
      launchCamera(cameraOptions, (response) => {
        // แปลง response format ให้เหมือน expo-image-picker
        if (response.didCancel) {
          resolve({
            canceled: true,
            assets: [],
          } as any);
        } else if (response.assets && response.assets.length > 0) {
          resolve({
            canceled: false,
            assets: response.assets.map(asset => ({
              uri: asset.uri || '',
              width: asset.width,
              height: asset.height,
              fileName: asset.fileName,
              type: asset.type,
              fileSize: asset.fileSize,
            })),
          } as any);
        } else {
          resolve({
            canceled: true,
            assets: [],
          } as any);
        }
      });
    });
  }

  /**
   * Constants สำหรับ media types (เพื่อความเข้ากันได้กับ expo-image-picker)
   */
  static MediaTypeOptions = {
    Images: 'images' as const,
    Videos: 'videos' as const,
    All: 'all' as const,
  };
}

// Export singleton instance
const imagePickerService = new ImagePickerService();
export default imagePickerService;

// Export class สำหรับใช้ในที่อื่นถ้าต้องการ
export { ImagePickerService };

