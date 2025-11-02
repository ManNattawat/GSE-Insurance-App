import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Text, ProgressBar, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import PersonalInfoStep from '../components/form/PersonalInfoStep';
import VehicleInfoStep from '../components/form/VehicleInfoStep';
import DrivingInfoStep from '../components/form/DrivingInfoStep';
import InsuranceInfoStep from '../components/form/InsuranceInfoStep';
import DocumentsStep from '../components/form/DocumentsStep';
import SummaryStep from '../components/form/SummaryStep';
import type { CustomerData } from '../types';

type RootStackParamList = {
  InsuranceForm: { status?: 'new' | 'renewal' };
  Home: undefined;
};

type InsuranceFormScreenRouteProp = RouteProp<RootStackParamList, 'InsuranceForm'>;
type InsuranceFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InsuranceForm'>;

const TOTAL_STEPS = 6;

export default function InsuranceFormScreen() {
  const route = useRoute<InsuranceFormScreenRouteProp>();
  const navigation = useNavigation<InsuranceFormScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CustomerData>>({
    insuranceInfo: {
      status: route.params?.status || 'new',
      insuranceType: 'class1',
      coverageAmount: '',
      additionalCoverage: {
        flood: false,
        theft: false,
        medical: false,
        personalAccident: false,
      },
      coveragePeriod: '',
    },
  });

  const progress = currentStep / TOTAL_STEPS;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    // TODO: บันทึกข้อมูลลง Supabase
    Alert.alert('สำเร็จ', 'บันทึกข้อมูลลูกค้าเรียบร้อยแล้ว', [
      {
        text: 'ตกลง',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  const updateFormData = (field: keyof CustomerData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => updateFormData('personalInfo', data)}
          />
        );
      case 2:
        return (
          <VehicleInfoStep
            data={formData.vehicleInfo}
            onChange={(data) => updateFormData('vehicleInfo', data)}
          />
        );
      case 3:
        return (
          <DrivingInfoStep
            data={formData.drivingInfo}
            onChange={(data) => updateFormData('drivingInfo', data)}
          />
        );
      case 4:
        return (
          <InsuranceInfoStep
            data={formData.insuranceInfo}
            onChange={(data) => updateFormData('insuranceInfo', data)}
          />
        );
      case 5:
        return (
          <DocumentsStep
            data={formData.documents}
            onChange={(data) => updateFormData('documents', data)}
          />
        );
      case 6:
        return <SummaryStep data={formData as CustomerData} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium">
          ขั้นตอนที่ {currentStep} จาก {TOTAL_STEPS}
        </Text>
        <ProgressBar progress={progress} color="#2196F3" style={styles.progressBar} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      <View style={styles.footer}>
        <Divider />
        <View style={styles.buttonRow}>
          {currentStep > 1 && (
            <Button mode="outlined" onPress={handlePrevious} style={styles.button}>
              ย้อนกลับ
            </Button>
          )}
          {currentStep < TOTAL_STEPS ? (
            <Button mode="contained" onPress={handleNext} style={styles.button}>
              ถัดไป
            </Button>
          ) : (
            <Button mode="contained" onPress={handleSave} style={styles.button}>
              บันทึกข้อมูล
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    backgroundColor: '#fff',
    elevation: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
  },
  button: {
    flex: 1,
  },
});

