import { Product, BlogPost, CategoryCollection } from '@/types/fashion';

export const LUXURY_PRODUCTS: Product[] = [
  // ==========================================
  // MEN'S WEAR: SHIRTS, T-SHIRTS, PANTS, COATS
  // ==========================================
  {
    id: 'men-linen-overshirt',
    name: 'Italian Raw Linen Overshirt',
    tagline: 'Relaxed tailored overshirt with genuine mother-of-pearl buttons',
    gender: 'Men',
    category: 'Ready-To-Wear',
    subCategory: 'Shirts',
    priceINR: 48000,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Natural', hex: '#EBE0D2' },
      { name: 'Sage Olive', hex: '#A2BBA1' },
      { name: 'Espresso Brown', hex: '#382D28' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    fabric: '100% Normandy Pure Linen (210g/m²)',
    origin: 'Atelier Milan, Italy',
    details: [
      'French seams with 22 stitches per inch',
      'Hand-carved Australian mother-of-pearl buttons',
      'Curved hemline designed to wear tucked or untucked',
      'Garment-washed for buttery soft hand-feel'
    ],
    isNew: true
  },
  {
    id: 'men-giza-poplin-shirt',
    name: 'Egyptian Giza Poplin Dress Shirt',
    tagline: 'Crisp 140/2 double-twist cotton tailored formal shirt in White & Sky',
    gender: 'Men',
    category: 'Ready-To-Wear',
    subCategory: 'Shirts',
    priceINR: 42000,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Soft Sky Blue', hex: '#E0E8F0' },
      { name: 'Blush Pink', hex: '#F6E0E5' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    fabric: '100% Egyptian Giza 45 Extra-Long Staple Cotton',
    origin: 'Albini Mills, Bergamo, Italy',
    details: [
      'Semi-spread collar with removable brass stays',
      'Split back yoke for contoured shoulder movement',
      'Single-needle tailoring throughout',
      'Hand-sewn armhole reinforcement'
    ],
    isNew: true
  },
  {
    id: 'men-pima-tshirt',
    name: 'Heavyweight Pima Cotton Crewneck',
    tagline: 'Architectural boxy-cut luxury t-shirt in 260g combed jersey',
    gender: 'Men',
    category: 'Ready-To-Wear',
    subCategory: 'T-Shirts',
    priceINR: 24000,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Ecru Chalk', hex: '#FAF6F0' },
      { name: 'Sage Green', hex: '#DFE8DA' },
      { name: 'Deep Espresso', hex: '#211916' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '100% Peruvian Long-Staple Pima Cotton (260g/m²)',
    origin: 'Hand-dyed in Lyon, France',
    details: [
      'Double-stitched ribbed collar that never loses shape',
      'Blind-stitched cuffs and hem for clean minimalism',
      'Pre-shrunk organic yarn with silicone wash finish'
    ],
    isNew: true
  },
  {
    id: 'men-cashmere-knit-tee',
    name: 'Cashmere-Silk Knit Luxury Tee',
    tagline: 'Featherlight 18-gauge knit t-shirt with seamless finish',
    gender: 'Men',
    category: 'Ready-To-Wear',
    subCategory: 'T-Shirts',
    priceINR: 38000,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#EBE0D2' },
      { name: 'Muted Forest', hex: '#739373' },
      { name: 'Rich Charcoal', hex: '#211916' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '70% Mongolian Cashmere, 30% Mulberry Silk',
    origin: 'Biella Knitwear Workshop, Italy',
    details: [
      'Ultra-fine 18-gauge fully fashioned knitting',
      'Thermoregulating properties for year-round luxury wear',
      'Ribbed collar and cuffs with micro-elastic recovery'
    ]
  },
  {
    id: 'men-wool-pleated-pants',
    name: 'Double-Pleat Virgin Wool Trousers',
    tagline: 'High-rise relaxed taper pants in fine Venetian wool flannel',
    gender: 'Men',
    category: 'Ready-To-Wear',
    subCategory: 'Trousers',
    priceINR: 68000,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#382D28' },
      { name: 'Cream Sand', hex: '#EBE0D2' },
      { name: 'Olive Taupe', hex: '#739373' }
    ],
    sizes: ['30 (EU 46)', '32 (EU 48)', '34 (EU 50)', '36 (EU 52)', '38 (EU 54)'],
    fabric: '100% Super 130s Virgin Wool (Biella, Italy)',
    origin: 'Sartoria Napoli, Italy',
    details: [
      'Forward double pleats with internal curtain waistband',
      'Side waist adjusters with brushed brass buckles',
      'Unhemmed 36-inch inseam for bespoke tailoring fit',
      'Half-lined in Bemberg cupro to the knee'
    ],
    isNew: true
  },
  {
    id: 'men-tailored-linen-pants',
    name: 'Tailored Drawstring Linen Pants',
    tagline: 'Effortless relaxed trouser with elasticated sartorial waistband',
    gender: 'Men',
    category: 'Ready-To-Wear',
    subCategory: 'Trousers',
    priceINR: 52000,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Warm Ecru', hex: '#FAF6F0' },
      { name: 'Sage Khaki', hex: '#A2BBA1' },
      { name: 'Deep Tobacco', hex: '#382D28' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    fabric: '100% Heavy Belgian Linen (280g/m²)',
    origin: 'Atelier Milan, Italy',
    details: [
      'Concealed drawstring with tailored front fly and zip',
      'Slanted front pockets and buttoned rear welt pockets',
      'Pre-washed for relaxed drape without shrinkage'
    ]
  },
  {
    id: 'men-cashmere-overcoat',
    name: 'Double-Face Cashmere Overcoat',
    tagline: 'Hand-stitched 480g Mongolian Cashmere unlined coat in Espresso & Cream',
    gender: 'Men',
    category: 'Couture',
    subCategory: 'Outerwear',
    priceINR: 285000,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Deep Espresso', hex: '#211916' },
      { name: 'Oatmeal Cream', hex: '#EBE0D2' },
      { name: 'Mink Taupe', hex: '#8C7D70' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    fabric: '100% Mongolian Double-Face Cashmere (480g/m²)',
    origin: 'Atelier Paris, France',
    details: [
      'Split-edge hand pick-stitching requiring 32 hours per coat',
      'Real horn buttons carved in Florence',
      'Raglan shoulder construction for effortless layering over suits'
    ],
    isNew: true
  },
  {
    id: 'men-wool-blazer',
    name: 'Deconstructed Hopsack Wool Blazer',
    tagline: 'Soft-shoulder unlined jacket crafted from breathable four-season wool',
    gender: 'Men',
    category: 'Ready-To-Wear',
    subCategory: 'Outerwear',
    priceINR: 145000,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Warm Charcoal', hex: '#211916' },
      { name: 'Sage Green', hex: '#739373' },
      { name: 'Sand Oatmeal', hex: '#EBE0D2' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    fabric: '100% High-Twist Tropical Wool (Loro Piana Mills)',
    origin: 'Naples Tailoring House, Italy',
    details: [
      'Spalla camicia Neapolitan pleated shoulder',
      'Patch pockets with hand-stitched bar tacks',
      'Double back vents and unpadded chest canvas'
    ]
  },

  // ==========================================
  // WOMEN'S WEAR: DRESSES, SHIRTS, PANTS, BAGS
  // ==========================================
  {
    id: 'women-silk-evening-gown',
    name: 'Mulberry Silk Georgette Evening Gown',
    tagline: 'Bias-cut backless fluid gown in pure 22-momme Como Mulberry silk',
    gender: 'Women',
    category: 'Couture',
    subCategory: 'Dresses',
    priceINR: 195000,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Rose Blush', hex: '#ECC2CB' },
      { name: 'Champagne Silk', hex: '#EBE0D2' },
      { name: 'Sage Olive', hex: '#C8D7C0' }
    ],
    sizes: ['UK 6 (XS)', 'UK 8 (S)', 'UK 10 (M)', 'UK 12 (L)'],
    fabric: '100% Como Mulberry Silk Charmeuse (22 Momme)',
    origin: 'Atelier Paris, France',
    details: [
      'Architectural backless silhouette with delicate cross strap drape',
      'Floor-sweeping puddle hemline with hand French seams',
      'Concealed side zipper with mother-of-pearl hook'
    ],
    isNew: true
  },
  {
    id: 'women-linen-day-dress',
    name: 'Sculptural Linen Wrap Day Dress',
    tagline: 'Pleated A-line silhouette with sash belt in Normandy spun flax',
    gender: 'Women',
    category: 'Ready-To-Wear',
    subCategory: 'Dresses',
    priceINR: 135000,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Ecru Cream', hex: '#FAF6F0' },
      { name: 'Dusty Rose', hex: '#ECC2CB' },
      { name: 'Sage Green', hex: '#A2BBA1' }
    ],
    sizes: ['UK 6 (XS)', 'UK 8 (S)', 'UK 10 (M)', 'UK 12 (L)', 'UK 14 (XL)'],
    fabric: '100% Organic Normandy Flax Linen',
    origin: 'Lyon Atelier, France',
    details: [
      'Deep V-neckline with adjustable internal tie fastening',
      'Concealed deep side pockets',
      'Tiered hem with hand-stitched pick accents'
    ]
  },
  {
    id: 'women-silk-blouse',
    name: 'Silk Charmeuse Draped Blouse',
    tagline: 'Fluid relaxed shirt with extended cuffs and cowl neck collar',
    gender: 'Women',
    category: 'Ready-To-Wear',
    subCategory: 'Shirts',
    priceINR: 58000,
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Pearl Cream', hex: '#FDFAF7' },
      { name: 'Soft Rose', hex: '#F6E0E5' },
      { name: 'Olive Green', hex: '#739373' }
    ],
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    fabric: '100% Silk Crepe de Chine (19 Momme)',
    origin: 'Como Mills, Italy',
    details: [
      'Mother-of-pearl concealed front button placket',
      'Extended 3-button French cuffs',
      'Curved hem for styling tucked or loose'
    ]
  },
  {
    id: 'women-cashmere-rib-tee',
    name: 'Fine Ribbed Cashmere Knit Tee',
    tagline: 'Form-fitting crewneck knit tee crafted from single-ply combed cashmere',
    gender: 'Women',
    category: 'Ready-To-Wear',
    subCategory: 'T-Shirts',
    priceINR: 32000,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Cream Chalk', hex: '#FAF6F0' },
      { name: 'Rose Petal', hex: '#ECC2CB' },
      { name: 'Sage Mint', hex: '#DFE8DA' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: '85% Mongolian Cashmere, 15% Mulberry Silk',
    origin: 'Biella Workshops, Italy',
    details: [
      'Micro-ribbed 2x2 structure with gentle stretch',
      'Seamless tubular knit sides for zero chafing',
      'Hypoallergenic plant-washed yarn'
    ]
  },
  {
    id: 'women-wide-leg-pants',
    name: 'High-Waisted Wide-Leg Silk Pants',
    tagline: 'Architectural fluid trouser with double inverted front pleats',
    gender: 'Women',
    category: 'Ready-To-Wear',
    subCategory: 'Trousers',
    priceINR: 88000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Mink Taupe', hex: '#8C7D70' },
      { name: 'Warm Oatmeal', hex: '#EBE0D2' },
      { name: 'Blush Rose', hex: '#ECC2CB' }
    ],
    sizes: ['UK 6 (XS)', 'UK 8 (S)', 'UK 10 (M)', 'UK 12 (L)'],
    fabric: 'Heavyweight Silk Crepe & Fine Virgin Wool Blend',
    origin: 'Atelier Milan, Italy',
    details: [
      'Ultra high-rise waist with tailored internal hook and eye waistband',
      'Floor-breaking elongated wide leg cut',
      'Deep slanted hip pockets'
    ],
    isNew: true
  },
  {
    id: 'women-hourglass-blazer',
    name: 'Structured Hourglass Bar Blazer',
    tagline: 'Cinched-waist jacket in heavy Italian virgin wool crepe with peaked lapels',
    gender: 'Women',
    category: 'Ready-To-Wear',
    subCategory: 'Outerwear',
    priceINR: 120000,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#FAF6F0' },
      { name: 'Sage Green', hex: '#739373' },
      { name: 'Espresso Noir', hex: '#211916' }
    ],
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    fabric: '100% Virgin Wool Crepe (Biella, Italy)',
    origin: 'Atelier Paris, France',
    details: [
      'Sculpted hourglass waist with padded architectural shoulders',
      'Full silk habotai lining with tonal monogram embroidery',
      'Natural corozo nut buttons'
    ]
  },
  {
    id: 'women-trapeze-bag',
    name: 'The Structured Trapeze Handbag',
    tagline: 'Box calfskin handbag with 24K gold dipped sculptural clasp',
    gender: 'Women',
    category: 'Leather Goods',
    subCategory: 'Bags',
    priceINR: 145000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#8C7D70' },
      { name: 'Ecru Linen', hex: '#FAF6F0' },
      { name: 'Rose Quartz', hex: '#ECC2CB' }
    ],
    sizes: ['Petite (22cm)', 'Medium (28cm)'],
    fabric: 'Full-Grain Box Calfskin with Soft Nappa Lambskin Lining',
    origin: 'Tuscan Leather Guild, Florence',
    details: [
      '24K Gold-plated brass magnetic clasp inspired by 1930s Art Deco',
      'Dual interior compartments with zipped security pocket',
      'Detachable cross-body strap with numbered engraving'
    ]
  },
  {
    id: 'women-woven-mules',
    name: 'Woven Nappa Leather Heeled Mules',
    tagline: 'Hand-braided lambskin mules with fluted sculptural wooden heel',
    gender: 'Women',
    category: 'Footwear',
    subCategory: 'Footwear',
    priceINR: 85000,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Tan', hex: '#EBE0D2' },
      { name: 'Rose Tint', hex: '#F6E0E5' },
      { name: 'Espresso Noir', hex: '#211916' }
    ],
    sizes: ['EU 36 (UK 3)', 'EU 37 (UK 4)', 'EU 38 (UK 5)', 'EU 39 (UK 6)', 'EU 40 (UK 7)'],
    fabric: '100% Woven Nappa Lambskin Leather',
    origin: 'Riviera del Brenta, Italy',
    details: [
      '70mm Sculpted wooden heel with brass reinforcement',
      'Ergonomic cushioned insole with arch support',
      'Hand-burnished leather sole'
    ]
  }
];

