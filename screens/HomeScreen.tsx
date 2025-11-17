import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

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
            แอพแบบง่ายสำหรับเก็บข้อมูลลูกค้า
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddCustomer')}
          style={styles.button}
        >
          บันทึกข้อมูลลูกค้าใหม่
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('CustomerList')}
          style={styles.button}
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
    marginBottom: 30,
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
});
