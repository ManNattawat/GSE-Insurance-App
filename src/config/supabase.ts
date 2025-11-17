import { createClient } from '@supabase/supabase-js';

// ✅ SUPABASE_URL - Project URL
const SUPABASE_URL = 'https://cifnlfayusnkpnamelga.supabase.co';

// ✅ Anon Key (ใช้สำหรับแอป - ปลอดภัย)
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZm5sZmF5dXNua3BuYW1lbGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NDc4MjgsImV4cCI6MjA2OTUyMzgyOH0.5Da2JLNG88DHSxv5sxmvGUcuSk8ZOgKNvwOcIoWLH-Q';

// ⚠️ Service Role Key - อย่าใช้ในแอป! เก็บไว้สำหรับ Server-side เท่านั้น
// const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Table name - ใช้ View ใน public schema (ชี้ไปที่ insurance.customers)
export const CUSTOMERS_TABLE = 'customers';

