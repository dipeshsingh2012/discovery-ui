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
      id: 'prod_hiljhil_guji',
      name: 'Ethiopian Guji Single Origin (250g)',
      brand: 'Hiljhil Roasters',
      sku: 'HJ-GUJI-250',
      category: 'coffee_beans',
      price: 22.00,
      width_cm: 10.0,
      height_cm: 20.0,
      depth_cm: 6.0,
      top_clearance_cm: 0.0,
      side_clearance_cm: 0.0,
      rear_clearance_cm: 0.0,
      image_url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&auto=format&fit=crop&q=80',
      description: 'Heirloom natural process. Crisp floral aromas with sweet nectarine and wild lavender finish.',
    },
    {
      id: 'prod_hiljhil_espresso_blend',
      name: 'Highland Dark Peak Espresso Blend (500g)',
      brand: 'Hiljhil Roasters',
      sku: 'HJ-DPE-500',
      category: 'coffee_beans',
      price: 28.50,
      width_cm: 12.0,
      height_cm: 24.0,
      depth_cm: 8.0,
      top_clearance_cm: 0.0,
      side_clearance_cm: 0.0,
      rear_clearance_cm: 0.0,
      image_url: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&auto=format&fit=crop&q=80',
      description: 'Signature house blend of Colombia & Sumatra. Dark chocolate, candied walnut, and velvety crema.',
    },
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
      description: 'Touchscreen espresso machine with integrated grinder and automated microfoam texturing.',
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
      description: 'Ultra-slim 6-inch wide manual espresso machine engineered for tight kitchen coffee counters.',
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
      description: 'Compact espresso machine delivering cafe-quality coffee with 3-second thermo-jet heatup.',
    },
    {
      id: 'prod_fellow_ode_gen2',
      name: 'Ode Gen 2 Precision Brew Grinder',
      brand: 'Fellow',
      sku: 'FEL-ODE-G2',
      category: 'grinder',
      price: 345.00,
      width_cm: 12.0,
      height_cm: 24.1,
      depth_cm: 23.9,
      top_clearance_cm: 4.0,
      side_clearance_cm: 2.0,
      rear_clearance_cm: 2.0,
      image_url: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600&auto=format&fit=crop&q=80',
      description: 'Low-profile single dose grinder with 64mm flat burrs designed specifically for pour-overs and cold brews.',
    },
    {
      id: 'prod_cruffin_pastry',
      name: 'Cardamom Pistachio Cruffin (Cafe Pickup)',
      brand: 'Hiljhil Bakery',
      sku: 'HJ-CRU-01',
      category: 'cafe_menu',
      price: 4.50,
      width_cm: 8.0,
      height_cm: 10.0,
      depth_cm: 8.0,
      top_clearance_cm: 0.0,
      side_clearance_cm: 0.0,
      rear_clearance_cm: 0.0,
      image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
      description: 'Fresh artisanal laminated cruffin filled with pistachio cream and dusted with aromatic hill cardamom.',
    },
  ];

  if (category && category !== 'all') {
    return fallbacks.filter((p) => p.category === category);
  }
  return fallbacks;
}
