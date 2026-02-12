
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DIYKit from './pages/DIYKit';
import CultureLab from './pages/CultureLab';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-stone-200 selection:text-stone-900">
        <Navbar cartCount={cartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/diy-kit" element={<DIYKit onAddToCart={handleAddToCart} />} />
            <Route path="/culture-lab" element={<CultureLab />} />
            <Route path="/contact" element={<Contact />} />
           <Route path="/cart" element={<Cart cart={cart} onRemove={handleRemoveFromCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/checkout-success" element={<CheckoutSuccess onClear={handleClearCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
