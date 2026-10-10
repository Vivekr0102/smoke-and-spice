import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { getDishImage, handleImageError } from '../utils/foodImageProvider';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax;

  const generateWhatsAppURL = () => {
    const itemsListText = cartItems
      .map(
        (item) =>
          `• ${item.name} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(0)}`
      )
      .join('\n');

    const nameStr = customerName.trim() ? customerName.trim() : 'Guest Customer';
    const phoneStr = customerPhone.trim() ? customerPhone.trim() : 'Not specified';
    const addressStr = deliveryAddress.trim() ? deliveryAddress.trim() : 'Dine-in / Pickup at Nerul';

    const message = `🔥 *NEW ORDER - SMOKE & SPICE* 🔥
----------------------------------
👤 *Customer Details:*
• Name: ${nameStr}
• Phone: ${phoneStr}
• Address/Notes: ${addressStr}

🛒 *Order Summary:*
${itemsListText}

----------------------------------
Subtotal: ₹${subtotal.toFixed(0)}
GST (5%): ₹${tax.toFixed(0)}
💰 *Grand Total: ₹${total.toFixed(0)}*
----------------------------------
📍 *Smoke & Spice, Sector 20, Nerul, Navi Mumbai*`;

    return `https://wa.me/917021248122?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    const url = generateWhatsAppURL();
    window.open(url, '_blank');
    setOrderPlaced(true);
  };

  const handleClose = () => {
    if (orderPlaced) {
      onClearCart();
      setOrderPlaced(false);
      setCustomerName('');
      setCustomerPhone('');
      setDeliveryAddress('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h3 className="font-heading text-2xl text-white uppercase tracking-wide">
                Your Food Order
              </h3>
              <span className="text-xs bg-stone-800 text-stone-300 font-semibold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderPlaced ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading text-3xl text-white uppercase">Order Sent to WhatsApp!</h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Your formatted order details have been opened in WhatsApp to send directly to <strong className="text-green-400">+91 7021248122</strong>.
                </p>
                <p className="text-stone-400 text-xs">
                  The Smoke &amp; Spice team in Nerul will confirm your order shortly.
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-stone-600" />
                <p className="text-base font-medium">Your order tray is empty.</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Add some Butter Chicken, Chicken Triple Schezwan Rice, Tandoori Kababs, or Biryani from the menu!
                </p>
              </div>
            ) : (
              <>
                {/* Customer Details Form inside Cart */}
                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                    Contact &amp; Delivery Info
                  </span>

                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile Number (e.g. 7021248122) *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <textarea
                      rows="2"
                      placeholder="Delivery Address / Table Notes (Optional)"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-orange-500"
                    ></textarea>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Selected Items ({cartItems.length})
                  </span>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800 flex items-center justify-between gap-3"
                    >
                      <img
                        src={getDishImage(item)}
                        alt={item.name}
                        onError={(e) => handleImageError(e)}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-stone-100 truncate">{item.name}</h5>
                        <span className="text-xs font-heading text-orange-500 block mt-0.5">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-stone-200 px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-stone-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & WhatsApp Checkout */}
          {!orderPlaced && cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-semibold">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="text-stone-200 font-semibold">₹{tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-800 text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="font-heading text-2xl text-orange-500">₹{total.toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-stone-950 font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-98 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950" />
                <span>Order via WhatsApp</span>
                <Send className="w-4 h-4 ml-1 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
