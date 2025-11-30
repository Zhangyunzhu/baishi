/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isWeChat, setIsWeChat] = useState(false);

  useEffect(() => {
    // 检测是否在微信浏览器中
    const ua = navigator.userAgent.toLowerCase();
    setIsWeChat(ua.includes('micromessenger'));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: '首页' },
    { id: 'gallery', label: '藏品赏析' },
    { id: 'stories', label: '藏品故事' },
    { id: 'about', label: '关于艺术馆' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 pointer-events-none
          ${isWeChat ? 'top-[60px]' : 'top-0'}`}
        style={{ 
          paddingTop: isWeChat ? 'env(safe-area-inset-top)' : '0'
        }}
      >
        <div className={`relative pointer-events-auto flex items-center justify-between px-8 py-3 transition-all duration-500 
          ${scrolled 
            ? 'w-full md:w-[90%] bg-[#1A1A1A]/90 backdrop-blur-md text-[#F5F2E9] shadow-lg rounded-b-xl' 
            : 'w-full md:w-[80%] bg-transparent text-[#1A1A1A]'}`}
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border-2 border-current rounded-sm flex items-center justify-center overflow-hidden">
               <span className="font-calligraphy text-2xl leading-none pt-1">白石</span>
            </div>
            <span className="font-calligraphy text-2xl md:text-3xl tracking-widest hidden md:block">
              白石后人艺术馆
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group relative py-2 text-lg font-serif tracking-widest hover:text-[#C83C23] transition-colors"
                data-hover="true"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C83C23] transition-all duration-300 group-hover:w-full" />
                {/* Ink Dot on Hover */}
                <span className="absolute -top-2 left-1/2 w-1.5 h-1.5 bg-[#C83C23] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F5F2E9] flex flex-col items-center justify-center bg-paper-texture"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-[#1A1A1A]"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className="font-calligraphy text-4xl text-[#1A1A1A] hover:text-[#C83C23] relative"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-x-0 bottom-2 h-3 bg-[#E0DCD3] -z-0 opacity-50 -rotate-1" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
