import React from 'react';
import { ShopCatalog } from '../components/shop/ShopCatalog';
import { ShoeProduct } from '../types/footwear';

interface ShopPageProps {
  onQuickView: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
  initialDept?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onQuickView,
  onSelectProduct,
  initialDept,
}) => {
  return (
    <div id="shop" data-section-color="#F5F5F0" data-section-text="#0A0A0A">
      <ShopCatalog
        onQuickView={onQuickView}
        onSelectProduct={onSelectProduct}
        initialDept={initialDept}
      />
    </div>
  );
};
