
import React from 'react';
import { motion } from 'framer-motion';

const LivingVsExisting: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-widest">Sống <span className="text-red-600">vs</span> Tồn tại</h2>
      
      <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
        <div className="bg-[#0a0a0a] p-12">
          <h3 className="text-3xl font-bold mb-8 text-gray-500 uppercase">Chỉ tồn tại</h3>
          <ul className="space-y-6">
            {[
              "Lao động là cưỡng bức để kiếm sống",
              "Thời gian rảnh là lúc trốn tránh thực tại",
              "Bị chi phối bởi thế giới vật chất",
              "Cảm thấy lạc lõng giữa cộng đồng",
              "Sống vì kỳ vọng của người khác"
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-center text-gray-500">
                <span className="text-red-900">✕</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-red-950/20 to-black p-12">
          <h3 className="text-3xl font-bold mb-8 text-red-500 uppercase">Thực sự Sống</h3>
          <ul className="space-y-6">
            {[
              "Lao động là nhu cầu tự thân, sáng tạo",
              "Mọi hoạt động đều có ý thức rõ ràng",
              "Làm chủ được bản thân và hoàn cảnh",
              "Kết nối sâu sắc với xã hội và thiên nhiên",
              "Tự do phát triển năng khiếu riêng"
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-center text-white">
                <span className="text-green-500">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LivingVsExisting;
