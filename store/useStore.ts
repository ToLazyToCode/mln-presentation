
import { create } from 'zustand';

interface AppState {
  activeSection: number;
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  performanceMode: 'high' | 'low';
  setActiveSection: (idx: number) => void;
  setHoveredNode: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setPerformanceMode: (mode: 'high' | 'low') => void;
}

export const useStore = create<AppState>((set) => ({
  activeSection: 0,
  hoveredNodeId: null,
  selectedNodeId: 'human', // Defaulting to human so text shows immediately in Alienation section
  performanceMode: 'high',
  setActiveSection: (idx) => set({ activeSection: idx }),
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setPerformanceMode: (mode) => set({ performanceMode: mode }),
}));
