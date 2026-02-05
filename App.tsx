
import React, { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from './data/content';
import { useStore } from './store/useStore';
import { usePerformance } from './hooks/usePerformance';
import TOC from './components/TOC';
import Hero from './sections/Hero';
import ModernLife from './sections/ModernLife';
import HumanNature from './sections/HumanNature';
import LaborRole from './sections/LaborRole';
import Alienation from './sections/Alienation';
import LivingVsExisting from './sections/LivingVsExisting';
import Liberation from './sections/Liberation';
import Conclusion from './sections/Conclusion';
import GraphCanvas from './visualization/GraphCanvas';

const App: React.FC = () => {
  const activeSection = useStore((state) => state.activeSection);
  const setActiveSection = useStore((state) => state.setActiveSection);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  usePerformance();

  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= SECTIONS.length) return;
    setActiveSection(index);
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 1000);
  }, [setActiveSection]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastScrollTime.current < 1100 || isScrolling.current) return;

    if (Math.abs(e.deltaY) < 20) return;

    if (e.deltaY > 0) {
      goToSection(activeSection + 1);
      lastScrollTime.current = now;
    } else {
      goToSection(activeSection - 1);
      lastScrollTime.current = now;
    }
  }, [activeSection, goToSection]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const renderSectionContent = (index: number) => {
    switch (index) {
      case 0: return <Hero />;
      case 1: return <ModernLife />;
      case 2: return <HumanNature />;
      case 3: return <LaborRole />;
      case 4: return <Alienation />;
      case 5: return <LivingVsExisting />;
      case 6: return <Liberation />;
      case 7: return <Conclusion />;
      default: return null;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#030303] text-white">
      {/* 3D Visual Layer */}
      <GraphCanvas />

      {/* UI Overlays */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      
      <TOC activeIndex={activeSection} onSelect={goToSection} />

      {/* Storytelling Scroll Content */}
      <motion.div
        className="h-full w-full relative z-20"
        animate={{ y: `-${activeSection * 100}vh` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {SECTIONS.map((_, idx) => (
          <section 
            key={idx} 
            className="h-screen w-full flex items-center justify-center p-8 md:p-16 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {activeSection === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(15px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -100, scale: 1.1, filter: 'blur(15px)' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-6xl"
                >
                  {renderSectionContent(idx)}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ))}
      </motion.div>

      {/* Cinematic Brand Footer */}
      <div className="fixed bottom-8 left-12 z-30 flex items-center gap-4">
        <div className="w-12 h-px bg-red-600" />
        <span className="text-[10px] tracking-[0.6em] uppercase font-black text-red-600">
          Philosophy of Existence
        </span>
      </div>
    </div>
  );
};

export default App;
