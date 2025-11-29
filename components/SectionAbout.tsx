/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const SectionAbout: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 relative bg-[#1A1A1A] text-[#F5F2E9]">
      <div className="absolute inset-0 bg-paper-texture opacity-5" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Brand/Philosophy */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-calligraphy text-5xl md:text-7xl mb-8 leading-tight"
            >
              传承齐门笔墨<br/>
              <span className="text-[#C83C23]">弘扬国风美学</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-lg text-gray-300 leading-loose mb-12"
            >
              白石后人艺术馆致力于收藏、整理、展示齐白石家族后人的优秀艺术作品。
              在这里，您不仅能欣赏到正统的齐派虾画，更能感受到中国传统文化的博大精深。
              我们希望通过这个平台，让水墨精神代代相传。
            </motion.p>

            {/* Simple Timeline Visual */}
            <div className="border-l border-white/20 pl-8 space-y-8">
               {[
                 { year: '1957', event: '齐白石先生逝世，艺术精神永存' },
                 { year: '1980', event: '家族后人开始系统整理遗作' },
                 { year: '2010', event: '艺术馆筹备委员会成立' },
                 { year: '2024', event: '线上数字艺术馆正式上线' }
               ].map((item, idx) => (
                 <div key={idx} className="relative">
                   <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#C83C23] border-4 border-[#1A1A1A]" />
                   <div className="font-serif text-[#C83C23] font-bold mb-1">{item.year}</div>
                   <div className="font-serif text-gray-400">{item.event}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Info Card / Contact */}
          <div className="relative">
             <div className="absolute inset-0 bg-[#C83C23] transform rotate-3 rounded-lg opacity-20" />
             <div className="bg-[#F5F2E9] text-[#1A1A1A] p-10 rounded-lg relative shadow-xl">
                <h3 className="font-calligraphy text-4xl mb-8 border-b-2 border-[#1A1A1A] pb-4 inline-block">参观指引</h3>
                
                <div className="space-y-6 font-serif text-lg">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#C83C23] mt-1" />
                    <div>
                      <p className="font-bold mb-1">场馆地址</p>
                      <p className="text-gray-600">湖南省衡阳市南岳区万寿广场85号</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-[#C83C23] mt-1" />
                    <div>
                      <p className="font-bold mb-1">开放时间</p>
                      <p className="text-gray-600">周二至周日 9:00 - 17:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-[#C83C23] mt-1" />
                    <div>
                      <p className="font-bold mb-1">联系电话</p>
                      <p className="text-gray-600">13873406688（唐女士）</p>
                      <p className="text-gray-600">13807479431（张先生）</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-4 bg-[#E0DCD3]/50 rounded text-center border border-[#E0DCD3]">
                  <p className="text-sm text-[#9C5E28]">目前仅开放预约参观，请提前联系</p>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      {/* Footer Copyright */}
      <div className="text-center mt-24 pt-8 border-t border-white/10 font-serif text-gray-500 text-sm">
         <p>© 2024 白石后人艺术馆 版权所有</p>
         <p className="mt-2 text-xs opacity-50">Designed with Traditional Aesthetics</p>
      </div>
    </section>
  );
};

export default SectionAbout;
