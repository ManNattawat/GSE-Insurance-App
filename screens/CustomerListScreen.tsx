import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Card, Text, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  CustomerList: undefined;
  CustomerDetail: { customerId: string };
  InsuranceForm: { status?: 'new' | 'renewal' };
};

type CustomerListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CustomerList'>;

// Mock data - จะแทนที่ด้วยข้อมูลจาก Supabase
const mockCustomers = [
  {
    id: '1',
    name: 'สมชาย ใจดี',
    phone: '0812345678',
    licensePlate: 'กก-1234',
    insuranceType: 'ชั้น 1',
    status: 'new',
  },
  {
    id: '2',
    name: 'สมหญิง รักดี',
    phone: '0823456789',
    licensePlate: 'ขข-5678',
    insuranceType: 'ชั้น 2+',
    status: 'renewal',
  },
];

export default function CustomerListScreen() {
  const navigation = useNavigation<CustomerListScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.licensePlate.includes(searchQuery)
  );

  const renderCustomerItem = ({ item }: { item: typeof mockCustomers[0] }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('CustomerDetail', { customerId: item.id })}
    >
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {item.phone} • {item.licensePlate}
        </Text>
        <View style={styles.tagContainer}>
          <Text variant="labelSmall" style={styles.tag}>
            {item.insuranceType}
          </Text>
          <Text variant="labelSmall" style={[styles.tag, styles.statusTag]}>
            {item.status === 'new' ? 'สมัครใหม่' : 'ต่ออายุ'}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="ค้นหาชื่อ, เบอร์โทร, หรือเลขทะเบียน..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              ไม่พบข้อมูลลูกค้า
            </Text>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('InsuranceForm', { status: 'new' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 10,
    elevation: 2,
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
  tagContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#1976d2',
  },
  statusTag: {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});

