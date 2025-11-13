export interface CarBrand {
  id: string;
  name: string;
  models: CarModel[];
}

export interface CarModel {
  id: string;
  name: string;
  subModels?: string[];
}

export const CAR_BRANDS: CarBrand[] = [
  {
    id: 'toyota',
    name: 'Toyota',
    models: [
      { id: 'camry', name: 'Camry', subModels: ['2.0G', '2.5Q', '2.5HV'] },
      { id: 'corolla', name: 'Corolla', subModels: ['1.6G', '1.8E', '1.8HV'] },
      { id: 'vios', name: 'Vios', subModels: ['1.5E', '1.5G', '1.5S'] },
      { id: 'yaris', name: 'Yaris', subModels: ['1.2E', '1.2G', '1.2S'] },
      { id: 'hilux', name: 'Hilux', subModels: ['2.4E', '2.8G', '2.8V'] },
      { id: 'fortuner', name: 'Fortuner', subModels: ['2.4G', '2.8V', '2.8LG'] },
      { id: 'innova', name: 'Innova', subModels: ['2.0E', '2.0G', '2.0V'] },
      { id: 'sienta', name: 'Sienta', subModels: ['1.5V', '1.5G'] },
      { id: 'chr', name: 'C-HR', subModels: ['1.8HV', '1.8HV Premium'] },
      { id: 'prius', name: 'Prius', subModels: ['1.8HV', '1.8HV Premium'] },
    ]
  },
  {
    id: 'honda',
    name: 'Honda',
    models: [
      { id: 'civic', name: 'Civic', subModels: ['1.5E', '1.5EL', '1.5RS'] },
      { id: 'accord', name: 'Accord', subModels: ['1.5EL', '1.5EL+', 'Hybrid'] },
      { id: 'city', name: 'City', subModels: ['1.0S', '1.0SV', '1.0RS'] },
      { id: 'jazz', name: 'Jazz', subModels: ['1.5S', '1.5V', '1.5RS'] },
      { id: 'hrv', name: 'HR-V', subModels: ['1.8E', '1.8EL', '1.8RS'] },
      { id: 'crv', name: 'CR-V', subModels: ['1.5E', '1.5EL', '2.4EL'] },
      { id: 'brv', name: 'BR-V', subModels: ['1.5S', '1.5E', '1.5V'] },
      { id: 'pilot', name: 'Pilot', subModels: ['3.5EL'] },
    ]
  },
  {
    id: 'nissan',
    name: 'Nissan',
    models: [
      { id: 'almera', name: 'Almera', subModels: ['1.0E', '1.0EL', '1.0VL'] },
      { id: 'march', name: 'March', subModels: ['1.2E', '1.2EL', '1.2VL'] },
      { id: 'note', name: 'Note', subModels: ['1.2V', '1.2VL'] },
      { id: 'kicks', name: 'Kicks', subModels: ['1.2V', '1.2VL'] },
      { id: 'xtrail', name: 'X-Trail', subModels: ['2.0V', '2.0VL', '2.5VL'] },
      { id: 'navara', name: 'Navara', subModels: ['2.3VL', '2.5VL'] },
      { id: 'terra', name: 'Terra', subModels: ['2.3V', '2.3VL'] },
    ]
  },
  {
    id: 'mazda',
    name: 'Mazda',
    models: [
      { id: 'mazda2', name: 'Mazda2', subModels: ['1.3C', '1.3E', '1.3S'] },
      { id: 'mazda3', name: 'Mazda3', subModels: ['2.0C', '2.0E', '2.0S'] },
      { id: 'cx3', name: 'CX-3', subModels: ['2.0C', '2.0S', '2.0SP'] },
      { id: 'cx5', name: 'CX-5', subModels: ['2.0C', '2.0S', '2.5S'] },
      { id: 'cx8', name: 'CX-8', subModels: ['2.5S', '2.5SP'] },
      { id: 'bt50', name: 'BT-50', subModels: ['1.9C', '1.9S', '3.2'] },
    ]
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi',
    models: [
      { id: 'mirage', name: 'Mirage', subModels: ['1.2GL', '1.2GLS', '1.2GLX'] },
      { id: 'attrage', name: 'Attrage', subModels: ['1.2GL', '1.2GLS', '1.2GLX'] },
      { id: 'xpander', name: 'Xpander', subModels: ['1.5GL', '1.5GLS', '1.5GT'] },
      { id: 'outlander', name: 'Outlander', subModels: ['2.0GL', '2.4GT'] },
      { id: 'pajero', name: 'Pajero Sport', subModels: ['2.4GL', '2.4GT', '3.0GT'] },
      { id: 'triton', name: 'Triton', subModels: ['2.4GL', '2.4GLS', '2.4GT'] },
    ]
  },
  {
    id: 'isuzu',
    name: 'Isuzu',
    models: [
      { id: 'dmax', name: 'D-Max', subModels: ['1.9S', '1.9L', '3.0V'] },
      { id: 'mux', name: 'MU-X', subModels: ['1.9S', '1.9L', '3.0V'] },
    ]
  },
  {
    id: 'ford',
    name: 'Ford',
    models: [
      { id: 'ranger', name: 'Ranger', subModels: ['2.0L', '2.0H', '3.2W'] },
      { id: 'everest', name: 'Everest', subModels: ['2.0L', '2.0T', '3.2T'] },
      { id: 'ecosport', name: 'EcoSport', subModels: ['1.0T', '1.5T'] },
    ]
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    models: [
      { id: 'colorado', name: 'Colorado', subModels: ['2.5L', '2.8L', '2.8H'] },
      { id: 'trailblazer', name: 'Trailblazer', subModels: ['2.5L', '2.8L'] },
      { id: 'captiva', name: 'Captiva', subModels: ['1.5T', '2.0D'] },
    ]
  },
  {
    id: 'mg',
    name: 'MG',
    models: [
      { id: 'mg3', name: 'MG3', subModels: ['1.5X', '1.5D'] },
      { id: 'mg5', name: 'MG5', subModels: ['1.5X', '1.5D'] },
      { id: 'zs', name: 'ZS', subModels: ['1.5X', '1.5D'] },
      { id: 'hs', name: 'HS', subModels: ['1.5T', '2.0T'] },
      { id: 'ep', name: 'EP', subModels: ['EV'] },
    ]
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    models: [
      { id: 'swift', name: 'Swift', subModels: ['1.2GL', '1.2GLX'] },
      { id: 'celerio', name: 'Celerio', subModels: ['1.0GL', '1.0GLX'] },
      { id: 'ertiga', name: 'Ertiga', subModels: ['1.5GL', '1.5GLX'] },
      { id: 'vitara', name: 'Vitara', subModels: ['1.6GL', '1.6GLX'] },
      { id: 'jimny', name: 'Jimny', subModels: ['1.5MT', '1.5AT'] },
    ]
  }
];

// ฟังก์ชันค้นหายี่ห้อรถ
export function searchCarBrands(query: string): CarBrand[] {
  if (!query.trim()) return CAR_BRANDS;
  
  const searchTerm = query.toLowerCase();
  return CAR_BRANDS.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm)
  );
}

// ฟังก์ชันค้นหารุ่นรถ
export function searchCarModels(brandId: string, query: string): CarModel[] {
  const brand = CAR_BRANDS.find(b => b.id === brandId);
  if (!brand) return [];
  
  if (!query.trim()) return brand.models;
  
  const searchTerm = query.toLowerCase();
  return brand.models.filter(model => 
    model.name.toLowerCase().includes(searchTerm)
  );
}

// ฟังก์ชันหายี่ห้อจาก ID
export function getBrandById(brandId: string): CarBrand | undefined {
  return CAR_BRANDS.find(b => b.id === brandId);
}

// ฟังก์ชันหารุ่นจาก ID
export function getModelById(brandId: string, modelId: string): CarModel | undefined {
  const brand = getBrandById(brandId);
  return brand?.models.find(m => m.id === modelId);
}