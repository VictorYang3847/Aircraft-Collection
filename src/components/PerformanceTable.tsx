import { Gauge, Bomb, Weight, Ruler, Target, ArrowUpFromLine, Clock, Maximize, ArrowUpDown } from 'lucide-react';
import type { Performance } from '@/types';

interface PerformanceTableProps {
  performance: Performance;
}

const performanceItems: { key: keyof Performance; label: string; icon: React.ReactNode }[] = [
  { key: 'maxSpeed', label: '最大巡航速度', icon: <Gauge className="w-5 h-5" /> },
  { key: 'maxPayload', label: '最大带弹量', icon: <Bomb className="w-5 h-5" /> },
  { key: 'maxTakeoffWeight', label: '最大起飞重量', icon: <Weight className="w-5 h-5" /> },
  { key: 'emptyWeight', label: '空重', icon: <Weight className="w-5 h-5" /> },
  { key: 'combatRadius', label: '作战半径', icon: <Target className="w-5 h-5" /> },
  { key: 'serviceCeiling', label: '实用升限', icon: <ArrowUpFromLine className="w-5 h-5" /> },
  { key: 'climbRate', label: '爬升率', icon: <Clock className="w-5 h-5" /> },
  { key: 'length', label: '机长', icon: <Maximize className="w-5 h-5" /> },
  { key: 'wingspan', label: '翼展', icon: <ArrowUpDown className="w-5 h-5" /> },
  { key: 'height', label: '机高', icon: <ArrowUpDown className="w-5 h-5" /> },
];

export default function PerformanceTable({ performance }: PerformanceTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {performanceItems.map((item) => (
        <div
          key={item.key}
          className="flex items-center gap-4 p-4 bg-military-800/50 rounded-lg border border-gray-700/50"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-military-accent/20 flex items-center justify-center text-military-accent">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-semibold text-white truncate">
              {performance[item.key] || '保密'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
