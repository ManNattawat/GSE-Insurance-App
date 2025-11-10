-- Migration: เพิ่มคอลัมน์ในตาราง insurance.policies
-- สำหรับ GSE Insurance App
-- วันที่: 2025-11-10
-- Version 2: แก้ไขให้รันได้ถูกต้อง

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
ADD COLUMN IF NOT EXISTS usage_type text,
ADD COLUMN IF NOT EXISTS vehicle_type text,
ADD COLUMN IF NOT EXISTS vehicle_type_other text,
ADD COLUMN IF NOT EXISTS vehicle_accessories text;

-- เพิ่ม CHECK constraint แยก
ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_usage_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_usage_type_check CHECK (usage_type IS NULL OR usage_type IN ('personal', 'commercial'));

ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_vehicle_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_vehicle_type_check CHECK (vehicle_type IS NULL OR vehicle_type IN ('sedan', 'pickup4door', 'pickupHalfCab', 'pickupSingleCab', 'van', 'other'));

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
ADD COLUMN IF NOT EXISTS insurance_type text,
ADD COLUMN IF NOT EXISTS coverage_amount numeric,
ADD COLUMN IF NOT EXISTS coverage_period integer,
ADD COLUMN IF NOT EXISTS additional_coverage_flood boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_theft boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_medical boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_personal_accident boolean DEFAULT false,
-- ข้อมูลประกันเดิม
ADD COLUMN IF NOT EXISTS previous_insurance_company text,
ADD COLUMN IF NOT EXISTS previous_insurance_type text,
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
ADD COLUMN IF NOT EXISTS policy_status text;

-- เพิ่ม CHECK constraint สำหรับ insurance_type
ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_insurance_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_insurance_type_check CHECK (insurance_type IS NULL OR insurance_type IN ('class1', 'class2plus', 'class3plus', 'class3'));

ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_previous_insurance_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_previous_insurance_type_check CHECK (previous_insurance_type IS NULL OR previous_insurance_type IN ('class1', 'class2plus', 'class3plus', 'class3'));

ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_policy_status_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_policy_status_check CHECK (policy_status IS NULL OR policy_status IN ('new', 'renewal'));

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

