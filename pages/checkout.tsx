import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
}

type EmbeddedCheckoutInstance = {
  mount: (element: string | HTMLElement) => void;
  destroy: () => void;
};

type StripeClient = {
  initEmbeddedCheckout: (options: { fetchClientSecret: () => Promise<string> }) => Promise<EmbeddedCheckoutInstance>;
};

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => StripeClient;
  }
}

const checkoutApiBaseUrl = (import.meta.env.VITE_CHECKOUT_API_URL || '').trim();
const createCheckoutSessionUrl = checkoutApiBaseUrl
  ? `${checkoutApiBaseUrl}/api/create-checkout-session`
  : '/api/create-checkout-session';
const checkoutConfigUrl = checkoutApiBaseUrl ? `${checkoutApiBaseUrl}/api/config` : '/api/config';

const getPublishableKey = async (): Promise<string> => {
  const envKey = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '').trim();
  if (envKey) {
    return envKey;
  }

  const response = await fetch(checkoutConfigUrl);
  const data = await response.json();

  if (!response.ok || !data?.publishableKey) {
    throw new Error('Missing Stripe publishable key. Set VITE_STRIPE_PUBLISHABLE_KEY or STRIPE_PUBLISHABLE_KEY.');
  }

  return String(data.publishableKey).trim();
};
const loadStripeScript = async (): Promise<void> => {
  if (window.Stripe) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Stripe.js.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Stripe.js.'));
    document.body.appendChild(script);
  });
};

const Checkout: React.FC<CheckoutProps> = ({ cart }) => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const checkoutRef = React.useRef<HTMLDivElement | null>(null);
  const embeddedCheckoutRef = React.useRef<EmbeddedCheckoutInstance | null>(null);
  const isMountingRef = React.useRef(false);

  React.useEffect(() => {
    let isMounted = true;

    const mountEmbeddedCheckout = async () => {
      // Prevent multiple simultaneous mounts
      if (isMountingRef.current) {
        return;
      }

      isMountingRef.current = true;
  
      if (!checkoutRef.current) {
        isMountingRef.current = false;
        return;
      }

      try {
        // Destroy any existing instance first
        if (embeddedCheckoutRef.current) {
          try {
            embeddedCheckoutRef.current.destroy();
            embeddedCheckoutRef.current = null;
          } catch (e) {
            console.warn('Error destroying previous checkout:', e);
          }
        }

        // Clear the container
        if (checkoutRef.current) {
          checkoutRef.current.innerHTML = '';
        }

        await loadStripeScript();
        if (!window.Stripe) {
          throw new Error('Unable to initialize Stripe.js.');
        }

        if (!isMounted) return;

        const publishableKey = await getPublishableKey();
        if (!publishableKey) {
          throw new Error('Stripe publishable key is empty.');
        }

        const stripe = window.Stripe(publishableKey);

        const checkout = await stripe.initEmbeddedCheckout({
          fetchClientSecret: async () => {
            const response = await fetch(createCheckoutSessionUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: cart, origin: window.location.origin, embedded: true })
            });

            const data = await response.json();
            if (!response.ok || !data?.clientSecret) {
              throw new Error(data?.message || 'Unable to initialize checkout.');
            }

            return data.clientSecret;
          }
        });

        if (!isMounted) {
          checkout.destroy();
          return;
        }

        embeddedCheckoutRef.current = checkout;

        if (checkoutRef.current && embeddedCheckoutRef.current) {
          embeddedCheckoutRef.current.mount(checkoutRef.current);
          setLoading(false);
        }
      } catch (mountError) {
        if (isMounted) {
          const message = mountError instanceof Error ? mountError.message : 'Unable to initialize embedded checkout.';
          setError(message);
          setLoading(false);
        }
      } finally {
        isMountingRef.current = false;
      }
    };

    mountEmbeddedCheckout();

    return () => {
      isMounted = false;
      if (embeddedCheckoutRef.current) {
        try {
          embeddedCheckoutRef.current.destroy();
          embeddedCheckoutRef.current = null;
        } catch (e) {
          console.warn('Error during cleanup:', e);
        }
      }
      isMountingRef.current = false;
    };
  }, []);

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light ink-text mb-4 tracking-[0.2em] uppercase">Checkout</h1>
        <h2 className="chinese-text text-2xl text-stone-500 tracking-[0.3em]">Stripe 安全结账</h2>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm mb-6">
          {error}
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-sm p-4 md:p-8 shadow-sm min-h-[500px]">
        {loading && !error && (
          <div className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mb-4"></div>
              <p className="text-stone-600 text-sm uppercase tracking-widest">Loading Secure Checkout...</p>
            </div>
          </div>
        )}
        <div ref={checkoutRef} id="stripe-embedded-checkout" />
      </div>

      <div className="mt-8">
        <Link to="/cart" className="text-sm text-stone-500 hover:text-stone-900 uppercase tracking-widest">
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
