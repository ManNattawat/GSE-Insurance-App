// Service สำหรับจัดการข้อมูล Policies ใน Supabase
import { supabase } from '../config/supabase';
import type { CustomerData } from '../types';

/**
 * แปลง CustomerData เป็นรูปแบบที่เก็บในตาราง policies
 */
function mapCustomerDataToPolicy(customerData: CustomerData, createdBy?: string) {
  const personalInfo = customerData.personalInfo || {};
  const vehicleInfo = customerData.vehicleInfo || {};
  const drivingInfo = customerData.drivingInfo || {};
  const insuranceInfo = customerData.insuranceInfo || {};
  const salespersonInfo = customerData.salespersonInfo || {};

  return {
    // ข้อมูลเดิม
    policy_number: `POL-${Date.now()}`, // สร้างเลขกรมธรรม์ชั่วคราว
    customer_name: `${personalInfo.firstName} ${personalInfo.lastName}`.trim(),
    id_card_number: personalInfo.idCard,
    start_date: insuranceInfo.coverageEndDate ? undefined : new Date().toISOString().split('T')[0],
    end_date: insuranceInfo.coverageEndDate || null,
    premium_amount: insuranceInfo.proposedPremium ? parseFloat(insuranceInfo.proposedPremium) : null,
    status: 'active',
    created_by: createdBy || 'app',
    
    // ข้อมูลส่วนบุคคล
    phone: personalInfo.phone,
    email: personalInfo.email,
    line_id: personalInfo.lineId,
    address: personalInfo.address,
    first_name: personalInfo.firstName,
    last_name: personalInfo.lastName,
    
    // ข้อมูลรถยนต์
    vehicle_brand: vehicleInfo.brand,
    vehicle_model: vehicleInfo.model,
    vehicle_sub_model: vehicleInfo.subModel,
    vehicle_year: vehicleInfo.year ? parseInt(vehicleInfo.year) : null,
    license_plate: vehicleInfo.licensePlate,
    vin: vehicleInfo.vin,
    engine_number: vehicleInfo.engineNumber,
    vehicle_color: vehicleInfo.color,
    engine_size: vehicleInfo.engineSize,
    usage_type: vehicleInfo.usageType,
    vehicle_type: vehicleInfo.vehicleType,
    vehicle_type_other: vehicleInfo.vehicleTypeOther,
    vehicle_accessories: vehicleInfo.accessories,
    
    // ข้อมูลการขับขี่
    driving_license_years: drivingInfo.drivingLicenseYears,
    driving_experience: drivingInfo.drivingExperience,
    accident_history: drivingInfo.accidentHistory || false,
    claim_history: drivingInfo.claimHistory || false,
    number_of_drivers: drivingInfo.numberOfDrivers,
    main_driver_age: drivingInfo.mainDriverAge,
    
    // ข้อมูลประกันภัย
    insurance_type: insuranceInfo.insuranceType,
    coverage_amount: insuranceInfo.coverageAmount ? parseFloat(insuranceInfo.coverageAmount) : null,
    coverage_period: insuranceInfo.coveragePeriod ? parseInt(insuranceInfo.coveragePeriod) : null,
    additional_coverage_flood: insuranceInfo.additionalCoverage?.flood || false,
    additional_coverage_theft: insuranceInfo.additionalCoverage?.theft || false,
    additional_coverage_medical: insuranceInfo.additionalCoverage?.medical || false,
    additional_coverage_personal_accident: insuranceInfo.additionalCoverage?.personalAccident || false,
    
    // ข้อมูลประกันเดิม
    previous_insurance_company: insuranceInfo.previousInsuranceCompany,
    previous_insurance_type: insuranceInfo.previousInsuranceType,
    previous_premium: insuranceInfo.previousPremium ? parseFloat(insuranceInfo.previousPremium) : null,
    previous_coverage_service_center: insuranceInfo.previousCoverage?.serviceCenter || false,
    previous_coverage_garage: insuranceInfo.previousCoverage?.garage || false,
    previous_coverage_flood: insuranceInfo.previousCoverage?.flood || false,
    previous_coverage_fire: insuranceInfo.previousCoverage?.fire || false,
    
    // ข้อมูลแพ็กเกจใหม่
    proposed_insurance_company: insuranceInfo.proposedInsuranceCompany,
    proposed_premium: insuranceInfo.proposedPremium ? parseFloat(insuranceInfo.proposedPremium) : null,
    proposed_highlights: insuranceInfo.proposedHighlights,
    promotion_discount: insuranceInfo.promotionDiscount,
    
    // อื่นๆ
    policy_status: insuranceInfo.status,
    salesperson_name: salespersonInfo.name,
    salesperson_phone: salespersonInfo.phone,
    notes: customerData.notes,
  };
}

/**
 * แปลงข้อมูลจากตาราง policies เป็น CustomerData
 */
