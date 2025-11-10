-- Migration: เพิ่มคอลัมน์ในตาราง insurance.policies
-- สำหรับ GSE Insurance App
-- วันที่: 2025-11-10

-- ============================================
-- ข้อมูลส่วนบุคคล
-- ============================================
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS line_id text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text;

-- ============================================
-- ข้อมูลรถยนต์
-- ============================================
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS vehicle_brand text,
ADD COLUMN IF NOT EXISTS vehicle_model text,
ADD COLUMN IF NOT EXISTS vehicle_sub_model text,
ADD COLUMN IF NOT EXISTS vehicle_year integer,
ADD COLUMN IF NOT EXISTS license_plate text,
ADD COLUMN IF NOT EXISTS vin text,
ADD COLUMN IF NOT EXISTS engine_number text,
ADD COLUMN IF NOT EXISTS vehicle_color text,
ADD COLUMN IF NOT EXISTS engine_size text,
ADD COLUMN IF NOT EXISTS usage_type text CHECK (usage_type IN ('personal', 'commercial')),
ADD COLUMN IF NOT EXISTS vehicle_type text CHECK (vehicle_type IN ('sedan', 'pickup4door', 'pickupHalfCab', 'pickupSingleCab', 'van', 'other')),
ADD COLUMN IF NOT EXISTS vehicle_type_other text,
ADD COLUMN IF NOT EXISTS vehicle_accessories text;

-- ============================================
-- ข้อมูลการขับขี่
-- ============================================
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS driving_license_years text,
ADD COLUMN IF NOT EXISTS driving_experience text,
ADD COLUMN IF NOT EXISTS accident_history boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS claim_history boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS number_of_drivers text,
ADD COLUMN IF NOT EXISTS main_driver_age text;

-- ============================================
-- ข้อมูลประกันภัย
-- ============================================
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS insurance_type text CHECK (insurance_type IN ('class1', 'class2plus', 'class3plus', 'class3')),
ADD COLUMN IF NOT EXISTS coverage_amount numeric,
ADD COLUMN IF NOT EXISTS coverage_period integer,
ADD COLUMN IF NOT EXISTS additional_coverage_flood boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_theft boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_medical boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_personal_accident boolean DEFAULT false,
-- ข้อมูลประกันเดิม
ADD COLUMN IF NOT EXISTS previous_insurance_company text,
ADD COLUMN IF NOT EXISTS previous_insurance_type text CHECK (previous_insurance_type IN ('class1', 'class2plus', 'class3plus', 'class3')),
ADD COLUMN IF NOT EXISTS previous_premium numeric,
ADD COLUMN IF NOT EXISTS previous_coverage_service_center boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS previous_coverage_garage boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS previous_coverage_flood boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS previous_coverage_fire boolean DEFAULT false,
-- ข้อมูลแพ็กเกจใหม่ที่เสนอ
ADD COLUMN IF NOT EXISTS proposed_insurance_company text,
ADD COLUMN IF NOT EXISTS proposed_premium numeric,
ADD COLUMN IF NOT EXISTS proposed_highlights text,
ADD COLUMN IF NOT EXISTS promotion_discount text,
-- สถานะ (new/renewal)
ADD COLUMN IF NOT EXISTS policy_status text CHECK (policy_status IN ('new', 'renewal'));

-- ============================================
-- ข้อมูลพนักงานขาย
-- ============================================
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS salesperson_name text,
ADD COLUMN IF NOT EXISTS salesperson_phone text;

-- ============================================
-- อื่นๆ
-- ============================================
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS notes text,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- ============================================
-- สร้าง Index สำหรับการค้นหา
-- ============================================
CREATE INDEX IF NOT EXISTS idx_policies_phone ON insurance.policies(phone);
CREATE INDEX IF NOT EXISTS idx_policies_license_plate ON insurance.policies(license_plate);
CREATE INDEX IF NOT EXISTS idx_policies_customer_name ON insurance.policies(customer_name);
CREATE INDEX IF NOT EXISTS idx_policies_status ON insurance.policies(status);
CREATE INDEX IF NOT EXISTS idx_policies_created_at ON insurance.policies(created_at);

-- ============================================
-- สร้าง Trigger สำหรับ updated_at
-- ============================================
CREATE OR REPLACE FUNCTION insurance.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_policies_updated_at ON insurance.policies;
CREATE TRIGGER update_policies_updated_at
    BEFORE UPDATE ON insurance.policies
    FOR EACH ROW
    EXECUTE FUNCTION insurance.update_updated_at_column();

-- ============================================
-- สร้าง View สำหรับดึงข้อมูลครบถ้วน
-- ============================================
CREATE OR REPLACE VIEW insurance.policies_full AS
SELECT 
    p.id,
    p.policy_number,
    -- ข้อมูลส่วนบุคคล
    p.customer_name,
    p.first_name,
    p.last_name,
    p.id_card_number,
    p.phone,
    p.email,
    p.line_id,
    p.address,
    -- ข้อมูลรถยนต์
    p.vehicle_brand,
    p.vehicle_model,
    p.vehicle_sub_model,
    p.vehicle_year,
    p.license_plate,
    p.vin,
    p.engine_number,
    p.vehicle_color,
    p.engine_size,
    p.usage_type,
    p.vehicle_type,
    p.vehicle_type_other,
    p.vehicle_accessories,
    -- ข้อมูลการขับขี่
    p.driving_license_years,
    p.driving_experience,
    p.accident_history,
    p.claim_history,
    p.number_of_drivers,
    p.main_driver_age,
    -- ข้อมูลประกันภัย
    p.insurance_type,
    p.coverage_amount,
    p.coverage_period,
    p.start_date,
    p.end_date,
    p.premium_amount,
    p.additional_coverage_flood,
    p.additional_coverage_theft,
    p.additional_coverage_medical,
    p.additional_coverage_personal_accident,
    -- ข้อมูลประกันเดิม
    p.previous_insurance_company,
    p.previous_insurance_type,
    p.previous_premium,
    p.previous_coverage_service_center,
    p.previous_coverage_garage,
    p.previous_coverage_flood,
    p.previous_coverage_fire,
    -- ข้อมูลแพ็กเกจใหม่
    p.proposed_insurance_company,
    p.proposed_premium,
    p.proposed_highlights,
    p.promotion_discount,
    -- อื่นๆ
    p.policy_status,
    p.status,
    p.salesperson_name,
    p.salesperson_phone,
    p.notes,
    p.created_by,
    p.created_at,
    p.updated_at
FROM insurance.policies p;

-- ============================================
-- สร้าง Comment สำหรับคอลัมน์
-- ============================================
COMMENT ON COLUMN insurance.policies.phone IS 'เบอร์โทรศัพท์ลูกค้า';
COMMENT ON COLUMN insurance.policies.email IS 'อีเมลลูกค้า';
COMMENT ON COLUMN insurance.policies.line_id IS 'Line ID สำหรับการติดตาม';
COMMENT ON COLUMN insurance.policies.license_plate IS 'เลขทะเบียนรถ';
COMMENT ON COLUMN insurance.policies.vehicle_brand IS 'ยี่ห้อรถ';
COMMENT ON COLUMN insurance.policies.vehicle_model IS 'รุ่นรถ';
COMMENT ON COLUMN insurance.policies.insurance_type IS 'ประเภทประกัน (class1, class2plus, class3plus, class3)';
COMMENT ON COLUMN insurance.policies.policy_status IS 'สถานะ (new=สมัครใหม่, renewal=ต่ออายุ)';

