/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || target.closest('a') || target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block brush-cursor"
      style={{ x, y, translateX: '-15px', translateY: '-70px' }}
    >
      <motion.div
        className="relative"
        animate={{ 
          scale: isHovering ? 1.2 : 1,
          rotate: isHovering ? 8 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* 毛笔整体容器 - 斜向45度 */}
        <div className="relative transform rotate-45 origin-center">
          
          {/* 笔杆 - 木质/竹质 */}
          <div className={`absolute transition-all duration-300 ${
            isHovering ? 'w-2 h-16' : 'w-1.5 h-12'
          } bg-gradient-to-b from-[#DEB887] via-[#D2B48C] to-[#CD853F] rounded-full -top-12 left-1/2 transform -translate-x-1/2 shadow-md border border-[#CD853F]/30`}>
            {/* 笔杆纹理 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5DEB3]/20 to-transparent rounded-full" />
            {/* 竹节 */}
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-[#8B4513]/40 rounded-full" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#8B4513]/40 rounded-full" />
            <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-[#8B4513]/40 rounded-full" />
          </div>
          
          {/* 笔头金属套 */}
          <div className={`absolute transition-all duration-300 ${
            isHovering ? 'w-2.5 h-4' : 'w-2 h-3'
          } bg-gradient-to-b from-[#E6E6FA] via-[#C0C0C0] to-[#808080] rounded-sm -top-3 left-1/2 transform -translate-x-1/2 shadow-sm border border-[#A9A9A9]/50`}>
            {/* 金属光泽 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-sm" />
          </div>
          
          {/* 毛笔头主体 */}
          <div className={`relative transition-all duration-300 ${
            isHovering ? 'w-4 h-10' : 'w-3 h-8'
          } left-1/2 transform -translate-x-1/2`}>
            
            {/* 毛笔头基础形状 - 水滴形 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#696969] via-[#2F4F4F] to-[#000000] rounded-b-full"
                 style={{
                   clipPath: 'ellipse(45% 100% at 50% 0%)',
                   filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                 }} />
            
            {/* 毛笔尖端 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gradient-to-b from-[#2F4F4F] to-[#000000] rounded-full" />
            
            {/* 毛丝纹理层 - 简化版本 */}
            <div className="absolute inset-0 opacity-40">
              {/* 主要毛丝 - 只保留中间的主要纹理 */}
              <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-[#808080] to-[#2F2F2F] transform -translate-x-1/2" />
              <div className="absolute left-1/3 top-1/4 w-px h-3/4 bg-gradient-to-b from-[#696969] to-[#2F2F2F]" />
              <div className="absolute right-1/3 top-1/4 w-px h-3/4 bg-gradient-to-b from-[#696969] to-[#2F2F2F]" />
            </div>
            
            {/* 毛笔头高光 */}
            <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
        
        {/* 墨迹效果 - 悬停时显示 */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1A1A1A] rounded-full blur-sm"
          />
        )}
        
        {/* 红色印章效果环 */}
        <div className="absolute w-8 h-8 border border-[#C83C23] rounded-full opacity-20 animate-pulse" />
        
        {/* 悬停时的墨水扩散效果 */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 2 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute w-2 h-2 bg-[#C83C23] rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
