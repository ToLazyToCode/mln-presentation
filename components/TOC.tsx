
import React from 'react';
import { motion } from 'framer-motion';
import { SECTIONS } from '../data/content';

interface TOCProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

const TOC: React.FC<TOCProps> = ({ activeIndex, onSelect }) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-6">
      {/* Progress Line */}
      <div className="absolute right-[5px] top-0 bottom-0 w-[2px] bg-white/10">
        <motion.div 
          className="w-full bg-red-600 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: (activeIndex + 1) / SECTIONS.length }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {SECTIONS.map((section, idx) => (
        <button
          key={section.id}
          onClick={() => onSelect(idx)}
          className="group flex items-center gap-4 focus:outline-none"
        >
          <motion.span
            animate={{ 
              opacity: activeIndex === idx ? 1 : 0,
              x: activeIndex === idx ? 0 : 20 
            }}
            className="text-xs font-semibold tracking-widest uppercase text-red-500 whitespace-nowrap hidden md:block"
          >
            {section.label}
          </motion.span>
          <div 
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeIndex === idx 
                ? 'bg-red-600 border-red-600 scale-125' 
                : 'bg-transparent border-white/20 group-hover:border-white/50'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default TOC;
