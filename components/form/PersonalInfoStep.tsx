import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import type { PersonalInfo } from '../../types';

interface Props {
  data?: Partial<PersonalInfo>;
  onChange: (data: Partial<PersonalInfo>) => void;
}

export default function PersonalInfoStep({ data, onChange }: Props) {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ข้อมูลส่วนบุคคล
      </Text>

      <TextInput
        label="ชื่อ"
        value={data?.firstName || ''}
        onChangeText={(value) => updateField('firstName', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="นามสกุล"
        value={data?.lastName || ''}
        onChangeText={(value) => updateField('lastName', value)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="เลขประจำตัวประชาชน"
        value={data?.idCard || ''}
        onChangeText={(value) => updateField('idCard', value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        maxLength={13}
      />

      <TextInput
        label="ที่อยู่"
        value={data?.address || ''}
        onChangeText={(value) => updateField('address', value)}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={3}
      />

      <TextInput
        label="เบอร์โทรศัพท์"
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
        label="Line ID (เพื่อการติดตาม)"
        value={data?.lineId || ''}
        onChangeText={(value) => updateField('lineId', value)}
        style={styles.input}
        mode="outlined"
        placeholder="เช่น @username หรือ username"
        autoCapitalize="none"
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

