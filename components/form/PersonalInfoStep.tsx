import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Card } from 'react-native-paper';
import type { PersonalInfo } from '../../types';

interface Props {
  data?: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    } as PersonalInfo);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          ข้อมูลส่วนบุคคล
        </Text>

        <TextInput
          label="ชื่อ *"
          value={data?.firstName || ''}
          onChangeText={(value) => updateField('firstName', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="นามสกุล *"
          value={data?.lastName || ''}
          onChangeText={(value) => updateField('lastName', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="เลขบัตรประชาชน *"
          value={data?.idCard || ''}
          onChangeText={(value) => updateField('idCard', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          maxLength={13}
        />

        <TextInput
          label="ที่อยู่ *"
          value={data?.address || ''}
          onChangeText={(value) => updateField('address', value)}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />

        <TextInput
          label="เบอร์โทรศัพท์ *"
          value={data?.phone || ''}
          onChangeText={(value) => updateField('phone', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={10}
        />

        <TextInput
          label="อีเมล"
          value={data?.email || ''}
          onChangeText={(value) => updateField('email', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Line ID"
          value={data?.lineId || ''}
          onChangeText={(value) => updateField('lineId', value)}
          style={styles.input}
          mode="outlined"
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