import { Code2, Cpu, Atom, Cog, Ruler, Calculator } from 'lucide-react';

// Map track IDs to their respective Lucide icons
const trackIconMap = {
  python: Code2,
  rust: Cpu,
  react: Atom,
  c: Cog,
  algebra: Ruler,
  arithmetic: Calculator,
};

// Default colors for each track
const trackColorMap = {
  python: '#22c55e',
  rust: '#f97316',
  react: '#0ea5e9',
  c: '#64748b',
  algebra: '#a855f7',
  arithmetic: '#0ea5e9',
};

export function TrackIcon({ trackId, size = 24, color, className }) {
  const Icon = trackIconMap[trackId] || Code2;
  const iconColor = color || trackColorMap[trackId] || '#64748b';
  
  return <Icon size={size} color={iconColor} className={className} />;
}

export function getTrackIcon(trackId) {
  return trackIconMap[trackId] || Code2;
}

export default TrackIcon;
