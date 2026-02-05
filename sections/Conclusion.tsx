
import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const Conclusion: React.FC = () => {
  const setActiveSection = useStore((state) => state.setActiveSection);

  return (
    <div className="relative text-center max-w-4xl mx-auto py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-red-600/5 blur-[150px] rounded-full pointer-events-none"
      />
      
      <h2 className="text-2xl md:text-3xl font-light text-gray-400 mb-8 italic">Lời kết cho hành trình tư duy</h2>
      
      <div className="space-y-12">
        <p className="text-3xl md:text-5xl font-black text-white leading-tight">
          "Hạnh phúc không phải là không làm gì, mà là được làm những gì chúng ta thực sự là."
        </p>
        
        <div className="h-px w-32 bg-red-600 mx-auto" />
        
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Triết học Mác – Lênin không chỉ giải thích thế giới, mà còn chỉ ra con đường 
          để cải tạo nó — bắt đầu từ việc nhận thức đúng đắn về lao động và giá trị làm người.
        </p>

        <motion.button
          onClick={() => setActiveSection(0)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
        >
          Xem lại từ đầu
        </motion.button>
      </div>

      <div className="mt-24 pt-12 border-t border-white/5 text-gray-600 text-sm">
        <p>&copy; 2024 Dự án Triết học & Đời sống</p>
        <p className="mt-2 tracking-widest">THỰC HIỆN VỚI TƯ DUY PHẢN BIỆN</p>
      </div>
    </div>
  );
};

export default Conclusion;
