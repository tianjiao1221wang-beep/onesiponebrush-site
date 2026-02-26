import React from 'react';
import { CartItem } from '../types';
import { getCartItemKey } from '../types';
import { Trash2, Send, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  onRemove: (cartItemKey: string) => void;
}

const stripePaymentLinkUrl = (import.meta.env.VITE_STRIPE_PAYMENT_LINK_URL || '').trim();
const envApiUrl = (import.meta.env.VITE_CHECKOUT_API_URL || '').trim().replace(/\/+$/, '');
const checkoutApiBaseUrl = envApiUrl || (import.meta.env.DEV ? 'http://localhost:4242' : '');
const createCheckoutSessionUrl = checkoutApiBaseUrl
  ? `${checkoutApiBaseUrl}/api/create-checkout-session`
  : '/api/create-checkout-session';

// Shipping: standard $5.99 (7 days ETM), free over threshold; upgrade +$7 (3 days ETM)
const SHIPPING_STANDARD = Number(import.meta.env.VITE_SHIPPING_STANDARD) || 5.99;
const FREE_SHIPPING_THRESHOLD = Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 79;
const SHIPPING_UPGRADE_ADD = Number(import.meta.env.VITE_SHIPPING_UPGRADE_ADD) || 7;

export type ShippingMethod = 'standard' | 'upgrade';

