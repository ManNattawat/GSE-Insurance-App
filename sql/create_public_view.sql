-- สร้าง View ใน public schema เพื่อให้ Supabase client เข้าถึงได้
-- วันที่: 2025-11-10

-- ============================================
-- สร้าง View ใน public schema
-- ============================================
CREATE OR REPLACE VIEW public.policies_full AS
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

-- Grant permissions ให้ anon role
GRANT SELECT ON public.policies_full TO anon;
GRANT SELECT ON public.policies_full TO authenticated;

-- สร้าง function สำหรับ insert (ถ้าต้องการ)
CREATE OR REPLACE FUNCTION public.insert_policy(
    policy_data jsonb
) RETURNS jsonb AS $$
DECLARE
    result jsonb;
BEGIN
    -- Insert ข้อมูลเข้า insurance.policies
    -- (ต้องสร้าง function ที่รับ jsonb และ insert ข้อมูล)
    -- สำหรับตอนนี้ ให้ใช้ RPC exec_sql แทน
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.insert_policy(jsonb) TO anon;
GRANT EXECUTE ON FUNCTION public.insert_policy(jsonb) TO authenticated;

