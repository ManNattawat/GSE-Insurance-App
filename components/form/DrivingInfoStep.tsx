import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Card, Button } from 'react-native-paper';
import type { DrivingInfo } from '../../types';

interface Props {
  data?: DrivingInfo;
  onChange: (data: DrivingInfo) => void;
}

export default function DrivingInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof DrivingInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    } as DrivingInfo);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          ข้อมูลการขับขี่
        </Text>

        <TextInput
          label="ประสบการณ์ขับขี่ (ปี)"
          value={data?.drivingExperience || ''}
          onChangeText={(value) => updateField('drivingExperience', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <TextInput
          label="อายุผู้ขับขี่หลัก"
          value={data?.mainDriverAge || ''}
          onChangeText={(value) => updateField('mainDriverAge', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <TextInput
          label="จำนวนผู้ขับขี่"
          value={data?.numberOfDrivers || ''}
          onChangeText={(value) => updateField('numberOfDrivers', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <Text variant="bodyMedium" style={styles.label}>
          ประวัติอุบัติเหตุ
        </Text>
        <View style={styles.segmentedContainer}>
          <Button
            mode={data?.accidentHistory === false ? 'contained' : 'outlined'}
            onPress={() => updateField('accidentHistory', false)}
            style={styles.segmentedButton}
          >
            ไม่มี
          </Button>
          <Button
            mode={data?.accidentHistory === true ? 'contained' : 'outlined'}
            onPress={() => updateField('accidentHistory', true)}
            style={styles.segmentedButton}
          >
            มี
          </Button>
        </View>

        <Text variant="bodyMedium" style={styles.label}>
          ประวัติการเคลม
        </Text>
        <View style={styles.segmentedContainer}>
          <Button
            mode={data?.claimHistory === false ? 'contained' : 'outlined'}
            onPress={() => updateField('claimHistory', false)}
            style={styles.segmentedButton}
          >
            ไม่มี
          </Button>
          <Button
            mode={data?.claimHistory === true ? 'contained' : 'outlined'}
            onPress={() => updateField('claimHistory', true)}
            style={styles.segmentedButton}
          >
            มี
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