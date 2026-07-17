import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DIYKit from './pages/DIYKit';
import CultureLab from './pages/CultureLab';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';
import About from './pages/About';
import Checkout from './pages/checkout';
import Contact from './pages/Contact';
import CulturalEventCuration from './pages/CulturalEventCuration';
import CuratedEventDetail from './pages/CuratedEventDetail';
import CulturalPopups from './pages/CulturalPopups';
import CurationWeddings from './pages/CurationWeddings';
import CurationSchools from './pages/CurationSchools';
import CurationBrandProduction from './pages/CurationBrandProduction';
import { CartItem, getCartItemKey, Product, ProductVariant } from './types';
import { getSalePrice } from './constants';

const CART_STORAGE_KEY = 'onesiponebrush_cart';

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn('Failed to save cart to localStorage', e);
  }
}

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const handleAddToCart = (product: Product, variant?: ProductVariant) => {
    const variantId = variant?.id;
    const originalPrice = variant?.price ?? product.price;
    const cartItem: CartItem = {
      ...product,
      image: variant?.image ?? product.image,
      price: getSalePrice(originalPrice),
      quantity: 1,
      variantId,
      variantName: variant?.name,
      variantChineseName: variant?.chineseName,
    };
    setCart(prev => {
      const key = getCartItemKey(cartItem);
      const existing = prev.find(item => getCartItemKey(item) === key);
      if (existing) {
        return prev.map(item =>
          getCartItemKey(item) === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, cartItem];
    });
  };

  const handleRemoveFromCart = (key: string) => {
    setCart(prev => prev.filter(item => getCartItemKey(item) !== key));
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
            <Route path="/shop" element={<DIYKit onAddToCart={handleAddToCart} />} />
            <Route path="/cultural-event-curation" element={<CulturalEventCuration />} />
            <Route path="/curated-events/:slug" element={<CuratedEventDetail />} />
            <Route path="/cultural-event-curation/popups" element={<CulturalPopups />} />
            <Route path="/cultural-event-curation/weddings" element={<CurationWeddings />} />
            <Route path="/cultural-event-curation/schools" element={<CurationSchools />} />
            <Route path="/cultural-event-curation/brand-production" element={<CurationBrandProduction />} />
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
