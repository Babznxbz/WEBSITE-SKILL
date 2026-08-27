import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types/footwear';
import { formatINR } from '../../lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
  onUpdateQty: (index: number, delta: number) => void;
  subtotal: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQty,
  subtotal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex justify-between items-center bg-[#F5F5F0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF4D00]" />
              <h2 className="font-display font-extrabold text-xl text-[#0A0A0A]">
                Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#666666]/40 mx-auto" />
                <p className="font-display font-bold text-lg text-[#0A0A0A]">Your bag is currently empty</p>
                <p className="text-xs text-[#666666]">Explore our haute drops and add footwear to your collection.</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={idx} className="flex gap-4 pb-6 border-b border-black/5 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[#F5F5F0]"
                  />
                  <div className="flex-1 space-y-1 text-left">
                    <h4 className="font-display font-bold text-sm text-[#0A0A0A] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#666666]">
                      Color: {item.selectedColor} | Size: UK {item.selectedSize}
                    </p>
                    <p className="font-display font-bold text-sm text-[#0A0A0A] tabular-price">
                      {formatINR(item.product.price)}
                    </p>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border border-black/10 rounded">
                        <button
                          onClick={() => onUpdateQty(idx, -1)}
                          className="p-1 hover:bg-black/5 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(idx, 1)}
                          className="p-1 hover:bg-black/5 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(idx)}
                        className="text-xs text-red-600 hover:text-red-800 p-1"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal */}
          {items.length > 0 && (
            <div className="p-6 bg-[#F5F5F0] border-t border-black/10 space-y-4 text-left">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#666666]">Subtotal</span>
                <span className="font-display font-extrabold text-xl text-[#0A0A0A] tabular-price">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#666666]">
                Complimentary Express Shipping & Duties Included across India.
              </p>

              <button
                onClick={() => alert(`Redirecting to Secure Razorpay/Stripe Checkout for ${formatINR(subtotal)}`)}
                className="w-full py-4 bg-[#FF4D00] text-white font-bold text-sm tracking-wider uppercase rounded-md hover:bg-[#E04400] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
