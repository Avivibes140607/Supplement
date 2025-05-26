import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/FeaturedProducts.css';

const products = [
  {
    id: 1,
    name: 'Muscle Blaze Whey Protein',
    price: 2499,
    discountedPrice: 1999,
    rating: 4.8,
    reviews: 245,
    image: '/Photos/Category/21.webp',
    category: 'Whey Protein',
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
    category: 'Gainers',
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
    category: 'Creatine',
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
    category: 'BCAA',
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
    category: 'Peanut Butter',
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
    category: 'Pre Workout',
    description: 'Advanced Formulation - 400gm | 30 Servings ',
    flavors: ['Watermelon', 'Blue Raspberry', 'Orange', 'Fruit Punch']
  }
];

const ProductCard = ({ product, addToCart }) => {
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const [isHovered, setIsHovered] = useState(false);
  
  const discount = Math.round(((product.price - product.discountedPrice) / product.price) * 100);
  
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="discount-badge">-{discount}%</div>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {isHovered && (
          <motion.div 
            className="quick-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button className="quick-view">Quick View</button>
            <button 
              className="add-to-cart"
              onClick={() => addToCart(product, selectedFlavor)}
            >
              Add to Cart
            </button>
          </motion.div>
        )}
      </div>
      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-description">{product.description}</div>
        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span className="review-count">({product.reviews})</span>
        </div>
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
        <div className="product-price">
          <span className="original-price">₹{product.price}</span>
          <span className="discounted-price">₹{product.discountedPrice}</span>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = ({ cartCount, setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, flavor) => {
    const newItem = {
      ...product,
      selectedFlavor: flavor,
      quantity: 1
    };
    
    setCartItems(prevItems => {
      // Check if the product with the same flavor already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedFlavor === flavor
      );
      
      if (existingItemIndex >= 0) {
        // Increase quantity if it exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, newItem];
      }
    });
    
    setCartCount(prevCount => prevCount + 1);
    
    // Open the cart when an item is added
    setCartOpen(true);
    
    // Show a notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${product.name} (${flavor}) added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }, 100);
  };

  return (
    <div className="featured-products-section">
      <div className="section-title">
        <h2>Featured Products</h2>
        <p>Top supplements chosen by fitness enthusiasts</p>
      </div>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
      
      {cartOpen && (
        <motion.div 
          className="mini-cart"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
        >
          <div className="mini-cart-header">
            <h3>Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</h3>
            <button 
              className="close-cart"
              onClick={() => setCartOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="mini-cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">Your cart is empty</div>
            ) : (
              cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedFlavor}`} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Flavor: {item.selectedFlavor}</p>
                    <div className="cart-item-price">
                      <span>₹{item.discountedPrice}</span>
                      <div className="quantity-controls">
                        <button onClick={() => {
                          if (item.quantity > 1) {
                            const updatedItems = [...cartItems];
                            updatedItems[index].quantity -= 1;
                            setCartItems(updatedItems);
                            setCartCount(prevCount => prevCount - 1);
                          }
                        }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => {
                          const updatedItems = [...cartItems];
                          updatedItems[index].quantity += 1;
                          setCartItems(updatedItems);
                          setCartCount(prevCount => prevCount + 1);
                        }}>+</button>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => {
                      setCartItems(cartItems.filter((_, i) => i !== index));
                      setCartCount(prevCount => prevCount - item.quantity);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="mini-cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>₹{cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0)}</span>
              </div>
              <div className="cart-actions">
                <button className="view-cart">View Cart</button>
                <button className="checkout">Checkout</button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FeaturedProducts; 