export const CATEGORY_COLLECTIONS: CategoryCollection[] = [
  {
    id: 'men-shirts-pants',
    name: "Men's Sartorial Collection",
    gender: 'Men',
    subCategory: 'Shirts',
    count: '08 Handcrafted Styles',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
    description: 'Raw linen overshirts, Egyptian cotton shirts, Pima tees, and double-pleated wool trousers.',
    bgColor: 'bg-sage-100 text-sage-900 border-sage-300'
  },
  {
    id: 'women-gowns-dresses',
    name: "Women's Couture Gowns",
    gender: 'Women',
    subCategory: 'Dresses',
    count: '06 Numbered Styles',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    description: 'Bias-cut Mulberry silk georgette gowns, draped blouses, and wide-leg trousers.',
    bgColor: 'bg-rose-100 text-rose-900 border-rose-300'
  },
  {
    id: 'cashmere-outerwear',
    name: 'Double-Face Cashmere Coats',
    gender: 'All',
    subCategory: 'Outerwear',
    count: '04 Numbered Editions',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    description: '480g Mongolian cashmere unlined overcoats and tailored hourglass blazers.',
    bgColor: 'bg-cream-200 text-espresso-900 border-cream-300'
  },
  {
    id: 'leather-and-shoes',
    name: 'Artisan Leather & Footwear',
    gender: 'Women',
    subCategory: 'Bags',
    count: '04 Bespoke Styles',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    description: 'Tuscan box calfskin trapeze handbags and woven nappa lambskin heeled mules.',
    bgColor: 'bg-rose-50 text-espresso-900 border-rose-200'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'cashmere-guide',
    title: 'The 480g Standard: Why True Cashmere Never Weighs Less',
    excerpt: 'An inside look at our Mongolian nomadic herder partnerships and why double-face weaving creates garments that last generations.',
    category: 'Savoir-Faire',
    date: 'February 24, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop',
    author: 'Elena Vance • Master Weaving Director'
  },
  {
    id: 'quiet-luxury-spring',
    title: 'Quiet Luxury & The Return of Architectural Tailoring',
    excerpt: 'Moving beyond loud logos into the sublime territory of razor-sharp pick-stitching, neutral palettes, and timeless hourglass lines.',
    category: 'Runway Report',
    date: 'February 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    author: 'Julian Thorne • Head of Design'
  },
  {
    id: 'como-silk-mills',
    title: 'From Lake Como to Paris: The Journey of 22-Momme Mulberry Silk',
    excerpt: 'Exploring the century-old water mills in Como where our bias-cut evening gowns receive their fluid liquid drape.',
    category: 'Atelier Stories',
    date: 'February 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    author: 'Marcella Rossi • Textile Archivist'
  }
];
