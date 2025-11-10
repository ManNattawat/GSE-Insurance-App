// Self-reliant: ใช้ imagePickerService wrapper แทน expo-image-picker
import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imagePickerService from '../../services/imagePickerService';
import type { Documents } from '../../types';

interface Props {
  data?: Partial<Documents>;
  onChange: (data: Partial<Documents>) => void;
}

export default function DocumentsStep({ data, onChange }: Props) {
  const pickImage = async (field: keyof Documents) => {
    const { status } = await imagePickerService.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('ต้องใช้สิทธิ์', 'ต้องการเข้าถึงรูปภาพเพื่ออัปโหลดเอกสาร');
      return;
    }

    const result = await imagePickerService.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onChange({
        ...data,
        [field]: result.assets[0].uri,
      });
    }
  };

  const takePhoto = async (field: keyof Documents) => {
    const { status } = await imagePickerService.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('ต้องใช้สิทธิ์', 'ต้องการเข้าถึงกล้องเพื่อถ่ายรูปเอกสาร');
      return;
    }

    const result = await imagePickerService.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onChange({
        ...data,
        [field]: result.assets[0].uri,
      });
    }
  };

  const showImageOptions = (field: keyof Documents) => {
    Alert.alert(
      'เลือกวิธี',
      'คุณต้องการอัปโหลดเอกสารอย่างไร?',
      [
        { text: 'ถ่ายรูป', onPress: () => takePhoto(field) },
        { text: 'เลือกรูป', onPress: () => pickImage(field) },
        { text: 'ยกเลิก', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        เอกสารประกอบ
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.docTitle}>
            สำเนาบัตรประชาชน
          </Text>
          {data?.idCardImage ? (
            <Image source={{ uri: data.idCardImage }} style={styles.image} />
          ) : (
            <Text variant="bodySmall" style={styles.placeholder}>
              ยังไม่ได้อัปโหลด
            </Text>
          )}
          <Button
            mode="outlined"
            onPress={() => showImageOptions('idCardImage')}
            style={styles.button}
            icon={() => <MaterialCommunityIcons name="camera" size={20} color="#2196F3" />}
          >
            {data?.idCardImage ? 'เปลี่ยนรูป' : 'อัปโหลด'}
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.docTitle}>
            สำเนาทะเบียนรถยนต์
          </Text>
          {data?.vehicleRegistration ? (
            <Image source={{ uri: data.vehicleRegistration }} style={styles.image} />
          ) : (
            <Text variant="bodySmall" style={styles.placeholder}>
              ยังไม่ได้อัปโหลด
            </Text>
          )}
          <Button
            mode="outlined"
            onPress={() => showImageOptions('vehicleRegistration')}
            style={styles.button}
            icon={() => <MaterialCommunityIcons name="camera" size={20} color="#2196F3" />}
          >
            {data?.vehicleRegistration ? 'เปลี่ยนรูป' : 'อัปโหลด'}
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.docTitle}>
            สำเนาใบขับขี่
          </Text>
          {data?.drivingLicense ? (
            <Image source={{ uri: data.drivingLicense }} style={styles.image} />
          ) : (
            <Text variant="bodySmall" style={styles.placeholder}>
              ยังไม่ได้อัปโหลด
            </Text>
          )}
          <Button
            mode="outlined"
            onPress={() => showImageOptions('drivingLicense')}
            style={styles.button}
            icon={() => <MaterialCommunityIcons name="camera" size={20} color="#2196F3" />}
          >
            {data?.drivingLicense ? 'เปลี่ยนรูป' : 'อัปโหลด'}
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.docTitle}>
            สำเนากรมธรรม์ประกันเดิม (ถ้ามี)
          </Text>
          {data?.previousPolicy ? (
            <Image source={{ uri: data.previousPolicy }} style={styles.image} />
          ) : (
            <Text variant="bodySmall" style={styles.placeholder}>
              ยังไม่ได้อัปโหลด (ไม่บังคับ)
            </Text>
          )}
          <Button
            mode="outlined"
            onPress={() => showImageOptions('previousPolicy')}
            style={styles.button}
            icon={() => <MaterialCommunityIcons name="camera" size={20} color="#2196F3" />}
          >
            {data?.previousPolicy ? 'เปลี่ยนรูป' : 'อัปโหลด'}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 20,
    color: '#2196F3',
  },
  card: {
    marginBottom: 15,
    elevation: 2,
  },
  docTitle: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  placeholder: {
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 5,
  },
});