function mapPolicyToCustomerData(policy: any): CustomerData {
  return {
    id: policy.id?.toString(),
    personalInfo: {
      firstName: policy.first_name || policy.customer_name?.split(' ')[0] || '',
      lastName: policy.last_name || policy.customer_name?.split(' ').slice(1).join(' ') || '',
      idCard: policy.id_card_number || '',
      address: policy.address || '',
      phone: policy.phone || '',
      email: policy.email || '',
      lineId: policy.line_id,
    },
    vehicleInfo: {
      brand: policy.vehicle_brand || '',
      model: policy.vehicle_model || '',
      subModel: policy.vehicle_sub_model,
      year: policy.vehicle_year?.toString() || '',
      licensePlate: policy.license_plate || '',
      vin: policy.vin || '',
      engineNumber: policy.engine_number || '',
      color: policy.vehicle_color || '',
      engineSize: policy.engine_size || '',
      usageType: (policy.usage_type as 'personal' | 'commercial') || 'personal',
      vehicleType: policy.vehicle_type as any,
      vehicleTypeOther: policy.vehicle_type_other,
      accessories: policy.vehicle_accessories,
    },
    drivingInfo: {
      drivingLicenseYears: policy.driving_license_years || '',
      drivingExperience: policy.driving_experience || '',
      accidentHistory: policy.accident_history || false,
      claimHistory: policy.claim_history || false,
      numberOfDrivers: policy.number_of_drivers || '',
      mainDriverAge: policy.main_driver_age || '',
    },
    insuranceInfo: {
      insuranceType: (policy.insurance_type as any) || 'class1',
      coverageAmount: policy.coverage_amount?.toString() || '',
      additionalCoverage: {
        flood: policy.additional_coverage_flood || false,
        theft: policy.additional_coverage_theft || false,
        medical: policy.additional_coverage_medical || false,
        personalAccident: policy.additional_coverage_personal_accident || false,
      },
      coveragePeriod: policy.coverage_period?.toString() || '',
      coverageEndDate: policy.end_date,
      previousInsuranceCompany: policy.previous_insurance_company,
      previousInsuranceType: policy.previous_insurance_type as any,
      previousPremium: policy.previous_premium?.toString(),
      previousCoverage: {
        serviceCenter: policy.previous_coverage_service_center || false,
        garage: policy.previous_coverage_garage || false,
        flood: policy.previous_coverage_flood || false,
        fire: policy.previous_coverage_fire || false,
      },
      proposedInsuranceCompany: policy.proposed_insurance_company,
      proposedPremium: policy.proposed_premium?.toString(),
      proposedHighlights: policy.proposed_highlights,
      promotionDiscount: policy.promotion_discount,
      status: (policy.policy_status as 'new' | 'renewal') || 'new',
    },
    documents: {}, // TODO: จัดการเอกสารแยก
    salespersonInfo: {
      name: policy.salesperson_name,
      phone: policy.salesperson_phone,
    },
    notes: policy.notes,
    createdAt: policy.created_at,
    updatedAt: policy.updated_at,
  };
}

/**
 * บันทึกข้อมูลลูกค้าใหม่
 */
