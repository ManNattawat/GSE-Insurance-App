import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import InsuranceFormScreen from './screens/InsuranceFormScreen';
import CustomerListScreen from './screens/CustomerListScreen';
import CustomerDetailScreen from './screens/CustomerDetailScreen';
import QuickQuoteScreen from './screens/QuickQuoteScreen';
import TestScreen from './screens/TestScreen';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#2196F3" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animationEnabled: true,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'หน้าแรก' }}
          />
          <Stack.Screen 
            name="Test" 
            component={TestScreen}
            options={{ title: '🧪 ทดสอบ' }}
          />
          <Stack.Screen 
            name="QuickQuote" 
            component={QuickQuoteScreen}
            options={{ title: 'เช็คเบี้ยประกัน' }}
          />
          <Stack.Screen 
            name="InsuranceForm" 
            component={InsuranceFormScreen}
            options={{ title: 'กรอกข้อมูลลูกค้า' }}
          />
          <Stack.Screen 
            name="CustomerList" 
            component={CustomerListScreen}
            options={{ title: 'รายการลูกค้า' }}
          />
          <Stack.Screen 
            name="CustomerDetail" 
            component={CustomerDetailScreen}
            options={{ title: 'รายละเอียดลูกค้า' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}