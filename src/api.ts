import { DiscoveryProduct } from './types';

const CATALOG_API_URL = import.meta.env.VITE_CATALOG_API_URL || 'http://localhost:8001/api/v1/products';

export async function fetchCatalogProducts(category?: string): Promise<DiscoveryProduct[]> {
  const url = category && category !== 'all' ? `${CATALOG_API_URL}?category=${category}` : CATALOG_API_URL;
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.items || [];
    }
  } catch (err) {
    console.warn('Could not reach product-catalog-service, using fallback mock catalog');
  }

  const fallbacks: DiscoveryProduct[] = [
    {
      id: 'prod_breville_barista_touch',
      name: 'Barista Touch Espresso Machine',
      brand: 'Breville',
      sku: 'BES880BSS',
      category: 'espresso_machine',
      price: 999.95,
      width_cm: 32.2,
      height_cm: 40.7,
      depth_cm: 32.2,
      top_clearance_cm: 12.0,
      side_clearance_cm: 5.0,
      rear_clearance_cm: 5.0,
      image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80',
      description: 'Touchscreen espresso machine with automated microfoam texturing.',
    },
    {
      id: 'prod_vitamix_5200',
      name: '5200 Professional Blender',
      brand: 'Vitamix',
      sku: 'VM0103',
      category: 'blender',
      price: 499.95,
      width_cm: 22.2,
      height_cm: 52.0,
      depth_cm: 18.5,
      top_clearance_cm: 6.0,
      side_clearance_cm: 3.0,
      rear_clearance_cm: 3.0,
      image_url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80',
      description: 'Tall professional blender with 64-ounce container.',
    },
    {
      id: 'prod_delonghi_dedica',
      name: 'Dedica Deluxe Slim Espresso Machine',
      brand: "De'Longhi",
      sku: 'EC680M',
      category: 'espresso_machine',
      price: 299.95,
      width_cm: 14.9,
      height_cm: 30.5,
      depth_cm: 33.0,
      top_clearance_cm: 5.0,
      side_clearance_cm: 3.0,
      rear_clearance_cm: 4.0,
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      description: 'Ultra-slim 6-inch wide manual espresso machine.',
    },
    {
      id: 'prod_breville_bambino',
      name: 'Bambino Plus Compact Espresso Machine',
      brand: 'Breville',
      sku: 'BES500BSS',
      category: 'espresso_machine',
      price: 499.95,
      width_cm: 19.5,
      height_cm: 31.0,
      depth_cm: 32.0,
      top_clearance_cm: 5.0,
      side_clearance_cm: 3.0,
      rear_clearance_cm: 4.0,
      image_url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=600&auto=format&fit=crop&q=80',
      description: 'Compact espresso machine delivering barista-quality coffee.',
    },
    {
      id: 'prod_kitchenaid_artisan',
      name: 'Artisan Series 5-Quart Stand Mixer',
      brand: 'KitchenAid',
      sku: 'KSM150PSER',
      category: 'stand_mixer',
      price: 449.99,
      width_cm: 22.2,
      height_cm: 35.6,
      depth_cm: 36.2,
      top_clearance_cm: 14.0,
      side_clearance_cm: 5.0,
      rear_clearance_cm: 5.0,
      image_url: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=600&auto=format&fit=crop&q=80',
      description: 'Tilt-head stand mixer for cookies, bread, and pastries.',
    },
    {
      id: 'prod_ninja_airfryer_xl',
      name: 'Foodi XL 6-in-1 10-Qt Air Fryer',
      brand: 'Ninja',
      sku: 'DZ401',
      category: 'air_fryer',
      price: 229.99,
      width_cm: 43.4,
      height_cm: 32.5,
      depth_cm: 37.1,
      top_clearance_cm: 12.0,
      side_clearance_cm: 8.0,
      rear_clearance_cm: 10.0,
      image_url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
      description: 'DualZone 2-basket air fryer to cook 2 foods simultaneously.',
    },
  ];

  if (category && category !== 'all') {
    return fallbacks.filter((p) => p.category === category);
  }
  return fallbacks;
}
