import { useState } from 'react';
import type { Photos } from '@/types';

interface PhotoGalleryProps {
  photos: Photos;
  name: string;
}

type ViewType = 'front' | 'side' | 'top' | 'additional';

export default function PhotoGallery({ photos, name }: PhotoGalleryProps) {
  const [activeView, setActiveView] = useState<ViewType>('side');

  const views: { key: ViewType; label: string; src: string }[] = [
    { key: 'front', label: '前视图', src: photos.frontView },
    { key: 'side', label: '侧视图', src: photos.sideView },
    { key: 'top', label: '俯视图', src: photos.topView },
  ];

  const currentSrc = views.find(v => v.key === activeView)?.src || photos.sideView;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] bg-military-800/50 rounded-xl overflow-hidden border border-gray-700/50">
        <img
          src={currentSrc}
          alt={`${name} - ${views.find(v => v.key === activeView)?.label}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-military-900/90 to-transparent p-4">
          <span className="text-sm font-medium text-white">
            {views.find(v => v.key === activeView)?.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {views.map((view) => (
          <button
            key={view.key}
            onClick={() => setActiveView(view.key)}
            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
              activeView === view.key
                ? 'border-military-accent shadow-lg shadow-military-accent/20'
                : 'border-gray-700/50 hover:border-gray-500'
            }`}
          >
            <img
              src={view.src}
              alt={view.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-military-900/40 flex items-center justify-center">
              <span className="text-xs font-medium text-white">{view.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
