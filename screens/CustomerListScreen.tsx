import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Searchbar, Card, Text, FAB, Button, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { exportToCSV } from '../utils/exportData';
import type { CustomerData, RootStackParamList } from '../types';
import { getAllCustomers, searchCustomers } from '../services/policyService';

type CustomerListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CustomerList'>;

export default function CustomerListScreen() {
  const navigation = useNavigation<CustomerListScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      if (searchQuery.trim()) {
        const result = await searchCustomers(searchQuery);
        if (result.success) {
          setCustomers(result.data);
        } else {
          Alert.alert('เกิดข้อผิดพลาด', result.error || 'ไม่สามารถค้นหาข้อมูลได้');
        }
      } else {
        const result = await getAllCustomers();
        if (result.success) {
          setCustomers(result.data);
        } else {
          Alert.alert('เกิดข้อผิดพลาด', result.error || 'ไม่สามารถดึงข้อมูลได้');
        }
      }
    } catch (error: any) {
      Alert.alert('เกิดข้อผิดพลาด', error.message || 'ไม่สามารถดึงข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCustomers();
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCustomers();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const displayCustomers = customers.map((customer) => ({
    id: customer.id || '',
    name: `${customer.personalInfo?.firstName || ''} ${customer.personalInfo?.lastName || ''}`.trim() || customer.personalInfo?.phone || 'ไม่มีชื่อ',
    phone: customer.personalInfo?.phone || '',
    licensePlate: customer.vehicleInfo?.licensePlate || '',
    insuranceType: customer.insuranceInfo?.insuranceType === 'class1' ? 'ชั้น 1' : 
                   customer.insuranceInfo?.insuranceType === 'class2plus' ? 'ชั้น 2+' :
                   customer.insuranceInfo?.insuranceType === 'class3plus' ? 'ชั้น 3+' : 'ชั้น 3',
    status: customer.insuranceInfo?.status || 'new',
  }));

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      
      if (customers.length === 0) {
        Alert.alert('ไม่พบข้อมูล', 'ไม่มีข้อมูลลูกค้าที่จะส่งออก');
        return;
      }

      const now = new Date();
      const monthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear() + 543;
      const monthText = `${month} ${year}`;

      await exportToCSV(customers, monthText);
      Alert.alert('สำเร็จ', 'ส่งออกข้อมูลเรียบร้อยแล้ว');
    } catch (error: any) {
      Alert.alert('เกิดข้อผิดพลาด', error.message || 'ไม่สามารถส่งออกข้อมูลได้');
    } finally {
      setIsExporting(false);
    }
  };

  const renderCustomerItem = ({ item }: { item: typeof displayCustomers[0] }) => (
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
      <View style={styles.header}>
        <Searchbar
          placeholder="ค้นหาชื่อ, เบอร์โทร, หรือเลขทะเบียน..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <Button
          mode="contained"
          icon={() => <MaterialCommunityIcons name="download" size={20} color="#fff" />}
          onPress={handleExportCSV}
          style={styles.exportButton}
          loading={isExporting}
          disabled={isExporting}
        >
          ส่งออกข้อมูล CSV
        </Button>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text variant="bodyMedium" style={styles.loadingText}>
            กำลังโหลดข้อมูล...
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayCustomers}
          renderItem={renderCustomerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={loadCustomers}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text variant="bodyLarge" style={styles.emptyText}>
                ไม่พบข้อมูลลูกค้า
              </Text>
            </View>
          }
        />
      )}

      <FAB
        icon={() => <MaterialCommunityIcons name="plus" size={24} color="#fff" />}
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
  header: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchbar: {
    marginBottom: 10,
    elevation: 2,
  },
  exportButton: {
    marginTop: 5,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});