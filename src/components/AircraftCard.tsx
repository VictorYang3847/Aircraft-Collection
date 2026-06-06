import { Link } from 'react-router-dom';
import { ChevronRight, Gauge, Bomb, Ruler, Weight } from 'lucide-react';
import type { Aircraft } from '@/types';
import { generationNames } from '@/data/aircraftData';

interface AircraftCardProps {
  aircraft: Aircraft;
}

const statusColors = {
  '服役中': 'bg-green-900/50 text-green-400 border-green-700/50',
  '已退役': 'bg-gray-800/50 text-gray-400 border-gray-600/50',
  '研发中': 'bg-blue-900/50 text-blue-400 border-blue-700/50',
};

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  return (
    <Link
      to={`/aircraft/${aircraft.id}`}
      className="card block group h-full"
    >
      <div className="relative overflow-hidden bg-gradient-to-b from-military-700/50 to-military-800/50 aspect-[16/10]">
        <img
          src={aircraft.photos.sideView}
          alt={aircraft.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-military-900/80 to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge bg-military-accent/90 text-white text-xs">
            {generationNames[aircraft.generation]}
          </span>
          <span className={`badge border text-xs ${statusColors[aircraft.status]}`}>
            {aircraft.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-display font-bold text-white group-hover:text-military-accent transition-colors">
          {aircraft.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{aircraft.nameEn}</p>
        <p className="text-xs text-gray-600 mt-2">
          {aircraft.country} · {aircraft.manufacturer}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2 text-xs">
            <Gauge className="w-3.5 h-3.5 text-military-accent flex-shrink-0" />
            <span className="text-gray-400 truncate">{aircraft.performance.maxSpeed}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Bomb className="w-3.5 h-3.5 text-military-accent flex-shrink-0" />
            <span className="text-gray-400 truncate">{aircraft.performance.maxPayload}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Weight className="w-3.5 h-3.5 text-military-accent flex-shrink-0" />
            <span className="text-gray-400 truncate">{aircraft.performance.maxTakeoffWeight}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Ruler className="w-3.5 h-3.5 text-military-accent flex-shrink-0" />
            <span className="text-gray-400 truncate">{aircraft.performance.wingspan}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-gray-500">服役: {aircraft.serviceEntry}</span>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-military-accent group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
