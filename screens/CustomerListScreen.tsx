import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Text, FAB, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Customer } from '../types';

const STORAGE_KEY = '@customers';

export default function CustomerListScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // เรียงตามวันที่สร้าง (ใหม่สุดก่อน)
        parsed.sort((a: Customer, b: Customer) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setCustomers(parsed);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้');
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const renderCustomer = ({ item }: { item: Customer }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          📞 {item.phone}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          🚗 {item.licensePlate}
        </Text>
        <Text variant="bodySmall" style={styles.insuranceType}>
          ประกัน: {item.insuranceType}
        </Text>
        <Text variant="bodySmall" style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString('th-TH')}
        </Text>
      </Card.Content>
    </Card>
  );

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

  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        renderItem={renderCustomer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={loadCustomers}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              ยังไม่มีข้อมูลลูกค้า
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtext}>
              กดปุ่ม + เพื่อเพิ่มข้อมูลลูกค้าใหม่
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    elevation: 2,
  },
  subtitle: {
    color: '#666',
    marginTop: 5,
  },
  insuranceType: {
    color: '#2196F3',
    marginTop: 8,
    fontWeight: 'bold',
  },
  date: {
    color: '#999',
    marginTop: 5,
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
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#ccc',
  },
});
