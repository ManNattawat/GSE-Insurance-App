import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';

export default function TestScreen() {
  const [message, setMessage] = useState('สวัสดีจากคอมพิวเตอร์!');
  const [counter, setCounter] = useState(0);
  const [inputText, setInputText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            🧪 หน้าทดสอบ
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            หน้านี้ใช้ทดสอบการเชื่อมต่อและควบคุมจากคอมพิวเตอร์
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ข้อความ
          </Text>
          <Text variant="bodyLarge" style={styles.message}>
            {message}
          </Text>
          <Button
            mode="contained"
            onPress={() => setMessage('ข้อความเปลี่ยนแล้ว! ' + new Date().toLocaleTimeString())}
            style={styles.button}
          >
            เปลี่ยนข้อความ
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ตัวนับ
          </Text>
          <Text variant="displaySmall" style={styles.counter}>
            {counter}
          </Text>
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={() => setCounter(counter - 1)}
              style={styles.button}
            >
              ลบ
            </Button>
            <Button
              mode="contained"
              onPress={() => setCounter(0)}
              style={styles.button}
            >
              รีเซ็ต
            </Button>
            <Button
              mode="contained"
              onPress={() => setCounter(counter + 1)}
              style={styles.button}
            >
              เพิ่ม
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Input Test
          </Text>
          <TextInput
            label="พิมพ์ข้อความ"
            value={inputText}
            onChangeText={setInputText}
            mode="outlined"
            style={styles.input}
          />
          <Text variant="bodyMedium" style={styles.inputDisplay}>
            คุณพิมพ์: {inputText || '(ยังไม่มีการพิมพ์)'}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            สถานะ
          </Text>
          <Text variant="bodyMedium" style={styles.status}>
            ✅ หน้าจอทำงานปกติ
          </Text>
          <Text variant="bodySmall" style={styles.timestamp}>
            อัปเดตล่าสุด: {new Date().toLocaleString('th-TH')}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#2196F3',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
  },
  sectionTitle: {
    marginBottom: 15,
    color: '#2196F3',
  },
  message: {
    padding: 15,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counter: {
    textAlign: 'center',
    color: '#2196F3',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    marginBottom: 15,
  },
  inputDisplay: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginTop: 10,
  },
  status: {
    color: '#4CAF50',
    marginBottom: 10,
  },
  timestamp: {
    color: '#999',
    fontStyle: 'italic',
  },
});

