import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Checkbox } from 'react-native-paper';
import type { DrivingInfo } from '../../types';

interface Props {
  data?: Partial<DrivingInfo>;
  onChange: (data: Partial<DrivingInfo>) => void;
}

export default function DrivingInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof DrivingInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ข้อมูลการขับขี่
      </Text>

      <TextInput
        label="ระยะเวลาที่มีใบขับขี่ (ปี)"
        value={data?.drivingLicenseYears || ''}
        onChangeText={(value) => updateField('drivingLicenseYears', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />

      <TextInput
        label="ประสบการณ์การขับขี่"
        value={data?.drivingExperience || ''}
        onChangeText={(value) => updateField('drivingExperience', value)}
        style={styles.input}
        mode="outlined"
        placeholder="เช่น 5 ปี, ขับขี่ประจำทุกวัน"
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.accidentHistory ? 'checked' : 'unchecked'}
          onPress={() => updateField('accidentHistory', !data?.accidentHistory)}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          มีประวัติอุบัติเหตุ
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.claimHistory ? 'checked' : 'unchecked'}
          onPress={() => updateField('claimHistory', !data?.claimHistory)}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          มีประวัติการเคลมประกัน
        </Text>
      </View>

      <TextInput
        label="จำนวนผู้ขับขี่หลัก"
        value={data?.numberOfDrivers || ''}
        onChangeText={(value) => updateField('numberOfDrivers', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />

      <TextInput
        label="อายุของผู้ขับขี่หลัก"
        value={data?.mainDriverAge || ''}
        onChangeText={(value) => updateField('mainDriverAge', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        maxLength={3}
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});

