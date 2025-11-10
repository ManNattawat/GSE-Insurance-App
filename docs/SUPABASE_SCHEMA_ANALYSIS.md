# การวิเคราะห์ Schema Insurance ใน Supabase

## สรุปผลการตรวจสอบ

✅ **พบ schema `insurance` ใน Supabase แล้ว**

### ตารางที่มีอยู่ (13 ตาราง):

1. ✅ `brokers` - บริษัทประกัน
2. ✅ `claims` - การเคลม
3. ✅ `coverage_types` - ประเภทความคุ้มครอง
4. ✅ `documents` - เอกสาร
5. ✅ `employees` - พนักงาน
6. ✅ `logs` - บันทึก
7. ✅ `main_data` - ข้อมูลหลัก
8. ✅ `policies` - กรมธรรม์
9. ✅ `vehicle_types` - ประเภทรถ
10. ✅ `work_details` - รายละเอียดงาน
11. ✅ `work_status` - สถานะงาน
12. ✅ `work_status_details` - รายละเอียดสถานะงาน
13. ✅ `work_types` - ประเภทงาน

---

## เปรียบเทียบโครงสร้างข้อมูล

### ตาราง `policies` (ปัจจุบัน)

```sql
- id (bigint)
- policy_number (text) - เลขกรมธรรม์
- customer_name (text) - ชื่อลูกค้า
- id_card_number (text) - เลขบัตรประชาชน
- start_date (date) - วันที่เริ่มต้น
- end_date (date) - วันที่สิ้นสุด
- premium_amount (numeric) - เบี้ยประกัน
- status (text) - สถานะ
- created_by (text) - สร้างโดย
- created_at (timestamp) - สร้างเมื่อ
```

### ข้อมูลที่แอพต้องการ (CustomerData interface)

**ข้อมูลส่วนบุคคล:**
- ✅ customer_name → มีแล้ว
- ✅ id_card_number → มีแล้ว
- ❌ phone → ยังไม่มี
- ❌ email → ยังไม่มี
- ❌ lineId → ยังไม่มี
- ❌ address → ยังไม่มี

**ข้อมูลรถยนต์:**
- ❌ brand → ยังไม่มี
- ❌ model → ยังไม่มี
- ❌ subModel → ยังไม่มี
- ❌ year → ยังไม่มี
- ❌ licensePlate → ยังไม่มี
- ❌ vin → ยังไม่มี
- ❌ engineNumber → ยังไม่มี
- ❌ color → ยังไม่มี
- ❌ engineSize → ยังไม่มี
- ❌ usageType → ยังไม่มี
- ❌ vehicleType → ยังไม่มี
- ❌ accessories → ยังไม่มี

**ข้อมูลประกันภัย:**
- ✅ premium_amount → มีแล้ว (แต่ชื่อต่างกัน)
- ✅ start_date → มีแล้ว
- ✅ end_date → มีแล้ว
- ❌ insuranceType → ยังไม่มี
- ❌ coverageAmount → ยังไม่มี
- ❌ coveragePeriod → ยังไม่มี
- ❌ previousInsuranceCompany → ยังไม่มี
- ❌ previousPremium → ยังไม่มี
- ❌ proposedInsuranceCompany → ยังไม่มี
- ❌ proposedPremium → ยังไม่มี

**ข้อมูลพนักงานขาย:**
- ❌ salespersonName → ยังไม่มี
- ❌ salespersonPhone → ยังไม่มี

**อื่นๆ:**
- ❌ notes → ยังไม่มี

---

## แนะนำการปรับแก้

### ตัวเลือกที่ 1: เพิ่มคอลัมน์ในตาราง `policies` (แนะนำ)

```sql
ALTER TABLE insurance.policies
ADD COLUMN phone text,
ADD COLUMN email text,
ADD COLUMN line_id text,
ADD COLUMN address text,
ADD COLUMN vehicle_brand text,
ADD COLUMN vehicle_model text,
ADD COLUMN vehicle_sub_model text,
ADD COLUMN vehicle_year integer,
ADD COLUMN license_plate text,
ADD COLUMN vin text,
ADD COLUMN engine_number text,
ADD COLUMN vehicle_color text,
ADD COLUMN engine_size text,
ADD COLUMN usage_type text,
ADD COLUMN vehicle_type text,
ADD COLUMN vehicle_accessories text,
ADD COLUMN insurance_type text,
ADD COLUMN coverage_amount numeric,
ADD COLUMN coverage_period integer,
ADD COLUMN previous_insurance_company text,
ADD COLUMN previous_premium numeric,
ADD COLUMN proposed_insurance_company text,
ADD COLUMN proposed_premium numeric,
ADD COLUMN salesperson_name text,
ADD COLUMN salesperson_phone text,
ADD COLUMN notes text;
```

### ตัวเลือกที่ 2: สร้างตารางใหม่แยกตามโครงสร้าง

```sql
-- ตารางข้อมูลลูกค้า
CREATE TABLE insurance.customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  policy_id bigint REFERENCES insurance.policies(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  id_card text,
  phone text,
  email text,
  line_id text,
  address text,
  created_at timestamp with time zone DEFAULT now()
);

-- ตารางข้อมูลรถยนต์
CREATE TABLE insurance.vehicles (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  policy_id bigint REFERENCES insurance.policies(id),
  brand text,
  model text,
  sub_model text,
  year integer,
  license_plate text,
  vin text,
  engine_number text,
  color text,
  engine_size text,
  usage_type text,
  vehicle_type text,
  accessories text,
  created_at timestamp with time zone DEFAULT now()
);

-- ตารางข้อมูลประกันภัย
CREATE TABLE insurance.insurance_details (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  policy_id bigint REFERENCES insurance.policies(id),
  insurance_type text,
  coverage_amount numeric,
  coverage_period integer,
  previous_insurance_company text,
  previous_premium numeric,
  proposed_insurance_company text,
  proposed_premium numeric,
  created_at timestamp with time zone DEFAULT now()
);
```

---

## ตารางที่เกี่ยวข้อง

### `insurance.brokers`
- ใช้เก็บข้อมูลบริษัทประกัน (15+ บริษัท)
- มีฟิลด์: name, code, rate_multiplier, contact_phone, contact_email

### `insurance.employees`
- ใช้เก็บข้อมูลพนักงานขาย
- มีฟิลด์: employee_code, employee_name, position

### `insurance.documents`
- ใช้เก็บเอกสารประกอบ (บัตรประชาชน, ทะเบียนรถ, ใบขับขี่)
- มีฟิลด์: policy_id, doc_type, storage_path

### `insurance.claims`
- ใช้เก็บข้อมูลการเคลม
- มีฟิลด์: policy_id, claim_number, claim_amount, status

---

## ขั้นตอนต่อไป

1. ✅ ตรวจสอบโครงสร้างตารางเสร็จแล้ว
2. ⏳ ตัดสินใจว่าจะใช้วิธีไหน (เพิ่มคอลัมน์ หรือสร้างตารางใหม่)
3. ⏳ สร้าง SQL migration script
4. ⏳ อัปเดตแอพให้เชื่อมต่อกับ Supabase
5. ⏳ ทดสอบการบันทึกและดึงข้อมูล