export async function saveCustomer(customerData: CustomerData, createdBy?: string) {
  try {
    const policyData = mapCustomerDataToPolicy(customerData, createdBy);
    
    // ใช้ RPC exec_sql เพื่อ insert ข้อมูลเข้า insurance.policies
    // ต้อง escape single quotes ใน string values
    const escapeSql = (str: string | null | undefined) => {
      if (!str) return '';
      return String(str).replace(/'/g, "''");
    };
    
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: `
        INSERT INTO insurance.policies (
          policy_number, customer_name, id_card_number, phone, email, line_id, address,
          first_name, last_name, vehicle_brand, vehicle_model, vehicle_sub_model,
          vehicle_year, license_plate, vin, engine_number, vehicle_color, engine_size,
          usage_type, vehicle_type, vehicle_type_other, vehicle_accessories,
          driving_license_years, driving_experience, accident_history, claim_history,
          number_of_drivers, main_driver_age, insurance_type, coverage_amount,
          coverage_period, additional_coverage_flood, additional_coverage_theft,
          additional_coverage_medical, additional_coverage_personal_accident,
          previous_insurance_company, previous_insurance_type, previous_premium,
          previous_coverage_service_center, previous_coverage_garage,
          previous_coverage_flood, previous_coverage_fire,
          proposed_insurance_company, proposed_premium, proposed_highlights,
          promotion_discount, policy_status, salesperson_name, salesperson_phone,
          notes, status, created_by
        ) VALUES (
          '${escapeSql(policyData.policy_number)}', '${escapeSql(policyData.customer_name)}', 
          '${escapeSql(policyData.id_card_number)}', '${escapeSql(policyData.phone)}',
          '${escapeSql(policyData.email)}', '${escapeSql(policyData.line_id)}',
          '${escapeSql(policyData.address)}', '${escapeSql(policyData.first_name)}',
          '${escapeSql(policyData.last_name)}', '${escapeSql(policyData.vehicle_brand)}',
          '${escapeSql(policyData.vehicle_model)}', '${escapeSql(policyData.vehicle_sub_model)}',
          ${policyData.vehicle_year || null}, '${escapeSql(policyData.license_plate)}',
          '${escapeSql(policyData.vin)}', '${escapeSql(policyData.engine_number)}',
          '${escapeSql(policyData.vehicle_color)}', '${escapeSql(policyData.engine_size)}',
          '${escapeSql(policyData.usage_type || 'personal')}', '${escapeSql(policyData.vehicle_type)}',
          '${escapeSql(policyData.vehicle_type_other)}', '${escapeSql(policyData.vehicle_accessories)}',
          '${escapeSql(policyData.driving_license_years)}', '${escapeSql(policyData.driving_experience)}',
          ${policyData.accident_history || false}, ${policyData.claim_history || false},
          '${escapeSql(policyData.number_of_drivers)}', '${escapeSql(policyData.main_driver_age)}',
          '${escapeSql(policyData.insurance_type || 'class1')}', ${policyData.coverage_amount || 0},
          ${policyData.coverage_period || null}, ${policyData.additional_coverage_flood || false},
          ${policyData.additional_coverage_theft || false}, ${policyData.additional_coverage_medical || false},
          ${policyData.additional_coverage_personal_accident || false},
          '${escapeSql(policyData.previous_insurance_company)}', '${escapeSql(policyData.previous_insurance_type)}',
          ${policyData.previous_premium || null}, ${policyData.previous_coverage_service_center || false},
          ${policyData.previous_coverage_garage || false}, ${policyData.previous_coverage_flood || false},
          ${policyData.previous_coverage_fire || false}, '${escapeSql(policyData.proposed_insurance_company)}',
          ${policyData.proposed_premium || null}, '${escapeSql(policyData.proposed_highlights)}',
          '${escapeSql(policyData.promotion_discount)}', '${escapeSql(policyData.policy_status || 'new')}',
          '${escapeSql(policyData.salesperson_name)}', '${escapeSql(policyData.salesperson_phone)}',
          '${escapeSql(policyData.notes)}', '${escapeSql(policyData.status || 'active')}',
          '${escapeSql(policyData.created_by || 'App User')}'
        )
        RETURNING *;
      `
    });
    
    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(`ไม่สามารถบันทึกข้อมูลได้: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
      throw new Error('ไม่สามารถบันทึกข้อมูลได้: ไม่มีข้อมูลที่ส่งกลับมา');
    }
    
    return {
      success: true,
      data: mapPolicyToCustomerData(data[0]),
      id: data[0].id,
    };
  } catch (error: any) {
    console.error('Error saving customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถบันทึกข้อมูลได้',
    };
  }
}

/**
 * ดึงข้อมูลลูกค้าทั้งหมด
 */
export async function getAllCustomers() {
  try {
    // ใช้ RPC function เพื่อเข้าถึง insurance schema
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: `
        SELECT * FROM insurance.policies 
        ORDER BY created_at DESC
      `
    });
    
    if (error) {
      console.error('RPC error:', error);
      // ถ้า RPC ไม่ได้ ลองใช้ view ใน public schema (ถ้ามี)
      const { data: viewData, error: viewError } = await supabase
        .from('policies_full')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (viewError) {
        throw new Error(`ไม่สามารถดึงข้อมูลได้: ${error.message}`);
      }
      
      return {
        success: true,
        data: viewData?.map(mapPolicyToCustomerData) || [],
      };
    }
    
    return {
      success: true,
      data: Array.isArray(data) ? data.map(mapPolicyToCustomerData) : [],
    };
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถดึงข้อมูลได้',
      data: [],
    };
  }
}

/**
 * ดึงข้อมูลลูกค้าตาม ID
 */
export async function getCustomerById(id: string) {
  try {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      data: mapPolicyToCustomerData(data),
    };
  } catch (error: any) {
    console.error('Error fetching customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถดึงข้อมูลได้',
    };
  }
}

/**
 * ค้นหาลูกค้า
 */
export async function searchCustomers(query: string) {
  try {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .or(`customer_name.ilike.%${query}%,phone.ilike.%${query}%,license_plate.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      data: data?.map(mapPolicyToCustomerData) || [],
    };
  } catch (error: any) {
    console.error('Error searching customers:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถค้นหาข้อมูลได้',
      data: [],
    };
  }
}

/**
 * อัปเดตข้อมูลลูกค้า
 */
export async function updateCustomer(id: string, customerData: CustomerData) {
  try {
    const policyData = mapCustomerDataToPolicy(customerData);
    
    const { data, error } = await supabase
      .from('policies')
      .update(policyData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      data: mapPolicyToCustomerData(data),
    };
  } catch (error: any) {
    console.error('Error updating customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถอัปเดตข้อมูลได้',
    };
  }
}

/**
 * ลบข้อมูลลูกค้า
 */
export async function deleteCustomer(id: string) {
  try {
    const { error } = await supabase
      .from('policies')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Error deleting customer:', error);
    return {
      success: false,
      error: error.message || 'ไม่สามารถลบข้อมูลได้',
    };
  }
}

