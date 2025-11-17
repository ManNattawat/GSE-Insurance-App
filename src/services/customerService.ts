import { supabase, CUSTOMERS_TABLE } from '../config/supabase';
import { Customer } from '../types/customer';

export const customerService = {
  // ดึงข้อมูลลูกค้าทั้งหมด
  async getAllCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from(CUSTOMERS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // ดึงข้อมูลลูกค้าตาม ID
  async getCustomerById(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from(CUSTOMERS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // เพิ่มลูกค้าใหม่
  async createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer> {
    const { data, error } = await supabase
      .from(CUSTOMERS_TABLE)
      .insert([customer])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // อัปเดตข้อมูลลูกค้า
  async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
    const { data, error } = await supabase
      .from(CUSTOMERS_TABLE)
      .update({ ...customer, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // ลบลูกค้า
  async deleteCustomer(id: string): Promise<void> {
    const { error } = await supabase
      .from(CUSTOMERS_TABLE)
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

