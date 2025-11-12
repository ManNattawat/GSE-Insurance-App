// Service สำหรับจัดการข้อมูล Policies ใน AsyncStorage (เก็บข้อมูลในเครื่อง)
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CustomerData } from '../types';

const STORAGE_KEY = '@gse_insurance_customers';

/**
 * ดึงข้อมูลลูกค้าทั้งหมดจาก AsyncStorage
 */
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

/**
 * บันทึกข้อมูลลูกค้าทั้งหมดลง AsyncStorage
 */
async function saveCustomersToStorage(customers: CustomerData[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (error) {
    console.error('Error saving customers to storage:', error);
    throw error;
  }
}

/**
 * สร้าง ID ใหม่สำหรับลูกค้า
 */
function generateId(): string {
  return `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * บันทึกข้อมูลลูกค้าใหม่
 */
export async function saveCustomer(customerData: CustomerData, createdBy?: string) {
  try {
    const customers = await loadCustomersFromStorage();
    
    // สร้าง ID ถ้ายังไม่มี
    const newCustomer: CustomerData = {
      ...customerData,
      id: customerData.id || generateId(),
      createdAt: customerData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // เพิ่มลูกค้าใหม่
    customers.push(newCustomer);
    
    // บันทึกลง storage
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

/**
 * ดึงข้อมูลลูกค้าทั้งหมด
 */
export async function getAllCustomers() {
  try {
    const customers = await loadCustomersFromStorage();
    
    // เรียงตามวันที่สร้าง (ใหม่สุดก่อน)
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

/**
 * ดึงข้อมูลลูกค้าตาม ID
 */
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

/**
 * ค้นหาลูกค้า
 */
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
    
    // ค้นหาจากชื่อ, เบอร์โทร, หรือเลขทะเบียน
    const filtered = customers.filter(customer => {
      const name = `${customer.personalInfo?.firstName || ''} ${customer.personalInfo?.lastName || ''}`.toLowerCase();
      const phone = customer.personalInfo?.phone?.toLowerCase() || '';
      const licensePlate = customer.vehicleInfo?.licensePlate?.toLowerCase() || '';
      
      return name.includes(searchLower) || 
             phone.includes(searchLower) || 
             licensePlate.includes(searchLower);
    });
    
    // เรียงตามวันที่สร้าง (ใหม่สุดก่อน)
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

/**
 * อัปเดตข้อมูลลูกค้า
 */
export async function updateCustomer(id: string, customerData: CustomerData) {
  try {
    const customers = await loadCustomersFromStorage();
    const index = customers.findIndex(c => c.id === id);
    
    if (index === -1) {
      return {
        success: false,
        error: 'ไม่พบข้อมูลลูกค้า',
      };
    }
    
    // อัปเดตข้อมูล
    customers[index] = {
      ...customerData,
      id,
      updatedAt: new Date().toISOString(),
      createdAt: customers[index].createdAt || new Date().toISOString(),
    };
    
    // บันทึกลง storage
    await saveCustomersToStorage(customers);
    
    return {
      success: true,
      data: customers[index],
    };
  } catch (error: any) {
    console.error('Error updating customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถอัปเดตข้อมูลได้',
    };
  }
}

/**
 * ลบข้อมูลลูกค้า
 */
export async function deleteCustomer(id: string) {
  try {
    const customers = await loadCustomersFromStorage();
    const filtered = customers.filter(c => c.id !== id);
    
    if (filtered.length === customers.length) {
      return {
        success: false,
        error: 'ไม่พบข้อมูลลูกค้า',
      };
    }
    
    // บันทึกลง storage
    await saveCustomersToStorage(filtered);
    
    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Error deleting customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถลบข้อมูลได้',
    };
  }
}
