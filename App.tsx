import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import AddCustomerScreen from './screens/AddCustomerScreen';
import CustomerListScreen from './screens/CustomerListScreen';
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
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'หน้าแรก' }}
          />
          <Stack.Screen 
            name="AddCustomer" 
            component={AddCustomerScreen}
            options={{ title: 'บันทึกข้อมูลลูกค้า' }}
          />
          <Stack.Screen 
            name="CustomerList" 
            component={CustomerListScreen}
            options={{ title: 'รายการลูกค้า' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
