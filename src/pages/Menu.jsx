import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Phone, Star, Flame, Pizza as PizzaIcon, Beer, Heart } from 'lucide-react';
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
      name: 'Margherita Premium',
      description: 'Mussarela de búfala, manjericão fresco, tomate cereja e azeite extra virgem sobre massa artesanal.',
      price: 48.00,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Calabresa Especial',
      description: 'Molho de tomate artesanal, mussarela, calabresa fatiada, cebola roxa e orégano.',
      price: 45.90,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Portuguesa Real',
      description: 'Presunto cozido, ovos, cebola, ervilha, azeitonas pretas e mussarela selecionada.',
      price: 52.00,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Quatro Queijos',
      description: 'Combinação perfeita de mussarela, provolone, parmesão e o legítimo catupiry.',
      price: 54.00,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.8,
    },
    {
      id: 5,
      name: 'Frango com Catupiry',
      description: 'Frango desfiado temperado com ervas finas e generosa camada de Catupiry.',
      price: 49.90,
      category: 'tradicionais',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 4.9,
    },
    {
      id: 6,
      name: 'Nutella com Morango',
      description: 'O legítimo creme de avelã Nutella com morangos frescos e açúcar de confeiteiro.',
      price: 42.00,
      category: 'doces',
      image: 'https://images.unsplash.com/photo-1613506133704-564cb440ca5d?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 5.0,
    },
    {
      id: 7,
      name: 'Coca-Cola 2L',
      description: 'Refrigerante gelado 2 litros.',
      price: 14.00,
      category: 'bebidas',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&h=400&auto=format&fit=crop',
      rating: 5.0,
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
    
    setTimeout(() => setLastAdded(null), 600);

    const message = encodeURIComponent(`Olá! Gostaria de pedir uma pizza ${item.name} da ${MENU_DATA.restaurant.name}.`);
    const whatsappUrl = `https://wa.me/${MENU_DATA.restaurant.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const springTransition = { type: 'spring', stiffness: 300, damping: 20 };

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-white font-sans pb-32 overflow-x-hidden">
      {/* Header / Hero Section */}
      <header className="relative h-56 flex flex-col justify-end p-6 bg-gradient-to-b from-transparent to-[#1a0f0a]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Pizza background"
          />
        </div>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-[length:200%_auto] animate-gradient-x uppercase">
            {MENU_DATA.restaurant.name}
          </h1>
          <p className="text-yellow-100/80 text-sm font-semibold mt-1 tracking-wide">
            Sabor artesanal direto do forno a lenha
          </p>
        </motion.div>
      </header>

      {/* Categories Filter */}
      <nav className="sticky top-0 z-50 bg-[#1a0f0a]/90 backdrop-blur-xl py-5 border-b border-white/10 shadow-2xl">
        <motion.div 
          className="flex gap-4 px-6 overflow-x-auto no-scrollbar items-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={springTransition}
        >
          {MENU_DATA.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-500 font-bold text-sm border",
                activeCategory === cat.id 
                  ? "bg-gradient-to-r from-orange-600 to-yellow-500 text-white border-transparent shadow-[0_10px_20px_rgba(234,88,12,0.3)] scale-105"
                  : "bg-white/5 text-yellow-100/50 border-white/5 hover:bg-white/10"
              )}
            >
              <span className={cn(activeCategory === cat.id ? "animate-bounce" : "")}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Menu Items List */}
      <main className="px-6 mt-10">
        <motion.div 
          layout
          className="flex flex-col gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ 
                  ...springTransition,
                  delay: index * 0.05 
                }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <div className={cn(
                  "bg-gradient-to-br from-white/10 to-white/5 rounded-[2rem] p-6 pl-32 border border-white/10 transition-all duration-500",
                  lastAdded === item.id ? "ring-2 ring-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]" : "hover:border-orange-500/40"
                )}>
                  {/* Floating Image Container */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      transition={springTransition}
                      className="w-full h-full relative"
                    >
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full border-4 border-[#1a0f0a] shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                      />
                      {/* Glow effect behind image */}
                      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl -z-10" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col min-h-[100px]">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-extrabold text-xl text-white tracking-tight leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-xl border border-yellow-500/20">
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-black text-yellow-500">{item.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-yellow-100/60 text-sm mt-2 line-clamp-2 font-medium leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-yellow-100/40 font-bold uppercase tracking-widest">A partir de</span>
                        <span className="text-2xl font-black text-yellow-400 tracking-tighter">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      
                      <motion.button 
                        onClick={() => handleOrder(item)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "p-4 rounded-2xl shadow-xl transition-all duration-300",
                          lastAdded === item.id 
                            ? "bg-green-500 shadow-green-500/40" 
                            : "bg-gradient-to-r from-orange-600 to-yellow-500 shadow-orange-600/30"
                        )}
                      >
                        <ShoppingCart size={24} className={cn("text-white transition-transform", lastAdded === item.id ? "animate-bounce" : "")} />
                      </motion.button>
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
        className="fixed bottom-10 right-6 z-[100]"
        animate={lastAdded ? { 
          scale: [1, 1.3, 1],
          rotate: [0, -15, 15, -15, 0]
        } : { 
          y: [0, -10, 0]
        }}
        transition={lastAdded ? { duration: 0.5 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <button className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 p-6 rounded-full shadow-[0_20px_50px_rgba(234,88,12,0.5)] border-2 border-white/20 group">
          <ShoppingCart size={32} className="text-white group-hover:scale-110 transition-transform" />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={cartCount}
                className="absolute -top-2 -right-2 bg-white text-[#1a0f0a] text-xs font-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-orange-600 shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#1a0f0a]/90 backdrop-blur-2xl border-t border-white/10 p-5 flex justify-around items-center z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center gap-1.5 text-orange-500">
          <PizzaIcon size={26} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cardápio</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-yellow-100/30 hover:text-yellow-400 transition-colors">
          <Heart size={26} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Favoritos</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-yellow-100/30 hover:text-yellow-400 transition-colors">
          <Phone size={26} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contato</span>
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
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Menu;
