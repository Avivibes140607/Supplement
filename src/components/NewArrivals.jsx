import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/NewArrivals.css';

const newProducts = [
  {
    id: 1,
    name: 'ISOLATE Gold Whey Isolate',
    price: 2999,
    discountedPrice: 2499,
    rating: 4.9,
    reviews: 42,
    image: '/Photos/Category/21.webp',
    category: 'Whey Isolate',
    description: '27g Protein Per Serving | Zero Sugar | Zero Fat',
    isNew: true,
    badge: 'NEW'
  },
  {
    id: 2,
    name: 'Extreme Pre-Workout',
    price: 1899,
    discountedPrice: 1499,
    rating: 4.7,
    reviews: 28,
    image: '/Photos/Category/Pre workout.webp',
    category: 'Pre Workout',
    description: '200mg Caffeine | Beta-Alanine | Enhanced Focus',
    isNew: true,
    badge: 'NEW'
  },
  {
    id: 3,
    name: 'Essential BCAA 2:1:1',
    price: 1599,
    discountedPrice: 1299,
    rating: 4.6,
    reviews: 37,
    image: '/Photos/Category/BCAA.avif',
    category: 'BCAA',
    description: 'Recovery Formula | Electrolytes | 30 Servings',
    isNew: true,
    badge: 'NEW'
  },
  {
    id: 4,
    name: 'HSF Micronized Creatine',
    price: 1299,
    discountedPrice: 999,
    rating: 4.8,
    reviews: 19,
    image: '/Photos/Category/Creatine.webp',
    category: 'Creatine',
    description: '5g Pure Creatine Monohydrate | 60 Servings',
    isNew: true,
    badge: 'NEW'
  },
  {
    id: 5,
    name: 'Organic Plant Protein',
    price: 2499,
    discountedPrice: 1999,
    rating: 4.5,
    reviews: 23,
    image: '/Photos/Category/Supplement.webp',
    category: 'Vegan',
    description: '24g Plant Protein | Organic Ingredients | No Additives',
    isNew: true,
    badge: 'NEW'
  }
];

const NewProduct = ({ product, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const discount = Math.round(((product.price - product.discountedPrice) / product.price) * 100);
  
  return (
    <motion.div 
      className="new-product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 30px rgba(0,0,0,0.12)",
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.badge && <div className="new-badge">{product.badge}</div>}
      <div className="discount-badge">-{discount}%</div>
      
      <div className="new-product-image">
        <img src={product.image} alt={product.name} />
        {isHovered && (
          <motion.div 
            className="new-product-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              className="view-details-btn"
              onClick={() => onViewDetails(product)}
            >
              View Details
            </button>
            <button className="add-to-cart-btn">Add to Cart</button>
          </motion.div>
        )}
      </div>
      
      <div className="new-product-details">
        <div className="new-product-category">{product.category}</div>
        <h3 className="new-product-name">{product.name}</h3>
        <div className="new-product-description">{product.description}</div>
        <div className="new-product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span className="review-count">({product.reviews})</span>
        </div>
        <div className="new-product-price">
          <span className="original-price">₹{product.price}</span>
          <span className="discounted-price">₹{product.discountedPrice}</span>
        </div>
      </div>
    </motion.div>
  );
};

const NewArrivals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    // In a real implementation, you might show a modal or navigate to a product detail page
    console.log("View details for:", product.name);
  };
  
  const handleNextProduct = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === newProducts.length - 3 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevProduct = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? newProducts.length - 3 : prevIndex - 1
    );
  };
  
  // Calculate visible products based on current index
  const visibleProducts = newProducts.slice(currentIndex, currentIndex + 3);
  
  // If we don't have enough products in the slice, add from the beginning
  if (visibleProducts.length < 3) {
    visibleProducts.push(...newProducts.slice(0, 3 - visibleProducts.length));
  }

  return (
    <div className="new-arrivals-section">
      <div className="section-header">
        <h2>New Arrivals</h2>
        <p>Check out our latest supplements and nutrition products</p>
      </div>
      
      <div className="new-products-container">
        <button className="nav-arrow prev-arrow" onClick={handlePrevProduct}>❮</button>
        
        <div className="new-products-display">
          {visibleProducts.map((product) => (
            <NewProduct 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        
        <button className="nav-arrow next-arrow" onClick={handleNextProduct}>❯</button>
      </div>
      
      <div className="view-all-container">
        <button className="view-all-btn">View All New Products</button>
      </div>
    </div>
  );
};

export default NewArrivals; 