import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specials from './components/Specials';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import CartDrawer from './components/CartDrawer';
import FloatingCartBar from './components/FloatingCartBar';
import MenuPage from './pages/MenuPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'menu'
  const [cartItems, setCartItems] = useState([]); // Default EMPTY cart for users!

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    // Silent update: FloatingCartBar will automatically pop up!
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-orange-600 selection:text-white">
      {/* Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Page Views */}
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero
              onOpenReservation={() => setIsReservationOpen(true)}
              onNavigateMenu={() => setCurrentPage('menu')}
            />
            <Specials onAddToCart={handleAddToCart} />
            <Story />
            <Testimonials />
            <Footer />
          </>
        ) : (
          <MenuPage
            onAddToCart={handleAddToCart}
            onNavigateHome={() => setCurrentPage('home')}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartCount}
          />
        )}
      </main>

      {/* Floating Bottom View Cart Bar (Pops up when item added) */}
      {!isCartOpen && (
        <FloatingCartBar
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Modals & Drawers */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
