
import React from 'react';
import { motion } from 'framer-motion';

const ModernLife: React.FC = () => {
  const steps = [
    { label: 'Làm việc', icon: '💼', color: 'bg-blue-500' },
    { label: 'Kiếm tiền', icon: '💵', color: 'bg-green-500' },
    { label: 'Chi tiêu', icon: '🛒', color: 'bg-yellow-500' },
    { label: 'Kiệt sức', icon: '😫', color: 'bg-red-500' }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
          VÒNG LẶP <span className="text-red-600">VÔ TẬN</span>
        </h2>
        <p className="text-xl text-gray-400 leading-relaxed mb-6">
          Trong xã hội hiện đại, lao động thường bị biến thành một gánh nặng. 
          Chúng ta bị cuốn vào một vòng xoáy không lối thoát, nơi ý nghĩa của cuộc đời bị đánh đổi lấy những nhu cầu sinh tồn cơ bản.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-red-400 font-medium italic">
            <span className="w-8 h-[2px] bg-red-400"></span>
            Mất đi niềm vui sáng tạo
          </div>
          <div className="flex items-center gap-4 text-red-400 font-medium italic">
            <span className="w-8 h-[2px] bg-red-400"></span>
            Cảm giác trống rỗng mỗi ngày
          </div>
        </div>
      </div>

      <div className="relative flex justify-center">
        <div className="grid grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 backdrop-blur-sm"
            >
              <span className="text-4xl">{step.icon}</span>
              <span className="text-lg font-bold tracking-wide uppercase">{step.label}</span>
              <div className={`w-12 h-1 ${step.color} rounded-full`} />
            </motion.div>
          ))}
          {/* Loop connector icon in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
            <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLife;
