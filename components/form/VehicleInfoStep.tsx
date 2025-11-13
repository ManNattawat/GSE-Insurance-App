import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Card, Button } from 'react-native-paper';
import type { VehicleInfo } from '../../types';

interface Props {
  data?: VehicleInfo;
  onChange: (data: VehicleInfo) => void;
}

export default function VehicleInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof VehicleInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    } as VehicleInfo);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          ข้อมูลรถยนต์
        </Text>

        <TextInput
          label="ยี่ห้อรถ *"
          value={data?.brand || ''}
          onChangeText={(value) => updateField('brand', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="รุ่นรถ *"
          value={data?.model || ''}
          onChangeText={(value) => updateField('model', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="รุ่นย่อย"
          value={data?.subModel || ''}
          onChangeText={(value) => updateField('subModel', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="ปีรถ *"
          value={data?.year || ''}
          onChangeText={(value) => updateField('year', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          maxLength={4}
        />

        <TextInput
          label="เลขทะเบียนรถ *"
          value={data?.licensePlate || ''}
          onChangeText={(value) => updateField('licensePlate', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="เลข VIN *"
          value={data?.vin || ''}
          onChangeText={(value) => updateField('vin', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="เลขเครื่องยนต์ *"
          value={data?.engineNumber || ''}
          onChangeText={(value) => updateField('engineNumber', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="สีรถ *"
          value={data?.color || ''}
          onChangeText={(value) => updateField('color', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="ขนาดเครื่องยนต์ (ซีซี) *"
          value={data?.engineSize || ''}
          onChangeText={(value) => updateField('engineSize', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <Text variant="bodyMedium" style={styles.label}>
          ประเภทการใช้งาน *
        </Text>
        <View style={styles.segmentedContainer}>
          <Button
            mode={data?.usageType === 'personal' ? 'contained' : 'outlined'}
            onPress={() => updateField('usageType', 'personal')}
            style={styles.segmentedButton}
          >
            ใช้ส่วนตัว
          </Button>
          <Button
            mode={data?.usageType === 'commercial' ? 'contained' : 'outlined'}
            onPress={() => updateField('usageType', 'commercial')}
            style={styles.segmentedButton}
          >
            ใช้เชิงพาณิชย์
          </Button>
        </View>
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
  input: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
  },
  segmentedContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  segmentedButton: {
    flex: 1,
  },
});