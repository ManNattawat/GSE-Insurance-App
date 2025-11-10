import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import InsuranceFormScreen from './screens/InsuranceFormScreen';
import CustomerListScreen from './screens/CustomerListScreen';
import CustomerDetailScreen from './screens/CustomerDetailScreen';
import QuickQuoteScreen from './screens/QuickQuoteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
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
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'หน้าแรก' }}
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
