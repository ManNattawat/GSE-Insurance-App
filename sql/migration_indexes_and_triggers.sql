-- Migration: สร้าง Indexes และ Triggers สำหรับตาราง insurance.policies
-- สำหรับ GSE Insurance App
-- วันที่: 2025-11-10

-- ============================================
-- สร้าง Index สำหรับการค้นหา
-- ============================================
CREATE INDEX IF NOT EXISTS idx_policies_phone ON insurance.policies(phone);
CREATE INDEX IF NOT EXISTS idx_policies_license_plate ON insurance.policies(license_plate);
CREATE INDEX IF NOT EXISTS idx_policies_customer_name ON insurance.policies(customer_name);
CREATE INDEX IF NOT EXISTS idx_policies_status ON insurance.policies(status);
CREATE INDEX IF NOT EXISTS idx_policies_created_at ON insurance.policies(created_at);
CREATE INDEX IF NOT EXISTS idx_policies_policy_status ON insurance.policies(policy_status);

-- ============================================
-- สร้าง Function สำหรับ updated_at
-- ============================================
CREATE OR REPLACE FUNCTION insurance.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- สร้าง Trigger สำหรับ updated_at
-- ============================================
DROP TRIGGER IF EXISTS update_policies_updated_at ON insurance.policies;
CREATE TRIGGER update_policies_updated_at
    BEFORE UPDATE ON insurance.policies
    FOR EACH ROW
    EXECUTE FUNCTION insurance.update_updated_at_column();

