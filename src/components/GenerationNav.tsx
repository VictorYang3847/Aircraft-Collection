import { useNavigate } from 'react-router-dom';
import { generationDescriptions } from '@/data/aircraftData';
import type { Generation } from '@/types';

interface GenerationNavProps {
  onSelect?: (generation: Generation) => void;
  showAll?: boolean;
}

const genColors: Record<number, { bg: string; hover: string; icon: string }> = {
  1: { bg: 'from-amber-900/40 to-amber-800/20', hover: 'hover:border-amber-500/60', icon: '🔥' },
  2: { bg: 'from-orange-900/40 to-orange-800/20', hover: 'hover:border-orange-500/60', icon: '⚡' },
  3: { bg: 'from-red-900/40 to-red-800/20', hover: 'hover:border-red-500/60', icon: '🔴' },
  4: { bg: 'from-purple-900/40 to-purple-800/20', hover: 'hover:border-purple-500/60', icon: '💜' },
  5: { bg: 'from-blue-900/40 to-blue-800/20', hover: 'hover:border-blue-500/60', icon: '💎' },
  6: { bg: 'from-cyan-900/40 to-cyan-800/20', hover: 'hover:border-cyan-500/60', icon: '🚀' },
};

const genNames: Record<number, string> = {
  1: '第一代',
  2: '第二代',
  3: '第三代',
  4: '第四代',
  5: '第五代',
  6: '第六代',
};

export default function GenerationNav({ onSelect, showAll = false }: GenerationNavProps) {
  const navigate = useNavigate();

  const handleClick = (generation: Generation) => {
    if (onSelect) {
      onSelect(generation);
    } else {
      navigate(`/aircraft?generation=${generation}`);
    }
  };

  if (showAll) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {(Object.keys(genColors) as unknown as Generation[]).map((gen) => (
          <button
            key={gen}
            onClick={() => handleClick(gen)}
            className={`card bg-gradient-to-br ${genColors[gen].bg} ${genColors[gen].hover} p-6 text-left border hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="text-3xl mb-3">{genColors[gen].icon}</div>
            <h3 className="font-display text-xl font-bold text-white mb-2">{genNames[gen]}</h3>
            <p className="text-xs text-gray-400 line-clamp-2">
              {generationDescriptions[gen]}
            </p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {(Object.keys(genColors) as unknown as Generation[]).map((gen) => (
        <button
          key={gen}
          onClick={() => handleClick(gen)}
          className={`px-4 py-2 rounded-lg border border-gray-700 bg-military-800/50 text-gray-300 
                     ${genColors[gen].hover} hover:-translate-y-0.5 transition-all duration-300`}
        >
          <span className="mr-1">{genColors[gen].icon}</span>
          {genNames[gen]}
        </button>
      ))}
    </div>
  );
}
