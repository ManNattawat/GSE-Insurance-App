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
        flood: data?.additionalCoverage?.flood || false,
        theft: data?.additionalCoverage?.theft || false,
        medical: data?.additionalCoverage?.medical || false,
        personalAccident: data?.additionalCoverage?.personalAccident || false,
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

      <Text variant="bodyMedium" style={styles.sectionTitle}>
        ข้อมูลประกันเดิม
      </Text>

      <TextInput
        label="บริษัทประกันเดิม"
        value={data?.previousInsuranceCompany || ''}
        onChangeText={(value) => updateField('previousInsuranceCompany', value)}
        style={styles.input}
        mode="outlined"
        placeholder="กรอกชื่อบริษัทประกันเดิม (ถ้ามี)"
      />

      <Text variant="bodyMedium" style={styles.label}>
        ประเภทประกันเดิม
      </Text>
      <SegmentedButtons
        value={data?.previousInsuranceType || 'class1'}
        onValueChange={(value) => updateField('previousInsuranceType', value)}
        buttons={[
          { value: 'class1', label: 'ชั้น 1' },
          { value: 'class2plus', label: '2+' },
          { value: 'class3plus', label: '3+' },
          { value: 'class3', label: '3' },
        ]}
        style={styles.segmented}
      />

      <TextInput
        label="เบี้ยประกันเดิม (บาท)"
        value={data?.previousPremium || ''}
        onChangeText={(value) => updateField('previousPremium', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        placeholder="เช่น 15000"
      />

      <Text variant="bodyMedium" style={styles.label}>
        ความคุ้มครองหลัก (ประกันเดิม)
      </Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.previousCoverage?.serviceCenter ? 'checked' : 'unchecked'}
          onPress={() => updateField('previousCoverage', {
            ...data?.previousCoverage,
            serviceCenter: !data?.previousCoverage?.serviceCenter,
          })}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          ซ่อมศูนย์
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.previousCoverage?.garage ? 'checked' : 'unchecked'}
          onPress={() => updateField('previousCoverage', {
            ...data?.previousCoverage,
            garage: !data?.previousCoverage?.garage,
          })}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          อู่
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.previousCoverage?.flood ? 'checked' : 'unchecked'}
          onPress={() => updateField('previousCoverage', {
            ...data?.previousCoverage,
            flood: !data?.previousCoverage?.flood,
          })}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          น้ำท่วม
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={data?.previousCoverage?.fire ? 'checked' : 'unchecked'}
          onPress={() => updateField('previousCoverage', {
            ...data?.previousCoverage,
            fire: !data?.previousCoverage?.fire,
          })}
        />
        <Text variant="bodyMedium" style={styles.checkboxLabel}>
          ไฟไหม้
        </Text>
      </View>

      <TextInput
        label="วันที่สิ้นสุดความคุ้มครอง"
        value={data?.coverageEndDate || ''}
        onChangeText={(value) => updateField('coverageEndDate', value)}
        style={styles.input}
        mode="outlined"
        placeholder="วว/ดด/ปปปป"
      />

      <Text variant="bodyMedium" style={styles.sectionTitle}>
        แพ็กเกจใหม่ที่เสนอ
      </Text>

      <TextInput
        label="บริษัทประกันที่เสนอ"
        value={data?.proposedInsuranceCompany || ''}
        onChangeText={(value) => updateField('proposedInsuranceCompany', value)}
        style={styles.input}
        mode="outlined"
        placeholder="กรอกชื่อบริษัทประกันที่เสนอ"
      />

      <TextInput
        label="เบี้ยประกันที่เสนอ (บาท)"
        value={data?.proposedPremium || ''}
        onChangeText={(value) => updateField('proposedPremium', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        placeholder="เช่น 12000"
      />

      <TextInput
        label="จุดเด่นความคุ้มครอง"
        value={data?.proposedHighlights || ''}
        onChangeText={(value) => updateField('proposedHighlights', value)}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={3}
        placeholder="อธิบายจุดเด่นของแพ็กเกจที่เสนอ"
      />

      <TextInput
        label="ส่วนลดโปรโมชั่น"
        value={data?.promotionDiscount || ''}
        onChangeText={(value) => updateField('promotionDiscount', value)}
        style={styles.input}
        mode="outlined"
        placeholder="เช่น ส่วนลด 10% หรือโปรโมชั่นพิเศษ"
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

