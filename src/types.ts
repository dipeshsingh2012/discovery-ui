export interface DiscoveryProduct {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  price: number;
  width_cm: number;
  height_cm: number;
  depth_cm: number;
  weight_kg?: number;
  top_clearance_cm: number;
  side_clearance_cm: number;
  rear_clearance_cm: number;
  image_url?: string;
  cutout_url?: string;
  description?: string;
}
