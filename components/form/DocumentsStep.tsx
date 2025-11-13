import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { Documents } from '../../types';

interface Props {
  data?: Documents;
  onChange: (data: Documents) => void;
}

export default function DocumentsStep({ data, onChange }: Props) {
  const handleImagePicker = (field: keyof Documents) => {
    Alert.alert(
      'เลือกรูปภาพ',
      'เลือกวิธีการอัปโหลดรูปภาพ',
      [
        { text: 'ถ่ายรูป', onPress: () => console.log('Camera') },
        { text: 'เลือกจากแกลเลอรี่', onPress: () => console.log('Gallery') },
        { text: 'ยกเลิก', style: 'cancel' },
      ]
    );
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
          <Button
            mode="outlined"
            onPress={() => handleImagePicker('idCardImage')}
            style={styles.documentButton}
            icon={() => <MaterialCommunityIcons name="card-account-details" size={20} color="#2196F3" />}
          >
            บัตรประชาชน
          </Button>

          <Button
            mode="outlined"
            onPress={() => handleImagePicker('vehicleRegistration')}
            style={styles.documentButton}
            icon={() => <MaterialCommunityIcons name="car" size={20} color="#2196F3" />}
          >
            ทะเบียนรถ
          </Button>

          <Button
            mode="outlined"
            onPress={() => handleImagePicker('drivingLicense')}
            style={styles.documentButton}
            icon={() => <MaterialCommunityIcons name="card-account-details-outline" size={20} color="#2196F3" />}
          >
            ใบขับขี่
          </Button>

          <Button
            mode="outlined"
            onPress={() => handleImagePicker('previousPolicy')}
            style={styles.documentButton}
            icon={() => <MaterialCommunityIcons name="file-document" size={20} color="#2196F3" />}
          >
            กรมธรรม์เดิม (ถ้ามี)
          </Button>
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
  documentButton: {
    paddingVertical: 8,
  },
  note: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});