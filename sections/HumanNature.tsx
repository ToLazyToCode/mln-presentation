
import React from 'react';
import { motion } from 'framer-motion';

const HumanNature: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-12 border-l-8 border-red-600 pl-8"
      >
        BẢN CHẤT CON NGƯỜI LÀ GÌ?
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-xl text-gray-300 leading-relaxed">
            Theo Các Mác, con người không phải là một thực thể trừu tượng cô lập.
          </p>
          <div className="p-8 bg-gradient-to-br from-red-900/20 to-transparent border border-red-900/40 rounded-3xl">
            <p className="text-2xl font-serif italic text-white leading-relaxed">
              "Trong tính hiện thực của nó, bản chất con người là tổng hòa các quan hệ xã hội."
            </p>
            <p className="mt-4 text-red-500 font-bold uppercase tracking-widest text-sm">— K. Marx</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 shrink-0 bg-white/10 rounded-full flex items-center justify-center text-xl font-bold">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Thực thể sinh học</h3>
              <p className="text-gray-400">Có các nhu cầu cơ bản như ăn, mặc, ở.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 shrink-0 bg-white/10 rounded-full flex items-center justify-center text-xl font-bold">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Thực thể xã hội</h3>
              <p className="text-gray-400">Hình thành qua giao tiếp, ngôn ngữ và các mối quan hệ sản xuất.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 shrink-0 bg-white/10 rounded-full flex items-center justify-center text-xl font-bold">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Thực thể có ý thức</h3>
              <p className="text-gray-400">Khác với loài vật, con người hành động có mục đích và sáng tạo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanNature;
