
import React from 'react';
import { motion } from 'framer-motion';

const Liberation: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <span className="inline-block px-4 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
          Mục tiêu tối thượng
        </span>
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">GIẢI PHÓNG <br/> CON NGƯỜI</h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
          Tiền bạc hay của cải chỉ nên là công cụ phục vụ cuộc sống. 
          Mục đích thực sự của sự phát triển xã hội là tạo ra môi trường để mọi cá nhân 
          có thể phát triển <span className="text-white font-bold">toàn diện, tự do và tự giác</span>.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        {[
          "Xóa bỏ sự tha hóa",
          "Trả lại giá trị cho lao động",
          "Xây dựng xã hội nhân văn"
        ].map((text, idx) => (
          <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-red-500/50 transition-colors">
            <div className="w-10 h-10 bg-red-600 rounded-full mb-4 flex items-center justify-center font-bold">
              {idx + 1}
            </div>
            <p className="text-lg font-bold">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Liberation;
