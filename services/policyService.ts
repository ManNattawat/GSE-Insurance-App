import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CustomerData } from '../types';

const STORAGE_KEY = '@gse_insurance_customers';

async function loadCustomersFromStorage(): Promise<CustomerData[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading customers from storage:', error);
    return [];
  }
}

async function saveCustomersToStorage(customers: CustomerData[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (error) {
    console.error('Error saving customers to storage:', error);
    throw error;
  }
}

function generateId(): string {
  return `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function saveCustomer(customerData: CustomerData) {
  try {
    const customers = await loadCustomersFromStorage();
    
    const newCustomer: CustomerData = {
      ...customerData,
      id: customerData.id || generateId(),
      createdAt: customerData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    customers.push(newCustomer);
    await saveCustomersToStorage(customers);
    
    return {
      success: true,
      data: newCustomer,
      id: newCustomer.id,
    };
  } catch (error: any) {
    console.error('Error saving customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถบันทึกข้อมูลได้',
    };
  }
}

export async function getAllCustomers() {
  try {
    const customers = await loadCustomersFromStorage();
    
    const sortedCustomers = customers.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    
    return {
      success: true,
      data: sortedCustomers,
    };
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถดึงข้อมูลได้',
      data: [],
    };
  }
}

export async function getCustomerById(id: string) {
  try {
    const customers = await loadCustomersFromStorage();
    const customer = customers.find(c => c.id === id);
    
    if (!customer) {
      return {
        success: false,
        error: 'ไม่พบข้อมูลลูกค้า',
      };
    }
    
    return {
      success: true,
      data: customer,
    };
  } catch (error: any) {
    console.error('Error fetching customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถดึงข้อมูลได้',
    };
  }
}

export async function searchCustomers(query: string) {
  try {
    const customers = await loadCustomersFromStorage();
    const searchLower = query.toLowerCase().trim();
    
    if (!searchLower) {
      return {
        success: true,
        data: customers,
      };
    }
    
    const filtered = customers.filter(customer => {
      const name = `${customer.personalInfo?.firstName || ''} ${customer.personalInfo?.lastName || ''}`.toLowerCase();
      const phone = customer.personalInfo?.phone?.toLowerCase() || '';
      const licensePlate = customer.vehicleInfo?.licensePlate?.toLowerCase() || '';
      
      return name.includes(searchLower) || 
             phone.includes(searchLower) || 
             licensePlate.includes(searchLower);
    });
    
    const sorted = filtered.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    
    return {
      success: true,
      data: sorted,
    };
  } catch (error: any) {
    console.error('Error searching customers:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถค้นหาข้อมูลได้',
      data: [],
    };
  }
}