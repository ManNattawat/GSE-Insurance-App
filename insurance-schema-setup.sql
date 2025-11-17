-- สร้างตาราง customers ใน schema.insurance
-- สำหรับ GSE Insurance App

-- สร้าง schema insurance (ถ้ายังไม่มี)
CREATE SCHEMA IF NOT EXISTS insurance;

-- สร้างตาราง insurance.customers
CREATE TABLE IF NOT EXISTS insurance.customers (
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
CREATE INDEX IF NOT EXISTS idx_insurance_customers_phone ON insurance.customers(phone);
CREATE INDEX IF NOT EXISTS idx_insurance_customers_name ON insurance.customers(name);
CREATE INDEX IF NOT EXISTS idx_insurance_customers_status ON insurance.customers(status);

-- สร้าง function สำหรับอัปเดต updated_at อัตโนมัติ (ถ้ายังไม่มี)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง trigger สำหรับอัปเดต updated_at
DROP TRIGGER IF EXISTS update_insurance_customers_updated_at ON insurance.customers;
CREATE TRIGGER update_insurance_customers_updated_at 
    BEFORE UPDATE ON insurance.customers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- สร้าง View ใน public schema เพื่อให้แอปเข้าถึงได้ง่าย
CREATE OR REPLACE VIEW public.customers AS
SELECT 
    id,
    name,
    phone,
    email,
    address,
    insurance_type,
    policy_number,
    status,
    created_at,
    updated_at
FROM insurance.customers;

-- สร้าง INSTEAD OF triggers เพื่อให้ View รองรับ INSERT/UPDATE/DELETE
CREATE OR REPLACE FUNCTION public.insert_customer()
RETURNS TRIGGER AS $$
DECLARE
    inserted_id UUID;
BEGIN
    INSERT INTO insurance.customers (
        name, phone, email, address, 
        insurance_type, policy_number, status
    ) VALUES (
        NEW.name, NEW.phone, NEW.email, NEW.address,
        NEW.insurance_type, NEW.policy_number, COALESCE(NEW.status, 'active')
    ) RETURNING id INTO inserted_id;
    
    NEW.id := inserted_id;
    NEW.created_at := NOW();
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_customer()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE insurance.customers SET
        name = NEW.name,
        phone = NEW.phone,
        email = NEW.email,
        address = NEW.address,
        insurance_type = NEW.insurance_type,
        policy_number = NEW.policy_number,
        status = NEW.status,
        updated_at = NOW()
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.delete_customer()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM insurance.customers WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- สร้าง triggers สำหรับ View
DROP TRIGGER IF EXISTS customers_insert_trigger ON public.customers;
DROP TRIGGER IF EXISTS customers_update_trigger ON public.customers;
DROP TRIGGER IF EXISTS customers_delete_trigger ON public.customers;

CREATE TRIGGER customers_insert_trigger
    INSTEAD OF INSERT ON public.customers
    FOR EACH ROW EXECUTE FUNCTION public.insert_customer();

CREATE TRIGGER customers_update_trigger
    INSTEAD OF UPDATE ON public.customers
    FOR EACH ROW EXECUTE FUNCTION public.update_customer();

CREATE TRIGGER customers_delete_trigger
    INSTEAD OF DELETE ON public.customers
    FOR EACH ROW EXECUTE FUNCTION public.delete_customer();

-- ตั้งค่า RLS สำหรับตาราง insurance.customers
ALTER TABLE insurance.customers ENABLE ROW LEVEL SECURITY;

-- สร้าง policy ให้ทุกคนเข้าถึงได้ (สำหรับการทดสอบ)
DROP POLICY IF EXISTS "Allow all operations" ON insurance.customers;
CREATE POLICY "Allow all operations" ON insurance.customers
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant permissions ให้ view สามารถเข้าถึงตารางได้
GRANT SELECT, INSERT, UPDATE, DELETE ON insurance.customers TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO anon, authenticated;

