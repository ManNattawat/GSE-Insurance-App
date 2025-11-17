export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  insurance_type?: string;
  policy_number?: string;
  status?: 'active' | 'inactive' | 'pending';
  created_at?: string;
  updated_at?: string;
}

