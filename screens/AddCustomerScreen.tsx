import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList, Customer } from '../types';

type AddCustomerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddCustomer'>;

const STORAGE_KEY = '@customers';

export default function AddCustomerScreen() {
  const navigation = useNavigation<AddCustomerScreenNavigationProp>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [insuranceType, setInsuranceType] = useState('ชั้น 1');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !phone.trim() || !licensePlate.trim()) {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      setSaving(true);

      // โหลดข้อมูลเก่า
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const customers: Customer[] = existingData ? JSON.parse(existingData) : [];

      // สร้างลูกค้าใหม่
      const newCustomer: Customer = {
        id: `customer_${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        licensePlate: licensePlate.trim(),
        insuranceType,
        createdAt: new Date().toISOString(),
      };

      // เพิ่มลูกค้าใหม่
      customers.push(newCustomer);

      // บันทึก
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(customers));

      Alert.alert('สำเร็จ', 'บันทึกข้อมูลเรียบร้อยแล้ว', [
        {
          text: 'ตกลง',
          onPress: () => {
            // รีเซ็ตฟอร์ม
            setName('');
            setPhone('');
            setLicensePlate('');
            setInsuranceType('ชั้น 1');
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้');
      console.error('Error saving customer:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลลูกค้า
          </Text>

          <TextInput
            label="ชื่อ-นามสกุล *"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="เบอร์โทรศัพท์ *"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            label="เลขทะเบียนรถ *"
            value={licensePlate}
            onChangeText={setLicensePlate}
            mode="outlined"
            style={styles.input}
          />

          <Text variant="bodyMedium" style={styles.label}>
            ประเภทประกัน *
          </Text>
          <View style={styles.buttonRow}>
            {['ชั้น 1', 'ชั้น 2+', 'ชั้น 3+', 'ชั้น 3'].map((type) => (
              <Button
                key={type}
                mode={insuranceType === type ? 'contained' : 'outlined'}
                onPress={() => setInsuranceType(type)}
                style={styles.typeButton}
              >
                {type}
              </Button>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            loading={saving}
            disabled={saving}
          >
            บันทึกข้อมูล
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 20,
    color: '#2196F3',
  },
  input: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    minWidth: 80,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 8,
  },
});

