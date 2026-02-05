
import React from 'react';
import { motion } from 'framer-motion';

const LaborRole: React.FC = () => {
  return (
    <div className="relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">SỨC MẠNH CỦA LAO ĐỘNG</h2>
        <div className="h-1 w-24 bg-red-600 mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Kiến tạo Thế giới",
            desc: "Lao động tạo ra mọi giá trị vật chất, biến đổi tự nhiên để phục vụ nhu cầu con người.",
            img: "https://picsum.photos/seed/labor1/400/300"
          },
          {
            title: "Phát triển Trí tuệ",
            desc: "Thông qua lao động, bộ não và các giác quan của con người không ngừng hoàn thiện.",
            img: "https://picsum.photos/seed/labor2/400/300"
          },
          {
            title: "Khẳng định Bản thân",
            desc: "Lao động là nơi con người thể hiện tài năng, đam mê và bản sắc cá nhân độc nhất.",
            img: "https://picsum.photos/seed/labor3/400/300"
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all"
          >
            <div className="h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-red-500">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="mt-12 text-center text-gray-500 italic max-w-2xl mx-auto">
        "Chính lao động đã sáng tạo ra bản thân con người." — Ăng-ghen
      </p>
    </div>
  );
};

export default LaborRole;
