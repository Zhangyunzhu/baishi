/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Artwork, LayoutMode } from '../types';
import { Grid, List, ZoomIn, X } from 'lucide-react';

const ARTWORKS: Artwork[] = [
  {
    id: '101',
    title: '群虾戏水图',
    artist: '齐白石',
    year: '1950',
    category: 'painting',
    image: '/images/artworks/artwork-001.jpg',
    description: '齐白石最著名的虾画作品之一，用墨浓淡相宜，群虾形态各异，栩栩如生。每只虾都透明如水晶，仿佛在水中畅游，极具生命力。',
    dimensions: '136cm x 68cm',
    material: '宣纸 / 水墨'
  },
  {
    id: '102',
    title: '虾蟹图',
    artist: '齐白石',
    year: '1952',
    category: 'painting',
    image: '/images/artworks/artwork-002.jpg',
    description: '虾蟹同绘，展现了齐白石对水族生物的深入观察和精湛技艺。虾的透明质感与蟹的坚硬外壳形成鲜明对比。',
    dimensions: '96cm x 52cm',
    material: '宣纸 / 水墨'
  },
  {
    id: '103',
    title: '喇叭花图',
    artist: '齐白石',
    year: '1955',
    category: 'painting',
    image: '/images/artworks/artwork-003.jpg',
    description: '喇叭花盛开，色彩鲜艳，笔法洒脱。齐白石善于捕捉花卉的神韵，将平凡的喇叭花画得生机勃勃。',
    dimensions: '68cm x 45cm',
    material: '宣纸 / 水墨'
  },
  {
    id: '104',
    title: '富翁梅花图',
    artist: '齐白石',
    year: '1948',
    category: 'painting',
    image: '/images/artworks/artwork-004.jpg',
    description: '梅花傲雪，寓意高洁。齐白石笔下的梅花既有传统文人画的雅致，又有民间艺术的朴实，别具一格。',
    dimensions: '180cm x 47cm',
    material: '宣纸 / 水墨'
  },
  {
    id: '105',
    title: '画果蜂蜜图',
    artist: '齐白石',
    year: '1954',
    category: 'painting',
    image: '/images/artworks/artwork-005.jpg',
    description: '瓜果与蜜蜂的组合，体现了齐白石对田园生活的热爱。蜜蜂勤劳采蜜，寓意勤劳致富的美好愿望。',
    dimensions: '68cm x 68cm',
    material: '宣纸 / 水墨'
  },
  {
    id: '106',
    title: '紫藤花图',
    artist: '齐白石',
    year: '1956',
    category: 'painting',
    image: '/images/artworks/artwork-006.jpg',
    description: '紫藤花串串垂下，如紫色瀑布。齐白石用简练的笔法表现出紫藤的柔美和生命力，色彩淡雅而富有诗意。',
    dimensions: '96cm x 52cm',
    material: '宣纸 / 水墨'
  },
  {
    id: '107',
    title: '棕树蛐蛐图',
    artist: '齐白石',
    year: '1953',
    category: 'painting',
    image: '/images/artworks/artwork-007.jpg',
    description: '棕榈树下蛐蛐鸣叫，充满了乡土气息。齐白石善于从平凡的乡村生活中发现美，并用画笔记录下来。',
    dimensions: '高 45cm',
    material: '宣纸 / 水墨'
  },
  {
    id: '108',
    title: '虫草册',
    artist: '齐白石',
    year: '1951',
    category: 'painting',
    image: '/images/artworks/artwork-008.jpg',
    description: '草虫册页是齐白石的经典题材，工笔草虫配写意花卉，工写结合，展现了大师深厚的绘画功底。',
    dimensions: '20cm x 15cm',
    material: '宣纸 / 水墨'
  }
];

const SectionGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'painting' | 'porcelain' | 'object'>('all');
  const [layout, setLayout] = useState<LayoutMode>('grid');
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

  const filteredArt = activeCategory === 'all' 
    ? ARTWORKS 
    : ARTWORKS.filter(a => a.category === activeCategory);

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-calligraphy text-5xl md:text-6xl mb-4 text-[#1A1A1A]">藏品赏析</h2>
        <div className="w-16 h-1 bg-[#C83C23] mx-auto rounded-full" />
        <p className="font-serif text-[#446A7E] mt-4">Fine Art Collection</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        {/* Categories */}
        <div className="flex gap-8 border-b border-[#E0DCD3] pb-2">
          {[
            { id: 'all', label: '全部' },
            { id: 'painting', label: '字画' },
            { id: 'porcelain', label: '瓷器' },
            { id: 'object', label: '老物件' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`font-serif text-lg pb-2 relative transition-colors ${
                activeCategory === cat.id ? 'text-[#C83C23]' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="underline" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C83C23]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Layout Switcher */}
        <div className="flex gap-2 bg-white/50 p-1 rounded-lg border border-[#E0DCD3]">
          <button 
            onClick={() => setLayout('grid')}
            className={`p-2 rounded ${layout === 'grid' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#E0DCD3]'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setLayout('list')}
            className={`p-2 rounded ${layout === 'list' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#E0DCD3]'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div 
        layout
        className={`grid gap-8 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
      >
        <AnimatePresence>
          {filteredArt.map((art) => (
            <motion.div
              key={art.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`group bg-white border border-[#E0DCD3] p-4 shadow-sm hover:shadow-xl hover:border-[#C83C23]/30 transition-all duration-500 cursor-pointer
                ${layout === 'list' ? 'flex flex-col md:flex-row gap-8 items-center' : 'flex flex-col'}`}
              onClick={() => setSelectedArt(art)}
              data-hover="true"
            >
              <div className={`relative overflow-hidden ${layout === 'list' ? 'w-full md:w-1/3 h-64' : 'w-full h-80'}`}>
                <motion.img 
                  src={art.image} 
                  alt={art.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 text-[#C83C23]" />
                </div>
              </div>

              <div className={`pt-4 ${layout === 'list' ? 'w-full md:w-2/3 md:pt-0' : 'text-center'}`}>
                <h3 className="font-calligraphy text-2xl mb-1 group-hover:text-[#C83C23] transition-colors">{art.title}</h3>
                <p className="font-serif text-sm text-[#9C5E28] mb-3">{art.artist} | {art.year}</p>
                {layout === 'list' && <p className="text-gray-600 line-clamp-2">{art.description}</p>}
                
                {/* Decorative Seal */}
                <div className={`mt-4 ${layout === 'list' ? 'hidden' : 'inline-block'}`}>
                  <div className="border border-[#C83C23] w-6 h-6 flex items-center justify-center rounded-sm">
                    <span className="text-[10px] text-[#C83C23] leading-none">鉴赏</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1A1A]/80 backdrop-blur-md"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F5F2E9] w-full max-w-5xl h-[80vh] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-[#C83C23] hover:text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-3/5 h-1/2 md:h-full bg-[#E0DCD3] relative flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedArt.image} 
                  alt={selectedArt.title}
                  className="max-w-full max-h-full object-contain p-8 drop-shadow-xl"
                />
              </div>

              {/* Info Side */}
              <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto bg-paper-texture relative">
                <div className="border-l-4 border-[#C83C23] pl-6 py-2 mb-8">
                  <h2 className="font-calligraphy text-4xl mb-2">{selectedArt.title}</h2>
                  <p className="font-serif text-[#9C5E28] text-lg">{selectedArt.artist}</p>
                </div>

                <div className="space-y-6 font-serif text-[#1A1A1A]/80">
                  <p className="leading-loose text-lg">{selectedArt.description}</p>
                  
                  <div className="bg-white/50 p-6 rounded-lg border border-[#E0DCD3] space-y-3">
                    <div className="flex justify-between border-b border-[#E0DCD3] pb-2">
                      <span className="text-gray-500">年代</span>
                      <span>{selectedArt.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E0DCD3] pb-2">
                      <span className="text-gray-500">材质</span>
                      <span>{selectedArt.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">尺寸</span>
                      <span>{selectedArt.dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Stamp */}
                <div className="absolute bottom-8 right-8 opacity-20 rotate-[-15deg]">
                  <div className="border-4 border-[#C83C23] p-2 w-24 h-24 flex items-center justify-center">
                    <span className="font-calligraphy text-[#C83C23] text-4xl">珍藏</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SectionGallery;
