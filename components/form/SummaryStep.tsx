import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import type { CustomerData } from '../../types';

interface Props {
  data: CustomerData;
}

export default function SummaryStep({ data }: Props) {
  const getInsuranceTypeText = (type?: string) => {
    switch (type) {
      case 'class1': return 'ชั้น 1';
      case 'class2plus': return 'ชั้น 2+';
      case 'class3plus': return 'ชั้น 3+';
      case 'class3': return 'ชั้น 3';
      default: return '-';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            สรุปข้อมูลลูกค้า
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            กรุณาตรวจสอบข้อมูลก่อนบันทึก
          </Text>
          <Divider style={styles.divider} />

          <Text variant="titleSmall" style={styles.sectionTitle}>
            ข้อมูลส่วนบุคคล
          </Text>
          <Text>ชื่อ-นามสกุล: {data.personalInfo?.firstName} {data.personalInfo?.lastName}</Text>
          <Text>เบอร์โทร: {data.personalInfo?.phone}</Text>
          <Text>อีเมล: {data.personalInfo?.email || '-'}</Text>

          <Divider style={styles.divider} />

          <Text variant="titleSmall" style={styles.sectionTitle}>
            ข้อมูลรถยนต์
          </Text>
          <Text>ยี่ห้อ/รุ่น: {data.vehicleInfo?.brand} {data.vehicleInfo?.model}</Text>
          <Text>ปี: {data.vehicleInfo?.year}</Text>
          <Text>ทะเบียน: {data.vehicleInfo?.licensePlate}</Text>

          <Divider style={styles.divider} />

          <Text variant="titleSmall" style={styles.sectionTitle}>
            ข้อมูลประกันภัย
          </Text>
          <Text>ประเภท: {getInsuranceTypeText(data.insuranceInfo?.insuranceType)}</Text>
          <Text>สถานะ: {data.insuranceInfo?.status === 'new' ? 'สมัครใหม่' : 'ต่ออายุ'}</Text>
          <Text>ทุนประกัน: {data.insuranceInfo?.coverageAmount || '-'} บาท</Text>

          {data.salespersonInfo?.name && (
            <>
              <Divider style={styles.divider} />
              <Text variant="titleSmall" style={styles.sectionTitle}>
                พนักงานขาย
              </Text>
              <Text>ชื่อ: {data.salespersonInfo.name}</Text>
              <Text>เบอร์โทร: {data.salespersonInfo.phone || '-'}</Text>
            </>
          )}

          {data.notes && (
            <>
              <Divider style={styles.divider} />
              <Text variant="titleSmall" style={styles.sectionTitle}>
                หมายเหตุ
              </Text>
              <Text>{data.notes}</Text>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});