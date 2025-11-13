import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Card, Button, Checkbox } from 'react-native-paper';
import type { InsuranceInfo } from '../../types';

interface Props {
  data?: InsuranceInfo;
  onChange: (data: InsuranceInfo) => void;
}

export default function InsuranceInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof InsuranceInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    } as InsuranceInfo);
  };

  const updateAdditionalCoverage = (field: string, value: boolean) => {
    onChange({
      ...data,
      additionalCoverage: {
        ...data?.additionalCoverage,
        [field]: value,
      },
    } as InsuranceInfo);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          ข้อมูลประกันภัย
        </Text>

        <Text variant="bodyMedium" style={styles.label}>
          ประเภทประกัน *
        </Text>
        <View style={styles.segmentedContainer}>
          <Button
            mode={data?.insuranceType === 'class1' ? 'contained' : 'outlined'}
            onPress={() => updateField('insuranceType', 'class1')}
            style={styles.segmentedButton}
          >
            ชั้น 1
          </Button>
          <Button
            mode={data?.insuranceType === 'class2plus' ? 'contained' : 'outlined'}
            onPress={() => updateField('insuranceType', 'class2plus')}
            style={styles.segmentedButton}
          >
            2+
          </Button>
          <Button
            mode={data?.insuranceType === 'class3plus' ? 'contained' : 'outlined'}
            onPress={() => updateField('insuranceType', 'class3plus')}
            style={styles.segmentedButton}
          >
            3+
          </Button>
          <Button
            mode={data?.insuranceType === 'class3' ? 'contained' : 'outlined'}
            onPress={() => updateField('insuranceType', 'class3')}
            style={styles.segmentedButton}
          >
            3
          </Button>
        </View>

        <TextInput
          label="ทุนประกัน (บาท)"
          value={data?.coverageAmount || ''}
          onChangeText={(value) => updateField('coverageAmount', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <TextInput
          label="ระยะเวลาคุ้มครอง (เดือน)"
          value={data?.coveragePeriod || ''}
          onChangeText={(value) => updateField('coveragePeriod', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <Text variant="bodyMedium" style={styles.label}>
          ความคุ้มครองเพิ่มเติม
        </Text>

        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="น้ำท่วม"
            status={data?.additionalCoverage?.flood ? 'checked' : 'unchecked'}
            onPress={() => updateAdditionalCoverage('flood', !data?.additionalCoverage?.flood)}
          />
          <Checkbox.Item
            label="ขโมย"
            status={data?.additionalCoverage?.theft ? 'checked' : 'unchecked'}
            onPress={() => updateAdditionalCoverage('theft', !data?.additionalCoverage?.theft)}
          />
          <Checkbox.Item
            label="ค่ารักษาพยาบาล"
            status={data?.additionalCoverage?.medical ? 'checked' : 'unchecked'}
            onPress={() => updateAdditionalCoverage('medical', !data?.additionalCoverage?.medical)}
          />
          <Checkbox.Item
            label="อุบัติเหตุส่วนบุคคล"
            status={data?.additionalCoverage?.personalAccident ? 'checked' : 'unchecked'}
            onPress={() => updateAdditionalCoverage('personalAccident', !data?.additionalCoverage?.personalAccident)}
          />
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
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  segmentedButton: {
    flex: 1,
    minWidth: 80,
  },
  checkboxContainer: {
    marginBottom: 15,
  },
});