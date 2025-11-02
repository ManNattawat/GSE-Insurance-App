import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, SegmentedButtons } from 'react-native-paper';
import type { VehicleInfo } from '../../types';

interface Props {
  data?: Partial<VehicleInfo>;
  onChange: (data: Partial<VehicleInfo>) => void;
}

export default function VehicleInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof VehicleInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ข้อมูลรถยนต์
      </Text>

      <TextInput
        label="ยี่ห้อรถ"
        value={data?.brand || ''}
        onChangeText={(value) => updateField('brand', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="รุ่นรถ"
        value={data?.model || ''}
        onChangeText={(value) => updateField('model', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="ปีที่ผลิต"
        value={data?.year || ''}
        onChangeText={(value) => updateField('year', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        maxLength={4}
      />

      <TextInput
        label="เลขทะเบียนรถ"
        value={data?.licensePlate || ''}
        onChangeText={(value) => updateField('licensePlate', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="เลขตัวถัง (VIN)"
        value={data?.vin || ''}
        onChangeText={(value) => updateField('vin', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="เลขเครื่องยนต์"
        value={data?.engineNumber || ''}
        onChangeText={(value) => updateField('engineNumber', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="สีรถ"
        value={data?.color || ''}
        onChangeText={(value) => updateField('color', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="ขนาดเครื่องยนต์ (ซีซี)"
        value={data?.engineSize || ''}
        onChangeText={(value) => updateField('engineSize', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />

      <Text variant="bodyMedium" style={styles.label}>
        ประเภทการใช้งาน
      </Text>
      <SegmentedButtons
        value={data?.usageType || 'personal'}
        onValueChange={(value) => updateField('usageType', value)}
        buttons={[
          { value: 'personal', label: 'ส่วนบุคคล' },
          { value: 'commercial', label: 'พาณิชย์' },
        ]}
        style={styles.segmented}
      />
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
  input: {
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
  },
  segmented: {
    marginBottom: 15,
  },
});

