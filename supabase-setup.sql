-- สร้างตาราง customers ใน Supabase
-- ไปที่ Supabase Dashboard > SQL Editor > วางโค้ดนี้แล้วรัน

-- ลบ view หรือ table เดิม (ถ้ามี)
DROP VIEW IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- สร้างตาราง customers
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  insurance_type TEXT,
  policy_number TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- สร้าง index สำหรับค้นหาเร็วขึ้น
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_name ON customers(name);
CREATE INDEX idx_customers_status ON customers(status);

-- สร้าง function สำหรับอัปเดต updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง trigger สำหรับอัปเดต updated_at
CREATE TRIGGER update_customers_updated_at 
    BEFORE UPDATE ON customers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ตั้งค่า Row Level Security (RLS) - ปิดไว้ก่อน (เปิดให้ทุกคนเข้าถึงได้)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- สร้าง policy ให้ทุกคนเข้าถึงได้ (สำหรับการทดสอบ)
-- เปลี่ยนเป็น policy ที่เหมาะสมตามความต้องการของคุณ
DROP POLICY IF EXISTS "Allow all operations" ON customers;
CREATE POLICY "Allow all operations" ON customers
  FOR ALL
  USING (true)
  WITH CHECK (true);

