import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  CustomerDetail: { customerId: string };
};

type CustomerDetailScreenRouteProp = RouteProp<RootStackParamList, 'CustomerDetail'>;

export default function CustomerDetailScreen() {
  const route = useRoute<CustomerDetailScreenRouteProp>();
  const { customerId } = route.params;

  // TODO: ดึงข้อมูลจาก Supabase ตาม customerId

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลส่วนบุคคล
          </Text>
          <Divider style={styles.divider} />
          <Text>ชื่อ-นามสกุล: สมชาย ใจดี</Text>
          <Text>เลขบัตรประชาชน: 1234567890123</Text>
          <Text>เบอร์โทร: 0812345678</Text>
          <Text>อีเมล: example@email.com</Text>
          <Text>ที่อยู่: 123 ถนนสุขุมวิท กรุงเทพฯ 10110</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลรถยนต์
          </Text>
          <Divider style={styles.divider} />
          <Text>ยี่ห้อ/รุ่น: Toyota Camry</Text>
          <Text>ปี: 2020</Text>
          <Text>เลขทะเบียน: กก-1234</Text>
          <Text>เลขตัวถัง: ABC123XYZ456</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อมูลประกันภัย
          </Text>
          <Divider style={styles.divider} />
          <Text>ประเภทประกัน: ชั้น 1</Text>
          <Text>ทุนประกัน: 1,000,000 บาท</Text>
          <Text>สถานะ: สมัครใหม่</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="contained" icon="file-export">
          ส่งออก PDF
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#2196F3',
  },
  divider: {
    marginVertical: 10,
  },
  buttonContainer: {
    padding: 20,
  },
});