const Cart: React.FC<CartProps> = ({ cart, onRemove }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [shippingMethod, setShippingMethod] = React.useState<ShippingMethod>('standard');
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const standardFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_STANDARD;
  const shippingFee = shippingMethod === 'standard'
    ? standardFee
    : standardFee + SHIPPING_UPGRADE_ADD;
  const moreForFreeShipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD
    ? (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)
    : null;
  const total = subtotal + shippingFee;

  const handleStripeCheckout = async () => {
    setError('');
    if (stripePaymentLinkUrl) {
      setLoading(true);
      window.location.assign(stripePaymentLinkUrl);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(createCheckoutSessionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          origin: window.location.origin,
          embedded: false,
          shippingMethod
        })
      });
      const contentType = response.headers.get('content-type');
      let data: { url?: string; message?: string } = {};
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (text.startsWith('<')) {
          throw new Error(
            checkoutApiBaseUrl
              ? '支付服务器返回了错误页面，请检查 Railway 部署状态。'
              : '请求地址有误（收到 HTML 而非 JSON）。请在 Netlify 环境变量中设置 VITE_CHECKOUT_API_URL 并重新部署。'
          );
        }
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(text || '支付服务器响应异常');
        }
      }
      if (!response.ok) {
        throw new Error(data?.message || '无法创建结账会话');
      }
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      throw new Error('未返回支付链接');
    } catch (e) {
      let msg = e instanceof Error ? e.message : '无法连接支付服务器';
      if (!checkoutApiBaseUrl && !import.meta.env.DEV) {
        msg = '支付服务未配置。请在 Netlify 环境变量中设置 VITE_CHECKOUT_API_URL 为 Railway 后端地址，并重新部署。';
      } else if (!checkoutApiBaseUrl) {
        msg = '请确认后端已启动 (npm run dev:server，端口 4242)。';
      }
      setError(msg);
    } finally {
      setLoading(false);
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
        <div className="space-y-10">
          {cart.map((item) => (
            <div key={getCartItemKey(item)} className="flex gap-8 border-b border-stone-100 pb-10 group">
              <div className="w-32 h-32 overflow-hidden flex-shrink-0 flex items-center justify-center bg-stone-50">
                <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-stone-900">{item.name}</h3>
                    <p className="chinese-text text-base text-stone-500">
                      {item.chineseName}
                      {item.variantName && (
                        <span className="text-stone-400"> · {item.variantChineseName || item.variantName}</span>
                      )}
                    </p>
                  </div>
                  <button onClick={() => onRemove(getCartItemKey(item))} className="text-stone-300 hover:text-red-900 transition-colors p-2">
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
          <div className="pt-10 space-y-4 border-t border-stone-200">
            <div className="flex justify-between text-stone-600">
              <span className="text-sm uppercase tracking-widest">Subtotal / 小计</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="space-y-3">
              <span className="text-sm uppercase tracking-widest text-stone-600 block">Shipping / 配送方式</span>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  className="mt-1 accent-stone-900"
                />
                <div>
                  <span className="font-medium text-stone-800">Standard Shipping / 标准配送</span>
                  <span className="block text-xs text-stone-500 chinese-text">ETM 7 days · 预计 7 个工作日</span>
                  <span className="block text-sm text-stone-600">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? 'Free / 免运费' : `$${SHIPPING_STANDARD.toFixed(2)}`}
                  </span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'upgrade'}
                  onChange={() => setShippingMethod('upgrade')}
                  className="mt-1 accent-stone-900"
                />
                <div>
                  <span className="font-medium text-stone-800">Express Shipping / 加急配送</span>
                  <span className="block text-xs text-stone-500 chinese-text">ETM 3 days · 预计 3 个工作日</span>
                  <span className="block text-sm text-stone-600">
                    +${SHIPPING_UPGRADE_ADD.toFixed(2)} {subtotal >= FREE_SHIPPING_THRESHOLD ? '(free standard) / （标准免运费基础上）' : 'extra / 额外'}
                  </span>
                </div>
              </label>
            </div>
            <div className="flex justify-between text-stone-600 pt-2">
              <span className="text-sm uppercase tracking-widest">Shipping Fee / 运费</span>
              <span>{shippingFee === 0 ? 'Free / 免运费' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            {moreForFreeShipping && (
              <p className="text-sm text-stone-600 chinese-text font-medium">
                Add ${moreForFreeShipping} more for free standard shipping / 再购 $${moreForFreeShipping} 即免标准运费
              </p>
            )}
            <p className="text-xs text-stone-500 chinese-text border-t border-stone-100 pt-4 mt-2">
              Item availability varies. <Link to="/contact" className="underline hover:text-stone-700">Email us for inquiry</Link>. / 商品库存以实际为准。如有疑问请<Link to="/contact" className="underline hover:text-stone-700">联系我们</Link>。
            </p>
          </div>
          <div className="flex justify-between items-baseline border-t-2 border-stone-900 pt-6">
            <div>
              <span className="text-sm uppercase tracking-widest text-stone-500 block">Total</span>
              <span className="chinese-text text-stone-400">总计</span>
            </div>
            <span className="text-5xl font-light ink-text">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-stone-50 p-10 md:p-14 border border-stone-200 h-fit rounded-sm shadow-sm">
          <h2 className="text-3xl font-light mb-4 ink-text uppercase tracking-widest">Stripe Checkout</h2>
          <h3 className="chinese-text text-xl text-stone-500 mb-6">Stripe 安全结账</h3>
          <p className="text-sm text-stone-500 mb-4 leading-relaxed">
            {stripePaymentLinkUrl
              ? 'You will be redirected to Stripe secure payment. / 点击后将跳转到 Stripe 安全支付页面完成付款。'
              : 'Your cart items and total will be sent to Stripe. / 结账时将把当前购物车商品与金额一并传至 Stripe 支付页。'}
          </p>
          <p className="text-xs text-stone-500 chinese-text mb-4">
            Item availability varies. <Link to="/contact" className="underline hover:text-stone-700">Email us for inquiry</Link>. / 商品库存以实际为准。<Link to="/contact" className="underline hover:text-stone-700">联系我们</Link>咨询。
          </p>
          {moreForFreeShipping && (
            <p className="text-sm text-stone-600 chinese-text font-medium mb-6 p-3 bg-stone-100 rounded-sm">
              Add ${moreForFreeShipping} more for free shipping / 再购 $${moreForFreeShipping} 即免运费
            </p>
          )}
          {error && (
            <div className="mb-6 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="button"
            onClick={handleStripeCheckout}
            disabled={loading}
            className="w-full bg-stone-900 text-white py-6 rounded-sm text-sm font-bold tracking-[0.3em] hover:bg-stone-800 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>正在跳转支付...</span>
              </>
            ) : (
              <>
                <span className="flex flex-col items-center leading-tight">
                  <span>GO TO CHECKOUT</span>
                  <span className="chinese-text font-normal tracking-wide">安全支付</span>
                </span>
                <Send className="w-4 h-4 flex-shrink-0" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
