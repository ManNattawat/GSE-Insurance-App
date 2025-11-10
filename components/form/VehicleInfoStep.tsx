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
        label="รุ่นย่อย"
        value={data?.subModel || ''}
        onChangeText={(value) => updateField('subModel', value)}
        style={styles.input}
        mode="outlined"
        placeholder="กรอกรุ่นย่อย (ถ้ามี)"
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
        ประเภทรถ
      </Text>
      <SegmentedButtons
        value={data?.vehicleType || 'sedan'}
        onValueChange={(value) => updateField('vehicleType', value)}
        buttons={[
          { value: 'sedan', label: 'เก๋ง' },
          { value: 'pickup4door', label: 'กระบะ 4 ประตู' },
          { value: 'pickupHalfCab', label: 'กระบะตอนครึ่ง' },
          { value: 'pickupSingleCab', label: 'กระบะตอนเดียว' },
          { value: 'van', label: 'รถตู้' },
          { value: 'other', label: 'อื่นๆ' },
        ]}
        style={styles.segmented}
        multiSelect={false}
      />

      {data?.vehicleType === 'other' && (
        <TextInput
          label="ระบุประเภทรถ"
          value={data?.vehicleTypeOther || ''}
          onChangeText={(value) => updateField('vehicleTypeOther', value)}
          style={styles.input}
          mode="outlined"
          placeholder="กรอกประเภทรถ"
        />
      )}

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

      <TextInput
        label="อุปกรณ์ตกแต่งรถ"
        value={data?.accessories || ''}
        onChangeText={(value) => updateField('accessories', value)}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={3}
        placeholder="ระบุอุปกรณ์ตกแต่งรถ (ถ้ามี)"
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

