import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Text, 
  RoundedBox, 
  PerspectiveCamera,
  SpotLight,
  useGLTF
} from '@react-three/drei';
import * as THREE from 'three';

function Model({ position, scale, rotation }) {
  const { scene } = useGLTF('/supplement.glb');
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      // Smooth rotation based on mouse position
      const targetRotationY = (state.mouse.x * Math.PI) / 8;
      const targetRotationX = (state.mouse.y * Math.PI) / 8;
      
      modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.05;
      modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      position={position} 
      scale={scale} 
      rotation={rotation}
    />
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#080808']} />
      <fog attach="fog" args={['#080808', 10, 20]} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      
      <ambientLight intensity={0.2} />
      
      {/* Key Light */}
      <SpotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={0.8}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Fill Light */}
      <SpotLight
        position={[-5, 2, 5]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.8}
        color="#a6e1ff"
        castShadow
      />
      
      {/* Rim Light */}
      <SpotLight
        position={[0, -5, -5]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.8}
        color="#f9f1c5"
      />
      
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.4}
      >
        <Model position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} rotation={[0, 0, 0]} />
      </Float>
      
      <OrbitControls 
        enableZoom={true}
        maxZoom={1.5}
        minZoom={0.8}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="studio" />
    </>
  );
}

function Fallback() {
  return (
    <div className="fallback-container">
      <div className="fallback-image">
        <img src="Photos/Category/21.webp" alt="HSF Premium Whey Protein" />
      </div>
    </div>
  );
}

export default function ProductModel3D() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event) => {
      console.error('Error in 3D rendering:', event);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="product-3d-container fallback">
        <Fallback />
        <div className="product-3d-info">
          <h3>HSF Premium Whey Protein</h3>
          <p>25g Protein Per Serving | 5.5g BCAAs | Zero Added Sugar</p>
          <button className="product-3d-button">Shop Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-3d-container">
      <ErrorBoundary fallback={<Fallback />}>
        <Suspense fallback={<div className="loading">Loading 3D Model...</div>}>
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
      <div className="product-3d-info">
        <h3>HSF Premium Whey Protein</h3>
        <p>25g Protein Per Serving | 5.5g BCAAs | Zero Added Sugar</p>
        <button className="product-3d-button">Shop Now</button>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in 3D component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
} 