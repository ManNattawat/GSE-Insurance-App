import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import type { SalespersonInfo } from '../../types';

interface Props {
  data?: Partial<SalespersonInfo>;
  notes?: string;
  onChange: (data: Partial<SalespersonInfo>) => void;
  onNotesChange: (notes: string) => void;
}

export default function SalespersonStep({ data, notes, onChange, onNotesChange }: Props) {
  const updateField = (field: keyof SalespersonInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ข้อมูลพนักงานขายและหมายเหตุ
      </Text>

      <TextInput
        label="ชื่อ-นามสกุล (พนักงานขาย)"
        value={data?.name || ''}
        onChangeText={(value) => updateField('name', value)}
        style={styles.input}
        mode="outlined"
        placeholder="กรอกชื่อ-นามสกุลพนักงานขาย"
      />

      <TextInput
        label="เบอร์โทรศัพท์ (พนักงานขาย)"
        value={data?.phone || ''}
        onChangeText={(value) => updateField('phone', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
        placeholder="เช่น 0812345678"
      />

      <TextInput
        label="หมายเหตุ"
        value={notes || ''}
        onChangeText={onNotesChange}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={4}
        placeholder="กรอกหมายเหตุเพิ่มเติม (ถ้ามี)"
      />
    </View>
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
  input: {
    marginBottom: 15,
  },
});

