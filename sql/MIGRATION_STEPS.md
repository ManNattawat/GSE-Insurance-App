# Migration Steps สำหรับเพิ่มคอลัมน์ในตาราง insurance.policies

## คำแนะนำ
1. เปิด Supabase Dashboard → SQL Editor
2. Copy คำสั่งทีละคำสั่งไปวาง
3. กด Run
4. ตรวจสอบผลลัพธ์
5. ถ้าสำเร็จ ให้บอก "สำเร็จ" แล้วจะส่งคำสั่งถัดไป

---

## Step 1: เพิ่มคอลัมน์ข้อมูลส่วนบุคคล (6 คอลัมน์)

```sql
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS line_id text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text;
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 2: เพิ่มคอลัมน์ข้อมูลรถยนต์ (13 คอลัมน์)

```sql
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
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 3: เพิ่มคอลัมน์ข้อมูลการขับขี่ (6 คอลัมน์)

```sql
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS driving_license_years text,
ADD COLUMN IF NOT EXISTS driving_experience text,
ADD COLUMN IF NOT EXISTS accident_history boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS claim_history boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS number_of_drivers text,
ADD COLUMN IF NOT EXISTS main_driver_age text;
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 4: เพิ่มคอลัมน์ข้อมูลประกันภัย (4 คอลัมน์พื้นฐาน)

```sql
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS insurance_type text,
ADD COLUMN IF NOT EXISTS coverage_amount numeric,
ADD COLUMN IF NOT EXISTS coverage_period integer,
ADD COLUMN IF NOT EXISTS additional_coverage_flood boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_theft boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_medical boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS additional_coverage_personal_accident boolean DEFAULT false;
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 5: เพิ่มคอลัมน์ข้อมูลประกันเดิม (8 คอลัมน์)

```sql
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS previous_insurance_company text,
ADD COLUMN IF NOT EXISTS previous_insurance_type text,
ADD COLUMN IF NOT EXISTS previous_premium numeric,
ADD COLUMN IF NOT EXISTS previous_coverage_service_center boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS previous_coverage_garage boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS previous_coverage_flood boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS previous_coverage_fire boolean DEFAULT false;
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 6: เพิ่มคอลัมน์ข้อมูลแพ็กเกจใหม่ (4 คอลัมน์)

```sql
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS proposed_insurance_company text,
ADD COLUMN IF NOT EXISTS proposed_premium numeric,
ADD COLUMN IF NOT EXISTS proposed_highlights text,
ADD COLUMN IF NOT EXISTS promotion_discount text;
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 7: เพิ่มคอลัมน์อื่นๆ (3 คอลัมน์)

```sql
ALTER TABLE insurance.policies
ADD COLUMN IF NOT EXISTS policy_status text,
ADD COLUMN IF NOT EXISTS salesperson_name text,
ADD COLUMN IF NOT EXISTS salesperson_phone text,
ADD COLUMN IF NOT EXISTS notes text,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 8: เพิ่ม CHECK Constraints

```sql
ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_usage_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_usage_type_check CHECK (usage_type IS NULL OR usage_type IN ('personal', 'commercial'));
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 9: เพิ่ม CHECK Constraint สำหรับ vehicle_type

```sql
ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_vehicle_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_vehicle_type_check CHECK (vehicle_type IS NULL OR vehicle_type IN ('sedan', 'pickup4door', 'pickupHalfCab', 'pickupSingleCab', 'van', 'other'));
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 10: เพิ่ม CHECK Constraint สำหรับ insurance_type

```sql
ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_insurance_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_insurance_type_check CHECK (insurance_type IS NULL OR insurance_type IN ('class1', 'class2plus', 'class3plus', 'class3'));
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 11: เพิ่ม CHECK Constraint สำหรับ previous_insurance_type

```sql
ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_previous_insurance_type_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_previous_insurance_type_check CHECK (previous_insurance_type IS NULL OR previous_insurance_type IN ('class1', 'class2plus', 'class3plus', 'class3'));
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 12: เพิ่ม CHECK Constraint สำหรับ policy_status

```sql
ALTER TABLE insurance.policies
DROP CONSTRAINT IF EXISTS policies_policy_status_check;
ALTER TABLE insurance.policies
ADD CONSTRAINT policies_policy_status_check CHECK (policy_status IS NULL OR policy_status IN ('new', 'renewal'));
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 13: สร้าง Indexes (6 indexes)

```sql
CREATE INDEX IF NOT EXISTS idx_policies_phone ON insurance.policies(phone);
CREATE INDEX IF NOT EXISTS idx_policies_license_plate ON insurance.policies(license_plate);
CREATE INDEX IF NOT EXISTS idx_policies_customer_name ON insurance.policies(customer_name);
CREATE INDEX IF NOT EXISTS idx_policies_status ON insurance.policies(status);
CREATE INDEX IF NOT EXISTS idx_policies_created_at ON insurance.policies(created_at);
CREATE INDEX IF NOT EXISTS idx_policies_policy_status ON insurance.policies(policy_status);
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 14: สร้าง Function สำหรับ updated_at

```sql
CREATE OR REPLACE FUNCTION insurance.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 15: สร้าง Trigger สำหรับ updated_at

```sql
DROP TRIGGER IF EXISTS update_policies_updated_at ON insurance.policies;
CREATE TRIGGER update_policies_updated_at
    BEFORE UPDATE ON insurance.policies
    FOR EACH ROW
    EXECUTE FUNCTION insurance.update_updated_at_column();
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 16: สร้าง View สำหรับดึงข้อมูลครบถ้วน

```sql
CREATE OR REPLACE VIEW insurance.policies_full AS
SELECT 
    p.id,
    p.policy_number,
    p.customer_name,
    p.first_name,
    p.last_name,
    p.id_card_number,
    p.phone,
    p.email,
    p.line_id,
    p.address,
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
    p.driving_license_years,
    p.driving_experience,
    p.accident_history,
    p.claim_history,
    p.number_of_drivers,
    p.main_driver_age,
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
    p.previous_insurance_company,
    p.previous_insurance_type,
    p.previous_premium,
    p.previous_coverage_service_center,
    p.previous_coverage_garage,
    p.previous_coverage_flood,
    p.previous_coverage_fire,
    p.proposed_insurance_company,
    p.proposed_premium,
    p.proposed_highlights,
    p.promotion_discount,
    p.policy_status,
    p.status,
    p.salesperson_name,
    p.salesperson_phone,
    p.notes,
    p.created_by,
    p.created_at,
    p.updated_at
FROM insurance.policies p;
```

**ผลลัพธ์ที่คาดหวัง:** Success. No rows returned

---

## Step 17: ตรวจสอบผลลัพธ์

```sql
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'insurance' 
    AND table_name = 'policies'
ORDER BY ordinal_position;
```

**ผลลัพธ์ที่คาดหวัง:** ควรเห็นคอลัมน์ทั้งหมดประมาณ 58+ คอลัมน์

---

## สรุป
- **Total Steps:** 17 ขั้นตอน
- **Total Columns Added:** 48 คอลัมน์
- **Indexes Created:** 6 indexes
- **Constraints Added:** 5 CHECK constraints
- **Function Created:** 1 function
- **Trigger Created:** 1 trigger
- **View Created:** 1 view

