import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

interface CheckoutSuccessProps {
  onClear: () => void;
}

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ onClear }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onClear();
  }, [onClear]);

  const handleContinue = () => {
    navigate('/diy-kit', { replace: true });
  };

  return (
    <div className="py-40 px-4 text-center max-w-2xl mx-auto">
      <div className="bg-stone-50 border border-stone-200 p-16 rounded-sm">
        <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-10">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-light mb-4 ink-text">Payment Confirmed</h2>
        <h3 className="chinese-text text-2xl text-stone-600 mb-8">付款已确认</h3>
        <p className="text-stone-500 leading-relaxed mb-8 italic">
          Thank you for your order. Your payment was processed, and the studio has been notified with your details.
        </p>
        <p className="chinese-text text-stone-400 mb-10">我们已收到您的付款，并将为您准备订单。</p>
        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center bg-stone-900 text-white px-10 py-4 rounded-sm tracking-widest uppercase text-sm hover:bg-stone-800 transition-all"
        >
          Continue Browsing / 继续探索
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
