import React from 'react';
import Layout from './Layout';

const Cart = () => {
  return (
    <Layout>
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        {/* Cart items will go here */}
        <p>Your cart is currently empty.</p>
      </div>
    </Layout>
  );
};

export default Cart; 