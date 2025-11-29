/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const InkBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#F5F2E9]">
      {/* Paper Texture */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-paper-texture" />

      {/* Ink Wash Blobs - Animated */}
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-5"
        style={{ background: 'radial-gradient(circle, #1a1a1a 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[60px] opacity-5"
        style={{ background: 'radial-gradient(circle, #446A7E 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle cloud patterns or mountain silhouettes could go here */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }} 
      />
    </div>
  );
};

export default InkBackground;
