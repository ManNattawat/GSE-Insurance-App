-- ตรวจสอบตารางที่มีอยู่ในฐานข้อมูล
-- รัน SQL นี้ใน Supabase SQL Editor เพื่อดูตารางทั้งหมด

SELECT 
    table_name,
    table_type
FROM 
    information_schema.tables
WHERE 
    table_schema = 'public'
ORDER BY 
    table_name;

-- ตรวจสอบว่ามีตาราง customers อยู่แล้วหรือไม่
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'customers'
        ) 
        THEN 'ตาราง customers มีอยู่แล้ว!'
        ELSE 'ตาราง customers ยังไม่มี'
    END AS status;

