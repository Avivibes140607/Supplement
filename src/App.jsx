import React, { createContext, useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import NewArrivals from './components/NewArrivals'
import Shop from './pages/Shop'
import Layout from './components/Layout'
import Blog from './components/Blog'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
// import Cart from './components/Cart'
// import SupplementModel from './components/SupplementModel';

// Lazy load the 3D component to improve initial page load performance
const ProductModel3D = lazy(() => import('./components/ProductModel3D'));

// Create Auth Context
export const AuthContext = createContext(null);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Category component with navigation
const CategoryItem = ({ image, name, categoryId }) => {
  const navigate = useNavigate();
  
  const handleCategoryClick = () => {
    navigate(`/shop/${categoryId}`, { state: { category: categoryId } });
  };
  
  return (
    <div className="category-item" onClick={handleCategoryClick}>
      <div className="category-image">
        <img src={image} alt={name} />
      </div>
      <div className="category-name">{name}</div>
    </div>
  );
};

// Fallback component for when 3D fails to load
function Product3DFallback() {
  return (
    <div className="product-3d-container fallback">
      <div className="fallback-container">
        <div className="fallback-image">
          <img src="/Photos/Category/21.webp" alt="HSF Premium Whey Protein" />
        </div>
      </div>
      <div className="product-3d-info">
        <h3>Muscle Blaze Premium Whey Protein</h3>
        <p>25g Protein Per Serving | 5.5g BCAAs | Zero Added Sugar</p>
        <button className="product-3d-button">Shop Now</button>
      </div>
    </div>
  );
}

// Error boundary class component
class ErrorBoundaryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const banners = [
    "/Photos/Banner/Banner 1.webp",
    "/Photos/Banner/Banner 2.webp",
    "/Photos/Banner/Banner 3.webp",
    "/Photos/Banner/Banner 4.webp"
  ];

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [banners.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? banners.length - 1 : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % banners.length);
  };

  // Categories data for the horizontal scrolling section
  const categories = [
    { id: 'whey-protein', name: 'Whey Protein', image: '/Photos/Category/21.webp' },
    { id: 'raw-whey', name: 'Raw Whey', image: '/Photos/Category/raw whey.webp' },
    { id: 'peanut-butter', name: 'Peanut Butter', image: '/Photos/Category/Peanut Butter.webp' },
    { id: 'creatine', name: 'Creatine', image: '/Photos/Category/Creatine.webp' },
    { id: 'bcaa', name: 'BCAA', image: '/Photos/Category/BCAA.avif' },
    { id: 'gainers', name: 'Gainers', image: '/Photos/Category/Gainer.webp' },
    { id: 'supplements', name: 'Supplements', image: '/Photos/Category/Supplement.webp' },
    { id: 'pre-workout', name: 'Pre Workout', image: '/Photos/Category/Pre workout.webp' }
  ];

  return (
    <Layout>
      {/* Product Categories */}
      <div className="product-categories-wrapper">
        <div className="product-categories">
          {categories.map(category => (
            <CategoryItem 
              key={category.id}
              image={category.image}
              name={category.name}
              categoryId={category.id}
            />
          ))}
        </div>
      </div>

      <div className="poster-banner">
        <button className="slide-arrow prev-arrow" onClick={goToPrevSlide}>❮</button>
        <div className="poster-container">
          {banners.map((banner, index) => (
            <img 
              key={index} 
              src={banner} 
              alt={`Banner ${index + 1}`} 
              className={index === currentSlide ? 'active' : ''} 
            />
          ))}
        </div>
        <button className="slide-arrow next-arrow" onClick={goToNextSlide}>❯</button>
        
        <div className="slide-dots">
          {banners.map((_, index) => (
            <span 
              key={index} 
              className={`slide-dot ${index === currentSlide ? 'active' : ''}`} 
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <NewArrivals />

      {/* Brands Section */}
      <div className="brands-section">
        <div className="section-title">
          <h2>Our Partner Brands</h2>
          <p>Shop authentic supplements from top brands</p>
        </div>

        <div className="brands-container">
          <div className="brand-row">
            <div className="brand-item">
              <a href="/brands/muscleblaze">
                <img src="/Photos/brand/MB.png" alt="MuscleBlaze" />
                <span>MUSCLEBLAZE</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/optimum-nutrition">
                <img src="/Photos/brand/ON.jpg" alt="Optimum Nutrition" />
                <span>OPTIMUM NUTRITION</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/gnc">
                <img src="/Photos/brand/GNC.png" alt="GNC" />
                <span>GNC</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/avvatar">
                <img src="/Photos/brand/Avvatar.jpg" alt="Avvatar" />
                <span>AVVATAR</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/bigmuscles">
                <img src="/Photos/brand/Bigmuscles.jpg" alt="BigMuscles Nutrition" />
                <span>BIGMUSCLES NUTRITION</span>
              </a>
            </div>
          </div>

          <div className="brand-row">
            <div className="brand-item">
              <a href="/brands/muscletech">
                <img src="/Photos/brand/MT.jpg" alt="MuscleTech" />
                <span>MUSCLETECH</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/asitis">
                <img src="/Photos/brand/asitis.png" alt="AS-IT-IS Nutrition" />
                <span>ASITIS NUTRITION</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/qnt">
                <img src="/Photos/brand/QNT.png" alt="QNT" />
                <span>QNT</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/healthfarm">
                <img src="/Photos/brand/HF.png" alt="Healthfarm" />
                <span>HEALTHFARM</span>
              </a>
            </div>
            <div className="brand-item">
              <a href="/brands/bigflex">
                <img src="/Photos/brand/BF.png" alt="Bigflex" />
                <span>BIGFLEX</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <FeaturedProducts cartCount={cartCount} setCartCount={setCartCount} />

      {/* 3D Product Showcase */}
      <div className="product-3d-section">
        <div className="product-3d-title">
          <h2>Try our Best Selling Product</h2>
          <p>Get 20% off on best selling products</p>
        </div>
        <ErrorBoundaryWrapper fallback={<Product3DFallback />}>
          <Suspense fallback={<div className="loading">Loading 3D Model...</div>}>
            <ProductModel3D />
          </Suspense>
        </ErrorBoundaryWrapper>
      </div>
    </Layout>
  );
}

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<Shop />} />
            <Route path="blog" element={<Blog />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route 
              path="cart" 
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
