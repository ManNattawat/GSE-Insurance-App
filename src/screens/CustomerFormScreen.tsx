import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { customerService } from '../services/customerService';
import { Customer } from '../types/customer';

export default function CustomerFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const customer = (route.params as any)?.customer as Customer | null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    insurance_type: '',
    policy_number: '',
    status: 'active' as 'active' | 'inactive' | 'pending',
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        phone: customer.phone || '',
        email: customer.email || '',
        address: customer.address || '',
        insurance_type: customer.insurance_type || '',
        policy_number: customer.policy_number || '',
        status: customer.status || 'active',
      });
    }
  }, [customer]);

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }

    setLoading(true);
    try {
      if (customer?.id) {
        await customerService.updateCustomer(customer.id, formData);
        Alert.alert('สำเร็จ', 'อัปเดตข้อมูลเรียบร้อยแล้ว', [
          { text: 'ตกลง', onPress: () => navigation.goBack() },
        ]);
      } else {
        await customerService.createCustomer(formData);
        Alert.alert('สำเร็จ', 'เพิ่มข้อมูลลูกค้าเรียบร้อยแล้ว', [
          { text: 'ตกลง', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error: any) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>ชื่อ-นามสกุล *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="กรอกชื่อ-นามสกุล"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>เบอร์โทรศัพท์ *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="กรอกเบอร์โทรศัพท์"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>อีเมล</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="กรอกอีเมล"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>ที่อยู่</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            placeholder="กรอกที่อยู่"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>ประเภทประกัน</Text>
          <TextInput
            style={styles.input}
            value={formData.insurance_type}
            onChangeText={(text) => setFormData({ ...formData, insurance_type: text })}
            placeholder="เช่น ประกันชีวิต, ประกันสุขภาพ"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>เลขที่กรมธรรม์</Text>
          <TextInput
            style={styles.input}
            value={formData.policy_number}
            onChangeText={(text) => setFormData({ ...formData, policy_number: text })}
            placeholder="กรอกเลขที่กรมธรรม์"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>สถานะ</Text>
          <View style={styles.statusButtons}>
            {(['active', 'inactive', 'pending'] as const).map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  formData.status === status && styles.statusButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, status })}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    formData.status === status && styles.statusButtonTextActive,
                  ]}
                >
                  {status === 'active' ? 'ใช้งาน' : status === 'inactive' ? 'ไม่ใช้งาน' : 'รอดำเนินการ'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>
              {customer ? 'อัปเดตข้อมูล' : 'บันทึกข้อมูล'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    fontSize: 14,
    color: '#666',
  },
  statusButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

