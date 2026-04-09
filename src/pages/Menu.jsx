import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Phone, Star, Flame, Pizza as PizzaIcon, Beer } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Utility for cleaner tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// SaaS Ready Data Configuration
const MENU_DATA = {
  restaurant: {
    name: "Pizzaria Forno de Ouro",
    whatsapp: "5511999999999",
    colors: {
      primary: "orange",
      secondary: "yellow",
      background: "#1a0f0a"
    }
  },
  categories: [
    { id: 'tradicionais', label: 'Tradicionais', icon: <PizzaIcon size={18} /> },
    { id: 'doces', label: 'Doces', icon: <Flame size={18} /> },
    { id: 'bebidas', label: 'Bebidas', icon: <Beer size={18} /> },
  ],
  products: [
    {
      id: 1,
      name: 'Calabresa Especial',
      description: 'Molho de tomate artesanal, mussarela, calabresa fatiada, cebola e orégano.',
      price: 45.90,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Margherita Premium',
      description: 'Mussarela de búfala, manjericão fresco, tomate cereja e azeite extra virgem.',
      price: 48.00,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Portuguesa',
      description: 'Presunto, ovos, cebola, ervilha, azeitonas pretas e mussarela.',
      price: 52.00,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Chocolate com Morango',
      description: 'Chocolate ao leite Nestlé, morangos frescos e granulado.',
      price: 39.90,
      category: 'doces',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Banana com Canela',
      description: 'Banana fatiada, leite condensado, canela em pó e mussarela.',
      price: 35.00,
      category: 'doces',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Coca-Cola 2L',
      description: 'Refrigerante gelado 2 litros.',
      price: 14.00,
      category: 'bebidas',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 5.0,
    },
    {
      id: 7,
      name: 'Suco de Laranja Natural',
      description: 'Suco natural da fruta 500ml.',
      price: 9.00,
      category: 'bebidas',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.8,
    },
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('tradicionais');
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState(null);

  const filteredItems = MENU_DATA.products.filter(item => item.category === activeCategory);

  const handleOrder = (item) => {
    setCartCount(prev => prev + 1);
    setLastAdded(item.id);
    
    setTimeout(() => setLastAdded(null), 500);

    const message = encodeURIComponent(`Olá! Gostaria de pedir uma pizza ${item.name} da ${MENU_DATA.restaurant.name}.`);
    const whatsappUrl = `https://wa.me/${MENU_DATA.restaurant.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const springTransition = { type: 'spring', stiffness: 300, damping: 20 };

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-white font-sans pb-24 overflow-x-hidden">
      {/* Header / Hero Section */}
      <header className="relative h-48 flex flex-col justify-end p-6 bg-gradient-to-b from-transparent to-[#1a0f0a]/80">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30 scale-110"
            alt="Pizza background"
          />
        </div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 uppercase">
            {MENU_DATA.restaurant.name}
          </h1>
          <p className="text-yellow-100/70 text-sm font-medium">As melhores pizzas artesanais da região</p>
        </motion.div>
      </header>

      {/* Categories Filter */}
      <nav className="sticky top-0 z-50 bg-[#1a0f0a]/95 backdrop-blur-md py-4 border-b border-white/5">
        <motion.div 
          className="flex gap-3 px-6 overflow-x-auto no-scrollbar"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={springTransition}
        >
          {MENU_DATA.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-bold text-sm",
                activeCategory === cat.id 
                  ? "bg-gradient-to-r from-orange-600 to-yellow-500 text-white shadow-lg shadow-orange-600/20 scale-105"
                  : "bg-white/5 text-yellow-100/60 hover:bg-white/10"
              )}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Menu Items List */}
      <main className="px-6 mt-8">
        <motion.div 
          layout
          className="flex flex-col gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="relative group"
              >
                <div className="bg-white/5 rounded-3xl p-5 pl-28 border border-white/5 hover:border-orange-500/30 transition-colors">
                  {/* Floating Image */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-28 h-28">
                    <motion.img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-full border-4 border-[#1a0f0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] drop-shadow-2xl"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={springTransition}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-white leading-tight">{item.name}</h3>
                      <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-lg">
                        <Star size={12} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-[10px] font-bold text-yellow-500">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-yellow-100/40 text-xs line-clamp-2 mb-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xl font-black text-yellow-400">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </span>
                      <button 
                        onClick={() => handleOrder(item)}
                        className="bg-gradient-to-r from-orange-600 to-yellow-500 p-2.5 rounded-2xl shadow-lg shadow-orange-600/30 active:scale-90 transition-transform"
                      >
                        <ShoppingCart size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Floating Cart Button */}
      <motion.div 
        className="fixed bottom-8 right-6 z-[100]"
        animate={lastAdded ? { scale: [1, 1.2, 1] } : { scale: [1, 1.05, 1] }}
        transition={lastAdded ? { duration: 0.3 } : { repeat: Infinity, duration: 2 }}
      >
        <button className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 p-5 rounded-full shadow-[0_15px_40px_rgba(234,88,12,0.4)] border-2 border-white/20">
          <ShoppingCart size={28} className="text-white" />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-white text-[#1a0f0a] text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-orange-600"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </motion.div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#1a0f0a]/80 backdrop-blur-xl border-t border-white/5 p-4 flex justify-around items-center z-40">
        <div className="flex flex-col items-center gap-1 text-orange-500">
          <PizzaIcon size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Cardápio</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-yellow-100/40">
          <Star size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Favoritos</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-yellow-100/40">
          <Phone size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Contato</span>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Menu;
