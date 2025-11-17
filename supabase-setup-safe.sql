-- สร้างตารางสำหรับ GSE Insurance App (เวอร์ชันปลอดภัย - ไม่ลบตารางเดิม)
-- ใช้ชื่อตาราง: gse_insurance_customers เพื่อไม่ทับตารางอื่น

-- สร้างตาราง gse_insurance_customers
CREATE TABLE IF NOT EXISTS gse_insurance_customers (
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
CREATE INDEX IF NOT EXISTS idx_gse_customers_phone ON gse_insurance_customers(phone);
CREATE INDEX IF NOT EXISTS idx_gse_customers_name ON gse_insurance_customers(name);
CREATE INDEX IF NOT EXISTS idx_gse_customers_status ON gse_insurance_customers(status);

-- สร้าง function สำหรับอัปเดต updated_at อัตโนมัติ (ถ้ายังไม่มี)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง trigger สำหรับอัปเดต updated_at
DROP TRIGGER IF EXISTS update_gse_customers_updated_at ON gse_insurance_customers;
CREATE TRIGGER update_gse_customers_updated_at 
    BEFORE UPDATE ON gse_insurance_customers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ตั้งค่า Row Level Security (RLS)
ALTER TABLE gse_insurance_customers ENABLE ROW LEVEL SECURITY;

-- สร้าง policy ให้ทุกคนเข้าถึงได้ (สำหรับการทดสอบ)
DROP POLICY IF EXISTS "Allow all operations" ON gse_insurance_customers;
CREATE POLICY "Allow all operations" ON gse_insurance_customers
  FOR ALL
  USING (true)
  WITH CHECK (true);

