import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '@/types/fashion';
import { Button } from '@/components/ui/button';
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [giftWrap, setGiftWrap] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VIP10' || promoCode.trim().toUpperCase() === 'INDIA') {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white border-l border-cream-300 text-espresso-950 flex flex-col shadow-2xl"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-cream-200 flex items-center justify-between bg-cream-50">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 text-espresso-600 hover:text-espresso-950 bg-white rounded-full shadow-xs transition-colors cursor-pointer"
                  title="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {orderComplete ? (
                  <div className="py-16 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-400 flex items-center justify-center mb-6 text-[#E11D48]">
                      <Sparkles className="w-8 h-8 text-[#E11D48]" />
                    </div>
                    <h4 className="font-serif text-2xl uppercase mb-2 text-espresso-950 font-bold">Order Confirmed</h4>
                    <p className="text-xs text-espresso-700 max-w-xs mb-6 leading-relaxed">
                      Thank you for choosing Maison Écru. Our concierge in India has received your order and will contact you for delivery.
                    </p>
                    <Button variant="pink" onClick={() => { setOrderComplete(false); onClose(); }}>
                      Return to Boutique
                    </Button>
                  </div>
                ) : items.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center">
                    <ShoppingBag className="w-12 h-12 text-cream-400 mb-4" />
                    <p className="font-serif text-lg text-espresso-950 font-bold mb-1">Your bag is empty</p>
                    <p className="text-xs text-espresso-600 max-w-xs mb-6">
                      Explore our handcrafted Spring/Summer 2026 collection and add items to your bag.
                    </p>
                    <Button variant="pink" onClick={onClose}>
                      Explore Catalog
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="flex gap-4 pb-6 border-b border-cream-200"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-28 object-cover rounded-sm border border-cream-300 shrink-0"
                      />

                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-base text-espresso-950 font-bold leading-tight">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-espresso-400 hover:text-red-600 transition-colors ml-2 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="font-mono text-xs text-[#E11D48] font-bold mt-1">
                            {item.selectedColor} • {item.selectedSize}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-cream-300 rounded-sm bg-cream-50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2.5 py-0.5 text-xs text-espresso-600 hover:text-espresso-950 font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs px-2 text-espresso-950 font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="px-2.5 py-0.5 text-xs text-espresso-600 hover:text-espresso-950 font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="font-mono text-sm font-bold text-espresso-950">
                            ₹{(item.product.priceINR * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Calculations & Checkout */}
              {items.length > 0 && !orderComplete && (
                <div className="p-6 border-t border-cream-200 bg-cream-50 space-y-4">
                  
                  {/* Complimentary Luxury Gift Box */}
                  <label className="flex items-center gap-3 text-xs text-espresso-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="accent-[#E11D48] rounded"
                    />
                    <Gift className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Complimentary Signature Silk Gift Packaging</span>
                  </label>

                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. INDIA)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-white border border-cream-300 px-3 py-2 text-xs font-mono uppercase text-espresso-950 w-full rounded-sm outline-none focus:border-[#E11D48]"
                    />
                    <Button type="submit" variant="outline" size="sm">
                      Apply
                    </Button>
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 pt-2 font-mono text-xs text-espresso-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-espresso-950 font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-[#E11D48] font-bold">
                        <span>VIP Patron Privilege (10%)</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>All-India Insured Express Delivery</span>
                      <span className="text-emerald-700 uppercase font-bold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-sm text-espresso-950 font-bold pt-2 border-t border-cream-200">
                      <span>Total Amount</span>
                      <span className="text-espresso-950 font-mono text-base font-bold">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    variant="pink"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full gap-2 tracking-[0.2em] py-4 text-xs font-bold"
                  >
                    {isCheckingOut ? (
                      <span>Securing Atelier Reservation...</span>
                    ) : (
                      <>
                        <span>Proceed to Secure Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-espresso-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit Encrypted Secure Checkout (India)</span>
                  </div>

                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
};
