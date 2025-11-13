import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Card, Button } from 'react-native-paper';
import AutocompleteInput from '../AutocompleteInput';
import { searchCarBrands, searchCarModels, getBrandById, getModelById } from '../../data/carData';
import type { VehicleInfo } from '../../types';

interface Props {
  data?: VehicleInfo;
  onChange: (data: VehicleInfo) => void;
}

export default function VehicleInfoStep({ data, onChange }: Props) {
  const [brandQuery, setBrandQuery] = useState(data?.brand || '');
  const [modelQuery, setModelQuery] = useState(data?.model || '');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [availableModels, setAvailableModels] = useState<any[]>([]);

  useEffect(() => {
    // หาค่า brand ID จากชื่อที่มีอยู่
    if (data?.brand) {
      const brand = searchCarBrands(data.brand).find(b => b.name === data.brand);
      if (brand) {
        setSelectedBrandId(brand.id);
        setAvailableModels(brand.models.map(m => ({ id: m.id, name: m.name })));
      }
    }
  }, [data?.brand]);

  const updateField = (field: keyof VehicleInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    } as VehicleInfo);
  };

  const handleBrandSelect = (brand: { id: string; name: string }) => {
    setBrandQuery(brand.name);
    setSelectedBrandId(brand.id);
    updateField('brand', brand.name);
    
    // รีเซ็ตรุ่นรถเมื่อเปลี่ยนยี่ห้อ
    setModelQuery('');
    updateField('model', '');
    updateField('subModel', '');
    
    // อัปเดตรายการรุ่นรถ
    const brandData = getBrandById(brand.id);
    if (brandData) {
      setAvailableModels(brandData.models.map(m => ({ id: m.id, name: m.name })));
    }
  };

  const handleModelSelect = (model: { id: string; name: string }) => {
    setModelQuery(model.name);
    updateField('model', model.name);
    
    // รีเซ็ตรุ่นย่อย
    updateField('subModel', '');
  };

  const brandOptions = searchCarBrands(brandQuery).map(brand => ({
    id: brand.id,
    name: brand.name,
  }));

  const modelOptions = selectedBrandId 
    ? searchCarModels(selectedBrandId, modelQuery).map(model => ({
        id: model.id,
        name: model.name,
      }))
    : [];

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          ข้อมูลรถยนต์
        </Text>

        <AutocompleteInput
          label="ยี่ห้อรถ *"
          value={brandQuery}
          onChangeText={setBrandQuery}
          onSelect={handleBrandSelect}
          options={brandOptions}
          placeholder="พิมพ์เพื่อค้นหา เช่น Toyota, Honda"
          style={styles.input}
        />

        <AutocompleteInput
          label="รุ่นรถ *"
          value={modelQuery}
          onChangeText={setModelQuery}
          onSelect={handleModelSelect}
          options={modelOptions}
          placeholder={selectedBrandId ? "พิมพ์เพื่อค้นหารุ่นรถ" : "เลือกยี่ห้อรถก่อน"}
          disabled={!selectedBrandId}
          style={styles.input}
        />

        <TextInput
          label="รุ่นย่อย"
          value={data?.subModel || ''}
          onChangeText={(value) => updateField('subModel', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="ปีรถ *"
          value={data?.year || ''}
          onChangeText={(value) => updateField('year', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          maxLength={4}
        />

        <TextInput
          label="เลขทะเบียนรถ *"
          value={data?.licensePlate || ''}
          onChangeText={(value) => updateField('licensePlate', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="เลข VIN *"
          value={data?.vin || ''}
          onChangeText={(value) => updateField('vin', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="เลขเครื่องยนต์ *"
          value={data?.engineNumber || ''}
          onChangeText={(value) => updateField('engineNumber', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="สีรถ *"
          value={data?.color || ''}
          onChangeText={(value) => updateField('color', value)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="ขนาดเครื่องยนต์ (ซีซี) *"
          value={data?.engineSize || ''}
          onChangeText={(value) => updateField('engineSize', value)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <Text variant="bodyMedium" style={styles.label}>
          ประเภทการใช้งาน *
        </Text>
        <View style={styles.segmentedContainer}>
          <Button
            mode={data?.usageType === 'personal' ? 'contained' : 'outlined'}
            onPress={() => updateField('usageType', 'personal')}
            style={styles.segmentedButton}
          >
            ใช้ส่วนตัว
          </Button>
          <Button
            mode={data?.usageType === 'commercial' ? 'contained' : 'outlined'}
            onPress={() => updateField('usageType', 'commercial')}
            style={styles.segmentedButton}
          >
            ใช้เชิงพาณิชย์
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
  },
  title: {
    marginBottom: 15,
    color: '#2196F3',
  },
  input: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
  },
  segmentedContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  segmentedButton: {
    flex: 1,
  },
});