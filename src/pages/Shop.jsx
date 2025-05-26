import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import '../styles/Shop.css';
import Layout from '../components/Layout';

// Import the product data from FeaturedProducts
const products = [
  {
    id: 1,
    name: 'Muscle Blaze Whey Protein',
    price: 2499,
    discountedPrice: 1999,
    rating: 4.8,
    reviews: 245,
    image: '/Photos/Category/21.webp',
    category: 'whey-protein',
    description: '25g Protein Per Serving | 5.5g BCAAs | Zero Added Sugar',
    flavors: ['Chocolate', 'Vanilla', 'Strawberry', 'Cookies & Cream']
  },
  {
    id: 2,
    name: 'GNC Mass Gainer',
    price: 2899,
    discountedPrice: 2399,
    rating: 4.6,
    reviews: 178,
    image: '/Photos/Category/Gainer.webp',
    category: 'gainers',
    description: '1250 Calories Per Serving | 50g Protein | 250g Carbs',
    flavors: ['Chocolate', 'Vanilla', 'Banana']
  },
  {
    id: 3,
    name: 'Wellcore Micronized Creatine',
    price: 1299,
    discountedPrice: 999,
    rating: 4.9,
    reviews: 324,
    image: '/Photos/Category/Creatine.webp',
    category: 'creatine',
    description: '5g Pure Creatine Monohydrate | Unflavored | 60 Servings',
    flavors: ['Unflavored']
  },
  {
    id: 4,
    name: 'ATOM BCAA Energy',
    price: 1499,
    discountedPrice: 1299,
    rating: 4.7,
    reviews: 156,
    image: '/Photos/Category/BCAA.avif',
    category: 'bcaa',
    description: '7g BCAAs | 100mg Caffeine | Electrolytes | 30 Servings',
    flavors: ['Blue Raspberry', 'Watermelon', 'Orange', 'Fruit Punch']
  },
  {
    id: 5,
    name: 'My Fitnes Peanut Butter',
    price: 689,
    discountedPrice: 500,
    rating: 4.4,
    reviews: 100,
    image: '/Photos/Category/Peanut Butter.webp',
    category: 'peanut-butter',
    description: '100g Peanut Butter | 100% Natural | No Added Sugars',
    flavors: ['Crunchy Peanut Butter', 'Chocolate Peanut Butter', 'Smooth Peanut Butter']
  },
  {
    id: 6,
    name: 'Bigflex PreWorkout Nuke 2.0',
    price: 1499,
    discountedPrice: 1199,
    rating: 4.7,
    reviews: 156,
    image: '/Photos/Category/Pre workout.webp',
    category: 'pre-workout',
    description: 'Advanced Formulation - 400gm | 30 Servings | Energy Boost',
    flavors: ['Watermelon', 'Blue Raspberry', 'Orange', 'Fruit Punch']
  },
  // Import the new arrivals products
  {
    id: 7,
    name: 'Muscle Blaze Whey Protein',
    price: 2999,
    discountedPrice: 2499,
    rating: 4.9,
    reviews: 42,
    image: '/Photos/Category/21.webp',
    category: 'whey-protein',
    description: '27g Protein Per Serving | Zero Sugar | Zero Fat',
    isNew: true,
    badge: 'NEW',
    flavors: [ 'Vanilla','Chocolate', 'Strawberry', 'Cookies & Cream']

  },
  {
    id: 8,
    name: 'ATOM BCAA Energy',
    price: 1899,
    discountedPrice: 1499,
    rating: 4.7,
    reviews: 28,
    image: '/Photos/Category/Pre workout.webp',
    category: 'pre-workout',
    description: '200mg Caffeine | Beta-Alanine | Enhanced Focus',
    isNew: true,
    badge: 'NEW',
    flavors: ['Watermelon','Blue Raspberry', 'Orange', 'Fruit Punch']

  },
  {
    id: 9,
    name: 'Essential BCAA 2:1:1',
    price: 1599,
    discountedPrice: 1299,
    rating: 4.6,
    reviews: 37,
    image: '/Photos/Category/BCAA.avif',
    category: 'bcaa',
    description: 'Recovery Formula | Electrolytes | 30 Servings',
    isNew: true,
    badge: 'NEW',
    flavors: ['Watermelon','Blue Raspberry', 'Orange', 'Fruit Punch']

  },
  {
    id: 10,
    name: 'WellCore Micronized Creatine',
    price: 1299,
    discountedPrice: 999,
    rating: 4.8,
    reviews: 19,
    image: '/Photos/Category/Creatine.webp',
    category: 'creatine',
    description: '5g Pure Creatine Monohydrate | 60 Servings',
    isNew: true,
    badge: 'NEW',
    flavors: ['Fruit punch', ' Lemon-lime', 'Chocolate',]
  },
  {
    id: 11,
    name: 'Organic Plant Protein',
    price: 2499,
    discountedPrice: 1999,
    rating: 4.5,
    reviews: 23,
    image: '/Photos/Category/Supplement.webp',
    category: 'supplements',
    description: '24g Plant Protein | Organic Ingredients | No Additives',
    isNew: true,
    badge: 'NEW'
  },
  {
    id: 12,
    name: 'Raw Whey Protein 80%',
    price: 1899,
    discountedPrice: 1599,
    rating: 4.6,
    reviews: 87,
    image: '/Photos/Category/raw whey.webp',
    category: 'raw-whey',
    description: 'Unflavored | 24g Protein Per Serving | 33 Servings',
    flavors: ['Unflavored']
  }
];

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors ? product.flavors[0] : null);
  
  const discount = Math.round(((product.price - product.discountedPrice) / product.price) * 100);
  
  return (
    <div 
      className="shop-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.badge && <div className="product-badge">{product.badge}</div>}
      <div className="product-discount-badge">-{discount}%</div>
      
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {isHovered && (
          <div className="product-actions">
            <Link to={`/product/${product.id}`} className="quick-view-btn">
              Quick View
            </Link>
            <button className="add-cart-btn">Add to Cart</button>
          </div>
        )}
      </div>
      
      <div className="product-details">
        <div className="product-category">{product.category.replace('-', ' ')}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-description">{product.description}</div>
        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span className="reviews-count">({product.reviews})</span>
        </div>
        
        {product.flavors && (
          <div className="product-flavors">
            <label htmlFor={`flavor-${product.id}`}>Flavor:</label>
            <select 
              id={`flavor-${product.id}`}
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
            >
              {product.flavors.map(flavor => (
                <option key={flavor} value={flavor}>{flavor}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="product-price">
          <span className="original-price">₹{product.price}</span>
          <span className="discounted-price">₹{product.discountedPrice}</span>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const { category } = useParams();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  
  // List of available categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'whey-protein', name: 'Whey Protein' },
    { id: 'raw-whey', name: 'Raw Whey' },
    { id: 'gainers', name: 'Mass Gainers' },
    { id: 'creatine', name: 'Creatine' },
    { id: 'bcaa', name: 'BCAA' },
    { id: 'pre-workout', name: 'Pre Workout' },
    { id: 'peanut-butter', name: 'Peanut Butter' },
    { id: 'supplements', name: 'Supplements' }
  ];
  
  useEffect(() => {
    // Check if there's a category from URL params
    if (category) {
      setSelectedCategory(category);
    } else {
      // Check if there's a category in the location state (from navigation)
      const categoryFromState = location.state?.category;
      if (categoryFromState) {
        setSelectedCategory(categoryFromState);
      }
    }
  }, [category, location]);
  
  useEffect(() => {
    // Filter products based on selected category
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = products.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => product.discountedPrice >= priceRange[0] && product.discountedPrice <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => a.isNew ? -1 : b.isNew ? 1 : 0);
        break;
      default:
        // Keep default order
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortOption, priceRange]);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };
  
  return (
    <Layout>
      <div className="shop-page">
        <div className="shop-header">
          <div className="shop-banner">
            <h1>Shop</h1>
            <p>Find the best supplements for your fitness journey</p>
          </div>
        </div>
        
        <div className="shop-container">
          <aside className="shop-sidebar">
            <div className="filter-section">
              <h3>Categories</h3>
              <ul className="category-list">
                {categories.map(cat => (
                  <li 
                    key={cat.id}
                    className={selectedCategory === cat.id ? 'active' : ''}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-inputs">
                <div className="price-input">
                  <label htmlFor="min-price">Min:</label>
                  <input 
                    type="number" 
                    id="min-price" 
                    value={priceRange[0]} 
                    onChange={(e) => handlePriceChange(e, 0)}
                    min="0"
                    max={priceRange[1]}
                  />
                </div>
                <div className="price-input">
                  <label htmlFor="max-price">Max:</label>
                  <input 
                    type="number" 
                    id="max-price" 
                    value={priceRange[1]} 
                    onChange={(e) => handlePriceChange(e, 1)}
                    min={priceRange[0]}
                    max="10000"
                  />
                </div>
              </div>
            </div>
          </aside>
          
          <main className="shop-main">
            <div className="shop-controls">
              <div className="product-count">
                Showing {filteredProducts.length} products
              </div>
              <div className="sort-controls">
                <label htmlFor="sort-select">Sort by:</label>
                <select 
                  id="sort-select" 
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-products">
                  <p>No products found for the selected criteria.</p>
                  <button onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 5000]);
                    setSortOption('default');
                  }}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Shop; 