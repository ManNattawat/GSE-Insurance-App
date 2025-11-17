import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import CustomerListScreen from '../screens/CustomerListScreen';
import CustomerFormScreen from '../screens/CustomerFormScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerList"
        component={CustomerListScreen}
        options={{ title: 'รายชื่อลูกค้า' }}
      />
      <Stack.Screen
        name="CustomerForm"
        component={CustomerFormScreen}
        options={{ title: 'ข้อมูลลูกค้า' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Customers') {
              iconName = focused ? 'people' : 'people-outline';
            } else {
              iconName = 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Customers"
          component={CustomerStack}
          options={{ title: 'ลูกค้า' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

