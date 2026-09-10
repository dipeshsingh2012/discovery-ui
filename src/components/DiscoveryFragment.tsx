import React, { useEffect, useState } from 'react';
import {
  Ruler,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Search,
  X,
} from 'lucide-react';
import {
  ProtonThemeProvider,
  ProtonSlider,
  ProtonCard,
  ProtonButton,
  ProtonStatusBadge,
  ProtonInput,
} from '@dipeshsingh2012/proton/react';
import { fetchCatalogProducts } from '../api';
import { DiscoveryProduct } from '../types';

interface DiscoveryFragmentProps {
  initialCategory?: string;
  initialMaxHeight?: number | null;
  onProductSelect?: (product: DiscoveryProduct) => void;
  onClearanceFilterChange?: (clearanceCm: number | null) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Roastery & Gear' },
  { id: 'coffee_beans', label: 'Fresh Roasted Beans' },
  { id: 'espresso_machine', label: 'Espresso Machines' },
  { id: 'grinder', label: 'Precision Grinders' },
  { id: 'cafe_menu', label: 'In-Cafe Bar & Bakery' },
];

export const DiscoveryFragment: React.FC<DiscoveryFragmentProps> = ({
  initialCategory = 'all',
  initialMaxHeight = null,
  onProductSelect,
  onClearanceFilterChange,
}) => {
  const [products, setProducts] = useState<DiscoveryProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [maxHeightSlider, setMaxHeightSlider] = useState<number>(initialMaxHeight || 60);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(initialMaxHeight !== null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await fetchCatalogProducts(selectedCategory);
      setProducts(data);
      setIsLoading(false);
    }
    load();
  }, [selectedCategory]);

  const handlePresetClick = (val: number | null) => {
    if (val === null) {
      setIsFilterActive(false);
      onClearanceFilterChange?.(null);
    } else {
      setIsFilterActive(true);
      setMaxHeightSlider(val);
      onClearanceFilterChange?.(val);
    }
  };

  const filteredProducts = products.filter((prod) => {
    if (
      searchQuery &&
      !prod.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prod.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <ProtonThemeProvider>
      <div className="space-y-8 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Appliances Collection & Discovery
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse kitchen appliances filtered by your kitchen countertop clearance.
          </p>
        </div>

        {/* Filter and Space Qualifier Toolbar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Space Qualifier: Cabinet Height Slider */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-indigo-600" />
                  Cabinet Clearance Filter
                </span>
                {isFilterActive && (
                  <button
                    type="button"
                    onClick={() => handlePresetClick(null)}
                    className="text-[10px] text-slate-400 hover:text-rose-600 font-medium flex items-center gap-0.5"
                  >
                    <X className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                Only show appliances that comfortably fit under this height.
              </p>
            </div>

            <div className="md:col-span-5 space-y-2">
              <ProtonSlider
                value={maxHeightSlider}
                min={30}
                max={65}
                step={1}
                unit="cm"
                label={isFilterActive ? `Max Clearance Limit` : 'Max Height'}
                onChange={(val) => {
                  setMaxHeightSlider(val);
                  setIsFilterActive(true);
                  onClearanceFilterChange?.(val);
                }}
              />
            </div>

            <div className="md:col-span-3 flex items-center gap-1.5 justify-end">
              <button
                type="button"
                onClick={() => handlePresetClick(45)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                  isFilterActive && maxHeightSlider === 45
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Standard 45cm
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick(52)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                  isFilterActive && maxHeightSlider === 52
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Tall 52cm
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <ProtonInput
            placeholder="Search appliances by brand or model name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={<Search style={{ width: 16, height: 16, color: '#94a3b8' }} />}
          />
        </div>

        {/* Product Cards Grid */}
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">Loading collection...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">No appliances match your criteria.</p>
            <div className="mt-3 inline-block">
              <ProtonButton
                size="sm"
                onClick={() => handlePresetClick(null)}
              >
                Reset Filters
              </ProtonButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => {
              const totalRequired = prod.height_cm + prod.top_clearance_cm;
              const fitsSpace = !isFilterActive || totalRequired <= maxHeightSlider;

              return (
                <ProtonCard
                  key={prod.id}
                  hoverEffect
                  padding="md"
                  onClick={() => onProductSelect?.(prod)}
                  className={`transition-all cursor-pointer flex flex-col justify-between group ${
                    fitsSpace ? '' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        {prod.brand}
                      </span>

                      {isFilterActive && (
                        <ProtonStatusBadge
                          status={fitsSpace ? 'success' : 'error'}
                          size="sm"
                          pulse={fitsSpace}
                          icon={
                            fitsSpace ? (
                              <CheckCircle2 style={{ width: 12, height: 12 }} />
                            ) : (
                              <AlertTriangle style={{ width: 12, height: 12 }} />
                            )
                          }
                          label={
                            fitsSpace
                              ? 'Fits Your Space'
                              : `Exceeds by ${(totalRequired - maxHeightSlider).toFixed(1)} cm`
                          }
                        />
                      )}
                    </div>

                    <div className="h-48 rounded-2xl bg-slate-50 flex items-center justify-center p-4 mb-4 group-hover:bg-amber-50/30 transition-colors">
                      <img
                        src={prod.image_url}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {prod.name}
                    </h3>

                    <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                      <span className="font-mono">
                        W {prod.width_cm} × H {prod.height_cm} × D {prod.depth_cm} cm
                      </span>
                      {prod.top_clearance_cm > 0 && (
                        <span className="text-[10px] font-semibold text-amber-600">
                          +{prod.top_clearance_cm}cm vent
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">
                      ${prod.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </ProtonCard>
              );
            })}
          </div>
        )}
      </div>
    </ProtonThemeProvider>
  );
};
export default DiscoveryFragment;
