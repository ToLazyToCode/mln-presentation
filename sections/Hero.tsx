
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-none bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          CHÚNG TA LÀM VIỆC ĐỂ SỐNG?
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl md:text-4xl font-light text-red-500 mb-12 italic"
        >
          Hay chỉ đang tồn tại để mưu sinh?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="max-w-2xl mx-auto border-t border-white/10 pt-8"
        >
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Góc nhìn Triết học Mác – Lênin về bản chất con người, 
            giá trị của lao động và hành trình giải phóng khỏi sự tha hóa.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;
