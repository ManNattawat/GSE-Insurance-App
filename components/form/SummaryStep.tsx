import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import type { CustomerData } from '../../types';

interface Props {
  data: Partial<CustomerData>;
}

export default function SummaryStep({ data }: Props) {
  const getInsuranceTypeText = (type?: string) => {
    const types: Record<string, string> = {
      class1: 'ชั้น 1',
      class2plus: 'ชั้น 2+',
      class3plus: 'ชั้น 3+',
      class3: 'ชั้น 3',
    };
    return types[type || ''] || type;
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        สรุปข้อมูล
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลส่วนบุคคล
          </Text>
          <Divider style={styles.divider} />
          <Text>ชื่อ-นามสกุล: {data.personalInfo?.firstName} {data.personalInfo?.lastName}</Text>
          <Text>เลขบัตรประชาชน: {data.personalInfo?.idCard}</Text>
          <Text>เบอร์โทร: {data.personalInfo?.phone}</Text>
          <Text>อีเมล: {data.personalInfo?.email}</Text>
          <Text>ที่อยู่: {data.personalInfo?.address}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลรถยนต์
          </Text>
          <Divider style={styles.divider} />
          <Text>ยี่ห้อ/รุ่น: {data.vehicleInfo?.brand} {data.vehicleInfo?.model}</Text>
          <Text>ปี: {data.vehicleInfo?.year}</Text>
          <Text>เลขทะเบียน: {data.vehicleInfo?.licensePlate}</Text>
          <Text>เลขตัวถัง: {data.vehicleInfo?.vin}</Text>
          <Text>สี: {data.vehicleInfo?.color}</Text>
          <Text>ขนาดเครื่องยนต์: {data.vehicleInfo?.engineSize} ซีซี</Text>
          <Text>ประเภทการใช้งาน: {data.vehicleInfo?.usageType === 'personal' ? 'ส่วนบุคคล' : 'พาณิชย์'}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลการขับขี่
          </Text>
          <Divider style={styles.divider} />
          <Text>ระยะเวลาที่มีใบขับขี่: {data.drivingInfo?.drivingLicenseYears} ปี</Text>
          <Text>ประสบการณ์: {data.drivingInfo?.drivingExperience}</Text>
          <Text>ประวัติอุบัติเหตุ: {data.drivingInfo?.accidentHistory ? 'มี' : 'ไม่มี'}</Text>
          <Text>ประวัติการเคลม: {data.drivingInfo?.claimHistory ? 'มี' : 'ไม่มี'}</Text>
          <Text>จำนวนผู้ขับขี่หลัก: {data.drivingInfo?.numberOfDrivers}</Text>
          <Text>อายุผู้ขับขี่หลัก: {data.drivingInfo?.mainDriverAge} ปี</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลประกันภัย
          </Text>
          <Divider style={styles.divider} />
          <Text>ประเภทประกัน: {getInsuranceTypeText(data.insuranceInfo?.insuranceType)}</Text>
          <Text>ทุนประกัน: {data.insuranceInfo?.coverageAmount} บาท</Text>
          <Text>ระยะเวลา: {data.insuranceInfo?.coveragePeriod} เดือน</Text>
          <Text>สถานะ: {data.insuranceInfo?.status === 'new' ? 'สมัครใหม่' : 'ต่ออายุ'}</Text>
          <Text style={styles.subtitle}>ความคุ้มครองเพิ่มเติม:</Text>
          <Text>  • น้ำท่วม: {data.insuranceInfo?.additionalCoverage?.flood ? '✓' : '✗'}</Text>
          <Text>  • รถหาย: {data.insuranceInfo?.additionalCoverage?.theft ? '✓' : '✗'}</Text>
          <Text>  • ค่ารักษา: {data.insuranceInfo?.additionalCoverage?.medical ? '✓' : '✗'}</Text>
          <Text>  • อุบัติเหตุส่วนบุคคล: {data.insuranceInfo?.additionalCoverage?.personalAccident ? '✓' : '✗'}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            เอกสารประกอบ
          </Text>
          <Divider style={styles.divider} />
          <Text>บัตรประชาชน: {data.documents?.idCardImage ? '✓ อัปโหลดแล้ว' : '✗ ยังไม่ได้อัปโหลด'}</Text>
          <Text>ทะเบียนรถ: {data.documents?.vehicleRegistration ? '✓ อัปโหลดแล้ว' : '✗ ยังไม่ได้อัปโหลด'}</Text>
          <Text>ใบขับขี่: {data.documents?.drivingLicense ? '✓ อัปโหลดแล้ว' : '✗ ยังไม่ได้อัปโหลด'}</Text>
          <Text>กรมธรรม์เดิม: {data.documents?.previousPolicy ? '✓ อัปโหลดแล้ว' : '✗ ยังไม่ได้อัปโหลด'}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
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
  card: {
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#2196F3',
  },
  divider: {
    marginVertical: 10,
  },
  subtitle: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

