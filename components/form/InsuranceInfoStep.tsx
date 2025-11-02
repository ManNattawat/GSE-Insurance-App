import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, SegmentedButtons, Checkbox } from 'react-native-paper';
import type { InsuranceInfo } from '../../types';

interface Props {
  data?: Partial<InsuranceInfo>;
  onChange: (data: Partial<InsuranceInfo>) => void;
}

export default function InsuranceInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof InsuranceInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const updateAdditionalCoverage = (field: keyof InsuranceInfo['additionalCoverage'], value: boolean) => {
    onChange({
      ...data,
      additionalCoverage: {
        ...data?.additionalCoverage,
        [field]: value,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ข้อมูลประกันภัย
      </Text>

      <Text variant="bodyMedium" style={styles.label}>
        ประเภทประกัน
      </Text>
      <SegmentedButtons
        value={data?.insuranceType || 'class1'}
        onValueChange={(value) => updateField('insuranceType', value)}
        buttons={[
          { value: 'class1', label: 'ชั้น 1' },
          { value: 'class2plus', label: '2+' },
          { value: 'class3plus', label: '3+' },
          { value: 'class3', label: '3' },
        ]}
        style={styles.segmented}
      />

      <TextInput
        label="ทุนประกัน (บาท)"
        value={data?.coverageAmount || ''}
        onChangeText={(value) => updateField('coverageAmount', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />

      <Text variant="bodyMedium" style={styles.sectionTitle}>
        ความคุ้มครองเพิ่มเติม
      </Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.additionalCoverage?.flood ? 'checked' : 'unchecked'}
          onPress={() => updateAdditionalCoverage('flood', !data?.additionalCoverage?.flood)}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          คุ้มครองน้ำท่วม
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.additionalCoverage?.theft ? 'checked' : 'unchecked'}
          onPress={() => updateAdditionalCoverage('theft', !data?.additionalCoverage?.theft)}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          คุ้มครองรถหาย
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.additionalCoverage?.medical ? 'checked' : 'unchecked'}
          onPress={() => updateAdditionalCoverage('medical', !data?.additionalCoverage?.medical)}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          ค่ารักษาพยาบาล
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.additionalCoverage?.personalAccident ? 'checked' : 'unchecked'}
          onPress={() => updateAdditionalCoverage('personalAccident', !data?.additionalCoverage?.personalAccident)}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          อุบัติเหตุส่วนบุคคล
        </Text>
      </View>

      <TextInput
        label="ระยะเวลาความคุ้มครอง (เดือน)"
        value={data?.coveragePeriod || ''}
        onChangeText={(value) => updateField('coveragePeriod', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        placeholder="เช่น 12"
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
  label: {
    marginBottom: 10,
  },
  segmented: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 15,
    fontWeight: 'bold',
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

