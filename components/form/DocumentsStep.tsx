import React from 'react';
import { View, StyleSheet, Alert, Image, Platform, PermissionsAndroid } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import type { Documents } from '../../types';

interface Props {
  data?: Documents;
  onChange: (data: Documents) => void;
}

export default function DocumentsStep({ data, onChange }: Props) {
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'ต้องการเข้าถึงกล้อง',
            message: 'แอพต้องการเข้าถึงกล้องเพื่อถ่ายรูปเอกสาร',
            buttonNeutral: 'ถามภายหลัง',
            buttonNegative: 'ยกเลิก',
            buttonPositive: 'ตกลง',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  const handleImagePicker = (field: keyof Documents) => {
    Alert.alert(
      'เลือกรูปภาพ',
      'เลือกวิธีการอัปโหลดรูปภาพ',
      [
        {
          text: 'ถ่ายรูป',
          onPress: async () => {
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
              Alert.alert('ไม่ได้รับอนุญาต', 'กรุณาอนุญาตให้แอพเข้าถึงกล้องใน Settings');
              return;
            }

            launchCamera(
              {
                mediaType: 'photo' as MediaType,
                quality: 0.8,
                maxWidth: 1024,
                maxHeight: 1024,
              },
              (response: ImagePickerResponse) => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  Alert.alert('เกิดข้อผิดพลาด', response.errorMessage || 'ไม่สามารถถ่ายรูปได้');
                  return;
                }
                if (response.assets && response.assets[0]) {
                  const imageUri = response.assets[0].uri;
                  if (imageUri) {
                    onChange({
                      ...data,
                      [field]: imageUri,
                    } as Documents);
                  }
                }
              }
            );
          },
        },
        {
          text: 'เลือกจากแกลเลอรี่',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo' as MediaType,
                quality: 0.8,
                maxWidth: 1024,
                maxHeight: 1024,
              },
              (response: ImagePickerResponse) => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  Alert.alert('เกิดข้อผิดพลาด', response.errorMessage || 'ไม่สามารถเลือกรูปภาพได้');
                  return;
                }
                if (response.assets && response.assets[0]) {
                  const imageUri = response.assets[0].uri;
                  if (imageUri) {
                    onChange({
                      ...data,
                      [field]: imageUri,
                    } as Documents);
                  }
                }
              }
            );
          },
        },
        { text: 'ยกเลิก', style: 'cancel' },
      ]
    );
  };

  const getImageUri = (field: keyof Documents): string | undefined => {
    return data?.[field];
  };

  const removeImage = (field: keyof Documents) => {
    const newData = { ...data };
    delete newData[field];
    onChange(newData as Documents);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          เอกสารประกอบ
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          อัปโหลดรูปภาพเอกสารที่จำเป็น
        </Text>

        <View style={styles.documentContainer}>
          <View style={styles.documentItem}>
            <Button
              mode={getImageUri('idCardImage') ? 'contained' : 'outlined'}
              onPress={() => handleImagePicker('idCardImage')}
              style={styles.documentButton}
              icon={() => <MaterialCommunityIcons name="card-account-details" size={20} color={getImageUri('idCardImage') ? "#fff" : "#2196F3"} />}
            >
              บัตรประชาชน
            </Button>
            {getImageUri('idCardImage') && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: getImageUri('idCardImage') }} style={styles.previewImage} />
                <Button
                  mode="text"
                  onPress={() => removeImage('idCardImage')}
                  icon={() => <MaterialCommunityIcons name="close-circle" size={20} color="#f44336" />}
                  style={styles.removeButton}
                >
                  ลบ
                </Button>
              </View>
            )}
          </View>

          <View style={styles.documentItem}>
            <Button
              mode={getImageUri('vehicleRegistration') ? 'contained' : 'outlined'}
              onPress={() => handleImagePicker('vehicleRegistration')}
              style={styles.documentButton}
              icon={() => <MaterialCommunityIcons name="car" size={20} color={getImageUri('vehicleRegistration') ? "#fff" : "#2196F3"} />}
            >
              ทะเบียนรถ
            </Button>
            {getImageUri('vehicleRegistration') && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: getImageUri('vehicleRegistration') }} style={styles.previewImage} />
                <Button
                  mode="text"
                  onPress={() => removeImage('vehicleRegistration')}
                  icon={() => <MaterialCommunityIcons name="close-circle" size={20} color="#f44336" />}
                  style={styles.removeButton}
                >
                  ลบ
                </Button>
              </View>
            )}
          </View>

          <View style={styles.documentItem}>
            <Button
              mode={getImageUri('drivingLicense') ? 'contained' : 'outlined'}
              onPress={() => handleImagePicker('drivingLicense')}
              style={styles.documentButton}
              icon={() => <MaterialCommunityIcons name="card-account-details-outline" size={20} color={getImageUri('drivingLicense') ? "#fff" : "#2196F3"} />}
            >
              ใบขับขี่
            </Button>
            {getImageUri('drivingLicense') && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: getImageUri('drivingLicense') }} style={styles.previewImage} />
                <Button
                  mode="text"
                  onPress={() => removeImage('drivingLicense')}
                  icon={() => <MaterialCommunityIcons name="close-circle" size={20} color="#f44336" />}
                  style={styles.removeButton}
                >
                  ลบ
                </Button>
              </View>
            )}
          </View>

          <View style={styles.documentItem}>
            <Button
              mode={getImageUri('previousPolicy') ? 'contained' : 'outlined'}
              onPress={() => handleImagePicker('previousPolicy')}
              style={styles.documentButton}
              icon={() => <MaterialCommunityIcons name="file-document" size={20} color={getImageUri('previousPolicy') ? "#fff" : "#2196F3"} />}
            >
              กรมธรรม์เดิม (ถ้ามี)
            </Button>
            {getImageUri('previousPolicy') && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: getImageUri('previousPolicy') }} style={styles.previewImage} />
                <Button
                  mode="text"
                  onPress={() => removeImage('previousPolicy')}
                  icon={() => <MaterialCommunityIcons name="close-circle" size={20} color="#f44336" />}
                  style={styles.removeButton}
                >
                  ลบ
                </Button>
              </View>
            )}
          </View>
        </View>

        <Text variant="bodySmall" style={styles.note}>
          หมายเหตุ: สามารถข้ามขั้นตอนนี้และอัปโหลดภายหลังได้
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
  },
  title: {
    marginBottom: 15,
    color: '#2196F3',
  },
  subtitle: {
    marginBottom: 20,
    color: '#666',
  },
  documentContainer: {
    gap: 15,
    marginBottom: 20,
  },
  documentItem: {
    gap: 10,
  },
  documentButton: {
    paddingVertical: 8,
  },
  imagePreview: {
    marginTop: 10,
    alignItems: 'center',
    gap: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  removeButton: {
    marginTop: 5,
  },
  note: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});