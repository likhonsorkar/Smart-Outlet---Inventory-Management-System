export const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Noise Cancelling Headphones',
    price: 299,
    oldPrice: 349,
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    discount: 15,
    description: 'Experience pure sound with our flagship noise-cancelling headphones. Features 40 hours of battery life, spatial audio, and premium memory foam cushions.'
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    price: 399,
    rating: 4.9,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    description: 'Track your fitness, health, and connectivity in style. The Series 7 features an always-on Retina display and advanced health sensors.'
  },
  {
    id: 3,
    name: 'Ultra Slim Laptop 14"',
    price: 899,
    oldPrice: 999,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop',
    discount: 10,
    description: 'Power meets portability. Our ultra-slim laptop delivers desktop-class performance in a chassis that weighs less than 3 lbs.'
  },
  {
    id: 4,
    name: 'Professional DSLR Camera',
    price: 1299,
    rating: 4.9,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    description: 'Capture life in stunning detail. Professional-grade sensor, lightning-fast autofocus, and 4K video capabilities.'
  }
];

export const popularProducts = [
  {
    id: 5,
    name: 'Bluetooth Speaker Portable',
    price: 79,
    rating: 4.5,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1608156639585-34052e81c99f?q=80&w=600&auto=format&fit=crop',
    description: 'Big sound in a small package. Waterproof, rugged, and ready for any adventure.'
  },
  {
    id: 6,
    name: 'Gaming Mouse RGB',
    price: 49,
    oldPrice: 59,
    rating: 4.6,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1527698266440-12104e498b76?q=80&w=600&auto=format&fit=crop',
    discount: 20,
    description: 'Precision and speed. Customizable RGB lighting and high-DPI optical sensor for competitive gaming.'
  },
  {
    id: 7,
    name: 'Mechanical Keyboard',
    price: 129,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&auto=format&fit=crop',
    description: 'Satisfying clicks and durable switches. Premium aluminum frame and hot-swappable keycaps.'
  },
  {
    id: 8,
    name: 'Wireless Earbuds',
    price: 159,
    rating: 4.7,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
    description: 'True wireless freedom. Crystal clear calls and deep bass with a compact charging case.'
  },
  {
    id: 9,
    name: 'Smart Home Hub',
    price: 199,
    rating: 4.4,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
    description: 'Control your entire home with your voice. Integrates with thousands of smart devices.'
  },
  {
    id: 10,
    name: 'Electric Toothbrush',
    price: 89,
    rating: 4.9,
    reviews: 540,
    image: 'https://images.unsplash.com/photo-1559613659-7dd23b769df4?q=80&w=600&auto=format&fit=crop',
    description: 'Whiter teeth and healthier gums. Features pressure sensors and multiple cleaning modes.'
  },
  {
    id: 11,
    name: 'Air Purifier',
    price: 249,
    oldPrice: 299,
    rating: 4.7,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop',
    discount: 16,
    description: 'Breathe cleaner air. HEPA filter removes 99.97% of dust, pollen, and smoke.'
  },
  {
    id: 12,
    name: 'Coffee Maker Pro',
    price: 179,
    rating: 4.8,
    reviews: 230,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=600&auto=format&fit=crop',
    description: 'Barista-quality coffee at home. Programmable settings and built-in milk frother.'
  }
];

export const allProducts = [...featuredProducts, ...popularProducts];
