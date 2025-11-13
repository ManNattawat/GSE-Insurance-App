import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Divider, ActivityIndicator } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { CustomerData, RootStackParamList } from '../types';
import { getCustomerById } from '../services/policyService';

type CustomerDetailScreenRouteProp = RouteProp<RootStackParamList, 'CustomerDetail'>;

export default function CustomerDetailScreen() {
  const route = useRoute<CustomerDetailScreenRouteProp>();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      setLoading(true);
      const result = await getCustomerById(route.params.customerId);
      
      if (result.success && result.data) {
        setCustomer(result.data);
      } else {
        Alert.alert('เกิดข้อผิดพลาด', result.error || 'ไม่พบข้อมูลลูกค้า');
      }
    } catch (error: any) {
      Alert.alert('เกิดข้อผิดพลาด', error.message || 'ไม่สามารถดึงข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  const getInsuranceTypeText = (type?: string) => {
    switch (type) {
      case 'class1': return 'ชั้น 1';
      case 'class2plus': return 'ชั้น 2+';
      case 'class3plus': return 'ชั้น 3+';
      case 'class3': return 'ชั้น 3';
      default: return '-';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyMedium" style={styles.loadingText}>
          กำลังโหลดข้อมูล...
        </Text>
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge" style={styles.emptyText}>
          ไม่พบข้อมูลลูกค้า
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {customer.personalInfo?.firstName} {customer.personalInfo?.lastName}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {customer.insuranceInfo?.status === 'new' ? 'สมัครใหม่' : 'ต่ออายุ'} • {getInsuranceTypeText(customer.insuranceInfo?.insuranceType)}
          </Text>
          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            ข้อมูลส่วนบุคคล
          </Text>
          <Text>เลขบัตรประชาชน: {customer.personalInfo?.idCard || '-'}</Text>
          <Text>เบอร์โทรศัพท์: {customer.personalInfo?.phone || '-'}</Text>
          <Text>อีเมล: {customer.personalInfo?.email || '-'}</Text>
          <Text>ที่อยู่: {customer.personalInfo?.address || '-'}</Text>
          {customer.personalInfo?.lineId && (
            <Text>Line ID: {customer.personalInfo.lineId}</Text>
          )}

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            ข้อมูลรถยนต์
          </Text>
          <Text>ยี่ห้อ/รุ่น: {customer.vehicleInfo?.brand} {customer.vehicleInfo?.model}</Text>
          {customer.vehicleInfo?.subModel && (
            <Text>รุ่นย่อย: {customer.vehicleInfo.subModel}</Text>
          )}
          <Text>ปี: {customer.vehicleInfo?.year || '-'}</Text>
          <Text>เลขทะเบียน: {customer.vehicleInfo?.licensePlate || '-'}</Text>
          <Text>เลข VIN: {customer.vehicleInfo?.vin || '-'}</Text>
          <Text>เลขเครื่องยนต์: {customer.vehicleInfo?.engineNumber || '-'}</Text>
          <Text>สี: {customer.vehicleInfo?.color || '-'}</Text>
          <Text>ขนาดเครื่องยนต์: {customer.vehicleInfo?.engineSize || '-'} ซีซี</Text>
          <Text>การใช้งาน: {customer.vehicleInfo?.usageType === 'personal' ? 'ใช้ส่วนตัว' : 'ใช้เชิงพาณิชย์'}</Text>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            ข้อมูลการขับขี่
          </Text>
          <Text>ประสบการณ์ขับขี่: {customer.drivingInfo?.drivingExperience || '-'} ปี</Text>
          <Text>อายุผู้ขับขี่หลัก: {customer.drivingInfo?.mainDriverAge || '-'} ปี</Text>
          <Text>จำนวนผู้ขับขี่: {customer.drivingInfo?.numberOfDrivers || '-'} คน</Text>
          <Text>ประวัติอุบัติเหตุ: {customer.drivingInfo?.accidentHistory ? 'มี' : 'ไม่มี'}</Text>
          <Text>ประวัติการเคลม: {customer.drivingInfo?.claimHistory ? 'มี' : 'ไม่มี'}</Text>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            ข้อมูลประกันภัย
          </Text>
          <Text>ประเภทประกัน: {getInsuranceTypeText(customer.insuranceInfo?.insuranceType)}</Text>
          <Text>ทุนประกัน: {customer.insuranceInfo?.coverageAmount || '-'} บาท</Text>
          <Text>ระยะเวลาคุ้มครอง: {customer.insuranceInfo?.coveragePeriod || '-'} เดือน</Text>
          
          {customer.insuranceInfo?.additionalCoverage && (
            <>
              <Text style={styles.subSectionTitle}>ความคุ้มครองเพิ่มเติม:</Text>
              {customer.insuranceInfo.additionalCoverage.flood && <Text>• น้ำท่วม</Text>}
              {customer.insuranceInfo.additionalCoverage.theft && <Text>• ขโมย</Text>}
              {customer.insuranceInfo.additionalCoverage.medical && <Text>• ค่ารักษาพยาบาล</Text>}
              {customer.insuranceInfo.additionalCoverage.personalAccident && <Text>• อุบัติเหตุส่วนบุคคล</Text>}
            </>
          )}

          {customer.salespersonInfo?.name && (
            <>
              <Divider style={styles.divider} />
              <Text variant="titleMedium" style={styles.sectionTitle}>
                พนักงานขาย
              </Text>
              <Text>ชื่อ: {customer.salespersonInfo.name}</Text>
              <Text>เบอร์โทร: {customer.salespersonInfo.phone || '-'}</Text>
            </>
          )}

          {customer.notes && (
            <>
              <Divider style={styles.divider} />
              <Text variant="titleMedium" style={styles.sectionTitle}>
                หมายเหตุ
              </Text>
              <Text>{customer.notes}</Text>
            </>
          )}

          <Divider style={styles.divider} />

          <Text variant="bodySmall" style={styles.dateText}>
            สร้างเมื่อ: {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('th-TH') : '-'}
          </Text>
          {customer.updatedAt && customer.updatedAt !== customer.createdAt && (
            <Text variant="bodySmall" style={styles.dateText}>
              แก้ไขล่าสุด: {new Date(customer.updatedAt).toLocaleDateString('th-TH')}
            </Text>
          )}
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
    elevation: 2,
  },
  title: {
    marginBottom: 5,
    color: '#2196F3',
  },
  subtitle: {
    marginBottom: 15,
    color: '#666',
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  subSectionTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#999',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#999',
  },
});