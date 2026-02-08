
import React, { useMemo, useState } from 'react';
import { CartItem, OrderInfo } from '../types';
import { Trash2, Send, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
interface CartProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove }) => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
 const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const location = useLocation();
  const canceledCheckout = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('canceled') === 'true';
  }, [location.search]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            chineseName: item.chineseName,
            price: item.price,
            quantity: item.quantity
          })),
          customer: orderInfo,
          origin: window.location.origin
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.message || 'Unable to start checkout.');
      }

      const data = await response.json();
      if (!data?.url) {
        throw new Error('Checkout session was not created. Please try again.');
      }

      window.location.href = data.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (cart.length === 0) {
    return (
      <div className="py-56 px-4 text-center">
        <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-stone-100">
          <ShoppingBag className="w-10 h-10 text-stone-300" />
        </div>
        <h2 className="text-3xl text-stone-600 font-light mb-2 uppercase tracking-widest">Your collection is empty</h2>
        <h3 className="chinese-text text-xl text-stone-400 mb-10">您的购物车是空的</h3>
        <Link to="/diy-kit" className="inline-flex items-center bg-stone-900 text-white px-10 py-4 rounded-sm tracking-widest uppercase text-sm hover:bg-stone-800 transition-all">
          <ArrowLeft className="w-4 h-4 mr-3" /> Start Exploring / 开始探索
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="text-center mb-20">
        <h1 className="text-5xl font-light ink-text mb-4 tracking-[0.2em] uppercase">My Selection</h1>
        <h2 className="chinese-text text-2xl text-stone-500 tracking-[0.4em]">我的选购</h2>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* List */}
        <div className="space-y-10">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-8 border-b border-stone-100 pb-10 group">
              <div className="w-32 h-32 bg-stone-50 overflow-hidden rounded-sm flex-shrink-0 border border-stone-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-stone-900">{item.name}</h3>
                    <p className="chinese-text text-base text-stone-500">{item.chineseName}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-stone-300 hover:text-red-900 transition-colors p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-6 flex justify-between items-end">
                  <span className="text-xs uppercase tracking-widest text-stone-400">Qty: {item.quantity}</span>
                  <div className="text-2xl font-light text-stone-900">${item.price * item.quantity}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-10 flex justify-between items-baseline border-t-2 border-stone-900">
            <div>
              <span className="text-sm uppercase tracking-widest text-stone-500 block">Total Selection</span>
              <span className="chinese-text text-stone-400">总计金额</span>
            </div>
            <span className="text-5xl font-light ink-text">${total}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-stone-50 p-10 md:p-14 border border-stone-200 h-fit rounded-sm shadow-sm">
          <h2 className="text-3xl font-light mb-4 ink-text uppercase tracking-widest">Secure Checkout</h2>
          <h3 className="chinese-text text-xl text-stone-500 mb-6">安全结账</h3>
          <p className="text-sm text-stone-500 mb-8 leading-relaxed">
            We’ll send your order details to the studio after payment. You will be redirected to Stripe to complete the purchase.
          </p>
          {canceledCheckout && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-sm text-sm mb-6">
              Your checkout was canceled. You can try again whenever you’re ready.
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm mb-6">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <input
                required
                type="text"
                name="name"
                value={orderInfo.name}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 outline-none py-3 text-lg transition-all"
                placeholder="Full Name / 姓名"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input
                  required
                  type="email"
                  name="email"
                  value={orderInfo.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 outline-none py-3 transition-all"
                  placeholder="Email / 邮箱"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  value={orderInfo.phone}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 outline-none py-3 transition-all"
                  placeholder="Phone / 电话"
                />
              </div>
              <textarea
                name="notes"
                value={orderInfo.notes}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 outline-none py-3 min-h-[120px] resize-none transition-all"
                placeholder="Special Requests or Shipping Address / 特殊要求或收货地址"
              />
            </div>
            <button
              type="submit"
               disabled={isSubmitting}
              className="w-full bg-stone-900 text-white py-6 rounded-sm text-sm font-bold tracking-[0.3em] hover:bg-stone-800 transition-all flex items-center justify-center space-x-3 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
             <span>{isSubmitting ? 'REDIRECTING...' : 'PAY WITH STRIPE / 安全支付'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
