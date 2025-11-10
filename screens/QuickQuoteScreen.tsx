import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Text, Button, Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  QuickQuote: undefined;
  InsuranceForm: { status?: 'new' | 'renewal'; quickQuoteData?: any };
  Home: undefined;
};

type QuickQuoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuickQuote'>;

export default function QuickQuoteScreen() {
  const navigation = useNavigation<QuickQuoteScreenNavigationProp>();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    subModel: '',
    year: '',
    insuranceType: 'class1' as 'class1' | 'class2plus' | 'class3plus' | 'class3',
    customerName: '',
    phone: '',
    email: '',
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.brand || !formData.model || !formData.year || !formData.customerName || !formData.phone) {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    // TODO: ส่งข้อมูลไปยัง API หรือ backend เพื่อเช็คเบี้ย
    // สำหรับตอนนี้แสดง alert และนำไปหน้าฟอร์มเต็ม
    Alert.alert(
      'ขอบคุณค่ะ',
      'เราได้รับข้อมูลแล้ว เจ้าหน้าที่จะติดต่อแจ้งรายละเอียดให้แก่ท่านโดยเร็วที่สุด',
      [
        {
          text: 'กรอกข้อมูลเพิ่มเติม',
          onPress: () => {
            navigation.navigate('InsuranceForm', {
              status: 'new',
              quickQuoteData: formData,
            });
          },
        },
        {
          text: 'ตกลง',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            เช็คเบี้ยประกันฟรี
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            กรอกข้อมูลพื้นฐานเพื่อขอใบเสนอราคาเบื้องต้น
          </Text>
          <Divider style={styles.divider} />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            ข้อมูลรถยนต์
          </Text>

          <TextInput
            label="ยี่ห้อรถ *"
            value={formData.brand}
            onChangeText={(value) => updateField('brand', value)}
            style={styles.input}
            mode="outlined"
            placeholder="เช่น Toyota, Honda"
          />

          <TextInput
            label="รุ่นรถ *"
            value={formData.model}
            onChangeText={(value) => updateField('model', value)}
            style={styles.input}
            mode="outlined"
            placeholder="เช่น Camry, Civic"
          />

          <TextInput
            label="รุ่นย่อย"
            value={formData.subModel}
            onChangeText={(value) => updateField('subModel', value)}
            style={styles.input}
            mode="outlined"
            placeholder="เช่น 2.5Q, 1.8E"
          />

          <TextInput
            label="ปีรถ *"
            value={formData.year}
            onChangeText={(value) => updateField('year', value)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            maxLength={4}
            placeholder="เช่น 2020"
          />

          <Text variant="bodyMedium" style={styles.label}>
            ประเภทประกัน *
          </Text>
          <View style={styles.segmentedContainer}>
            <Button
              mode={formData.insuranceType === 'class1' ? 'contained' : 'outlined'}
              onPress={() => updateField('insuranceType', 'class1')}
              style={styles.segmentedButton}
            >
              ชั้น 1
            </Button>
            <Button
              mode={formData.insuranceType === 'class2plus' ? 'contained' : 'outlined'}
              onPress={() => updateField('insuranceType', 'class2plus')}
              style={styles.segmentedButton}
            >
              2+
            </Button>
            <Button
              mode={formData.insuranceType === 'class3plus' ? 'contained' : 'outlined'}
              onPress={() => updateField('insuranceType', 'class3plus')}
              style={styles.segmentedButton}
            >
              3+
            </Button>
            <Button
              mode={formData.insuranceType === 'class3' ? 'contained' : 'outlined'}
              onPress={() => updateField('insuranceType', 'class3')}
              style={styles.segmentedButton}
            >
              3
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            ข้อมูลติดต่อ
          </Text>

          <TextInput
            label="ชื่อ-นามสกุล *"
            value={formData.customerName}
            onChangeText={(value) => updateField('customerName', value)}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="เบอร์โทรศัพท์ *"
            value={formData.phone}
            onChangeText={(value) => updateField('phone', value)}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TextInput
            label="อีเมล"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        icon="send"
      >
        เช็คเบี้ยประกัน
      </Button>

      <Text variant="bodySmall" style={styles.note}>
        * ข้อมูลที่จำเป็น
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    marginBottom: 10,
    color: '#2196F3',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  sectionTitle: {
    marginBottom: 15,
    color: '#2196F3',
  },
  input: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
  },
  segmentedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  segmentedButton: {
    flex: 1,
    minWidth: 80,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 8,
  },
  note: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
});

