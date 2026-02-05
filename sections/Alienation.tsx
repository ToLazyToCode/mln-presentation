
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALIENATION_DETAILS } from '../data/content';
import { useStore } from '../store/useStore';

const Alienation: React.FC = () => {
  const selected = useStore((state) => state.selectedNodeId);
  const setSelected = useStore((state) => state.setSelectedNode);
  const setHovered = useStore((state) => state.setHoveredNode);

  const nodes = [
    { id: 'human', label: 'Con người', x: '50%', y: '50%', main: true },
    { id: 'product', label: 'Sản phẩm', x: '50%', y: '15%', main: false },
    { id: 'process', label: 'Quá trình', x: '85%', y: '50%', main: false },
    { id: 'society', label: 'Xã hội', x: '50%', y: '85%', main: false },
    { id: 'nature_essence', label: 'Bản chất', x: '15%', y: '50%', main: false }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center h-full">
      <div className="lg:w-1/2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-5xl md:text-8xl font-black mb-6 text-red-600 tracking-tighter uppercase leading-none">
            SỰ THA HÓA <br/> <span className="text-white">LAO ĐỘNG</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-md font-light italic">
            "Lao động tạo ra những lâu đài, nhưng nó tạo ra những hang ổ cho công nhân."
          </p>
        </motion.div>

        <div className="min-h-[240px]">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="glass-card p-10 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-red-600">
                  {ALIENATION_DETAILS[selected as keyof typeof ALIENATION_DETAILS].title}
                </h3>
                <p className="text-gray-200 text-xl leading-relaxed font-light">
                  {ALIENATION_DETAILS[selected as keyof typeof ALIENATION_DETAILS].desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:w-1/2 relative w-full aspect-square max-w-[600px] flex items-center justify-center">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {nodes.filter(n => !n.main).map(node => (
            <line 
              key={node.id}
              x1="50%" y1="50%" x2={node.x} y2={node.y}
              stroke="white" strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
        </svg>

        <div className="absolute inset-0 z-50">
           {nodes.map((node) => (
            <motion.button
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group outline-none"
              style={{ left: node.x, top: node.y }}
            >
              <div className={`
                flex items-center justify-center transition-all duration-700
                ${node.main ? 'w-36 h-36' : 'w-24 h-24'}
              `}>
                <span className={`
                  text-[12px] uppercase font-black tracking-widest transition-all duration-500
                  ${selected === node.id ? 'text-red-500 scale-110 opacity-100' : 'text-white/60 opacity-100'}
                `}>
                  {node.label}
                </span>
                
                {/* Glow Ring */}
                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                  selected === node.id 
                    ? 'border-red-600 scale-110 bg-red-600/10 shadow-[0_0_30px_rgba(220,38,38,0.2)]' 
                    : 'border-white/10 group-hover:border-red-600/40 group-hover:scale-105'
                }`} />
                
                {/* Outer pulsing ring for selected node */}
                {selected === node.id && (
                  <motion.div 
                    layoutId="pulse"
                    className="absolute inset-[-10px] rounded-full border border-red-600/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alienation;
