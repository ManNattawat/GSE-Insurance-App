import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Text, Card } from 'react-native-paper';
import type { SalespersonInfo } from '../../types';

interface Props {
  data?: SalespersonInfo;
  notes?: string;
  onChange: (data: SalespersonInfo) => void;
  onNotesChange: (notes: string) => void;
}

export default function SalespersonStep({ data, notes, onChange, onNotesChange }: Props) {
  const updateField = (field: keyof SalespersonInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    } as SalespersonInfo);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          ข้อมูลพนักงานขาย
        </Text>

        <TextInput
          label="ชื่อ-นามสกุล พนักงานขาย"
          value={data?.name || ''}
          onChangeText={(value) => updateField('name', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="เบอร์โทรศัพท์ พนักงานขาย"
          value={data?.phone || ''}
          onChangeText={(value) => updateField('phone', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={10}
        />

        <TextInput
          label="หมายเหตุเพิ่มเติม"
          value={notes || ''}
          onChangeText={onNotesChange}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={4}
          placeholder="ระบุข้อมูลเพิ่มเติม เช่น ความต้องการพิเศษ, เงื่อนไขการชำระเงิน ฯลฯ"
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
  },
  title: {
    marginBottom: 15,
    color: '#2196F3',
  },
  input: {
    marginBottom: 15,
  },
});