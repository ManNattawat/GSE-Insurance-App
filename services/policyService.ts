import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabase';
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
    const newCustomer: CustomerData = {
      ...customerData,
      id: customerData.id || generateId(),
      createdAt: customerData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // บันทึกลง Supabase
    try {
      const { error: supabaseError } = await supabase
        .from('customers')
        .insert([{
          id: newCustomer.id,
          personal_info: newCustomer.personalInfo,
          vehicle_info: newCustomer.vehicleInfo,
          driving_info: newCustomer.drivingInfo,
          insurance_info: newCustomer.insuranceInfo,
          documents: newCustomer.documents,
          salesperson_info: newCustomer.salespersonInfo,
          notes: newCustomer.notes,
          created_at: newCustomer.createdAt,
          updated_at: newCustomer.updatedAt,
        }]);

      if (supabaseError) {
        console.warn('Supabase save failed, using local storage:', supabaseError.message);
      }
    } catch (supabaseError) {
      console.warn('Supabase connection failed, using local storage:', supabaseError);
    }

    // บันทึกลง Local Storage (backup)
    const customers = await loadCustomersFromStorage();
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
    let customers: CustomerData[] = [];

    // ลองดึงจาก Supabase ก่อน
    try {
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!supabaseError && supabaseData) {
        customers = supabaseData.map(row => ({
          id: row.id,
          personalInfo: row.personal_info,
          vehicleInfo: row.vehicle_info,
          drivingInfo: row.driving_info,
          insuranceInfo: row.insurance_info,
          documents: row.documents,
          salespersonInfo: row.salesperson_info,
          notes: row.notes,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));
      }
    } catch (supabaseError) {
      console.warn('Supabase fetch failed, using local storage:', supabaseError);
    }

    // ถ้าไม่มีข้อมูลจาก Supabase ให้ใช้ Local Storage
    if (customers.length === 0) {
      customers = await loadCustomersFromStorage();
      customers.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    }
    
    return {
      success: true,
      data: customers,
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