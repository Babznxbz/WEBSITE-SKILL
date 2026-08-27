import React from 'react';
import { HeroSlider } from '../components/sections/HeroSlider';
import { MarqueeBanner } from '../components/sections/MarqueeBanner';
import { CategoryGrid } from '../components/sections/CategoryGrid';
import { NewArrivals } from '../components/sections/NewArrivals';
import { PinnedPromo } from '../components/sections/PinnedPromo';
import { Bestsellers } from '../components/sections/Bestsellers';
import { CraftStory } from '../components/sections/CraftStory';
import { JournalSection } from '../components/sections/JournalSection';
import { Newsletter } from '../components/sections/Newsletter';
import { ShoeProduct } from '../types/footwear';

interface HomePageProps {
  onSelectProduct: (product: ShoeProduct) => void;
  onQuickView: (product: ShoeProduct) => void;
  onNavigateShop: (dept?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onQuickView,
  onNavigateShop,
}) => {
  return (
    <div id="home">
      <HeroSlider
        onSelectProduct={onSelectProduct}
        onNavigateShop={() => onNavigateShop('All')}
      />
      <MarqueeBanner />
      <CategoryGrid onSelectDepartment={(dept) => onNavigateShop(dept)} />
      <NewArrivals
        onQuickView={onQuickView}
        onSelectProduct={onSelectProduct}
        onNavigateShop={() => onNavigateShop('All')}
      />
      <PinnedPromo onNavigateShop={() => onNavigateShop('All')} />
      <Bestsellers onQuickView={onQuickView} onSelectProduct={onSelectProduct} />
      <CraftStory />
      <JournalSection />
      <Newsletter />
    </div>
  );
};
