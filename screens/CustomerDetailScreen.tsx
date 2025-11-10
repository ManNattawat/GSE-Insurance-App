import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, Divider, ActivityIndicator } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { getCustomerById } from '../services/policyService';
import type { CustomerData } from '../types';
import SummaryStep from '../components/form/SummaryStep';

type RootStackParamList = {
  CustomerDetail: { customerId: string };
};

type CustomerDetailScreenRouteProp = RouteProp<RootStackParamList, 'CustomerDetail'>;

export default function CustomerDetailScreen() {
  const route = useRoute<CustomerDetailScreenRouteProp>();
  const { customerId } = route.params;
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomerData();
  }, [customerId]);

  const loadCustomerData = async () => {
    try {
      setLoading(true);
      const result = await getCustomerById(customerId);
      
      if (result.success && result.data) {
        setCustomerData(result.data);
      } else {
        Alert.alert('เกิดข้อผิดพลาด', result.error || 'ไม่สามารถดึงข้อมูลได้');
      }
    } catch (error: any) {
      Alert.alert('เกิดข้อผิดพลาด', error.message || 'ไม่สามารถดึงข้อมูลได้');
    } finally {
      setLoading(false);
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

  if (!customerData) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodyLarge" style={styles.errorText}>
              ไม่พบข้อมูลลูกค้า
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <SummaryStep data={customerData} />
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
  errorText: {
    textAlign: 'center',
    color: '#999',
  },
});

