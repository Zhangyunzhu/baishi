/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const FEATURED_ART = [
  {
    id: '1',
    title: '齐燕君传承',
    subtitle: '白石曾孙女',
    image: '/images/hero/hero-001.webp',
    desc: '齐燕君（1944-），齐白石曾孙女，祖父齐良元乃齐白石长子。少年学画，曾得白石老人指授，擅长画虾蟹，深得齐派家风，现隐居南岳专心绘事。'
  },
  {
    id: '2',
    title: '威风凛凛',
    subtitle: '虎啸山林',
    image: '/images/hero/hero-002.webp',
    desc: '齐白石虎画精品，虎威凛凛，笔法雄健，展现了画家深厚的功力。'
  },
  {
    id: '3',
    title: '梅花傲雪',
    subtitle: '高洁品格',
    image: '/images/hero/hero-003.webp',
    desc: '梅花凌寒独放，寓意高洁品格，体现了齐白石对传统文人精神的追求。'
  }
];

const SectionHero: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // 预加载所有轮播图片
  useEffect(() => {
    const preloadImages = async () => {
      const promises = FEATURED_ART.map(art => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = art.image;
        });
      });

      try {
        await Promise.all(promises);
        setImagesPreloaded(true);
        setLoaded(true);
      } catch (error) {
        console.error('图片预加载失败:', error);
        setLoaded(true); // 即使失败也继续显示
      }
    };

    preloadImages();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!loaded) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % FEATURED_ART.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [loaded]);

  // Initial load simulation
  useEffect(() => {
    setTimeout(() => setLoaded(true), 1500);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] w-full overflow-hidden flex flex-col justify-center">
      
      {/* Loading Overlay / Intro Animation */}
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            className="absolute inset-0 z-50 bg-[#F5F2E9] flex items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h1 className="font-calligraphy text-6xl md:text-8xl text-[#1A1A1A] mb-4">白石后人</h1>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '100%' }} 
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-[#C83C23] mx-auto" 
              />
              <p className="font-serif text-xl text-[#9C5E28] mt-4 tracking-[0.5em] uppercase">Art Museum</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel Content */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
             {/* Image */}
             <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: `url(${FEATURED_ART[currentIndex].image})` }}
             />
             {/* Gradient/Wash Overlay */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2E9] via-[#F5F2E9]/60 to-transparent" />
             <div className="absolute inset-0 bg-paper-texture mix-blend-multiply opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Text */}
      <div className="relative z-10 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col items-start">
        <div className="overflow-hidden mb-2">
          <motion.div
             key={`sub-${currentIndex}`}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="flex items-center gap-3"
          >
            <span className="w-8 h-[2px] bg-[#C83C23]" />
            <span className="font-serif text-[#C83C23] text-lg md:text-xl tracking-widest">{FEATURED_ART[currentIndex].subtitle}</span>
          </motion.div>
        </div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-calligraphy text-7xl md:text-9xl text-[#1A1A1A]"
          >
            {FEATURED_ART[currentIndex].title}
          </motion.h1>
        </div>

        <motion.p
          key={`desc-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-serif text-lg md:text-2xl text-[#446A7E] max-w-lg leading-relaxed mb-10"
        >
          {FEATURED_ART[currentIndex].desc}
        </motion.p>

        {/* Carousel Indicators */}
        <div className="flex gap-3 mb-12">
          {FEATURED_ART.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 transition-all duration-300 ${idx === currentIndex ? 'w-12 bg-[#1A1A1A]' : 'w-4 bg-[#E0DCD3]'}`}
            />
          ))}
        </div>
      </div>

      {/* Category Quick Links (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#F5F2E9] to-transparent pt-20 pb-10 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: '白石后人字画', id: 'gallery' },
            { title: '古瓷珍玩', id: 'gallery' },
            { title: '老物件专区', id: 'gallery' }
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + idx * 0.2 }}
              onClick={() => onNavigate(cat.id)}
              className="group cursor-pointer bg-white/50 backdrop-blur-sm border border-[#E0DCD3] p-6 flex justify-between items-center hover:border-[#C83C23] hover:shadow-lg transition-all duration-300"
              data-hover="true"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E0DCD3] rounded-full flex items-center justify-center font-calligraphy text-2xl text-[#1A1A1A] group-hover:bg-[#C83C23] group-hover:text-[#F5F2E9] transition-colors">
                  {idx + 1}
                </div>
                <span className="font-serif text-xl tracking-wide group-hover:text-[#C83C23] transition-colors">{cat.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#9C5E28] group-hover:translate-x-1 transition-transform" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
