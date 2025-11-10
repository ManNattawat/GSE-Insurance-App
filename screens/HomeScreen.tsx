import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  QuickQuote: undefined;
  InsuranceForm: { status?: 'new' | 'renewal' };
  CustomerList: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            ระบบบันทึกข้อมูลประกันภัย
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            บันทึกข้อมูลลูกค้าสำหรับการสมัครหรือต่ออายุประกันภัยรถยนต์
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('QuickQuote')}
          style={[styles.button, styles.primaryButton]}
          icon={() => <MaterialCommunityIcons name="calculator" size={20} color="#fff" />}
        >
          เช็คเบี้ยประกันฟรี
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('InsuranceForm', { status: 'new' })}
          style={styles.button}
          icon={() => <MaterialCommunityIcons name="file-document-edit" size={20} color="#fff" />}
        >
          สมัครใหม่
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('InsuranceForm', { status: 'renewal' })}
          style={styles.button}
          icon={() => <MaterialCommunityIcons name="file-refresh" size={20} color="#fff" />}
        >
          ต่ออายุ
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('CustomerList')}
          style={styles.button}
          icon={() => <MaterialCommunityIcons name="format-list-bulleted" size={20} color="#2196F3" />}
        >
          ดูรายการลูกค้า
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  buttonContainer: {
    gap: 15,
  },
  button: {
    paddingVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#9C27B0',
  },
});

