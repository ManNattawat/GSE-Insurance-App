// Supabase Configuration
import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const SUPABASE_URL = 'https://cifnlfayusnkpnamelga.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZm5sZmF5dXNua3BuYW1lbGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NDc4MjgsImV4cCI6MjA2OTUyMzgyOH0.5Da2JLNG88DHSxv5sxmvGUcuSk8ZOgKNvwOcIoWLH-Q';

// สร้าง Supabase client
// ใช้ public schema (Supabase client ไม่รองรับ custom schema โดยตรง)
// จะใช้ RPC function เพื่อเข้าถึง insurance schema แทน
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: {
    schema: 'public',
  },
});

// Export สำหรับใช้ในแอพ
export default supabase;

