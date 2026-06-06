import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AircraftCard from '@/components/AircraftCard';
import SearchBar from '@/components/SearchBar';
import { useAircraftStore } from '@/store/aircraftStore';
import { generationNames } from '@/data/aircraftData';
import type { Generation } from '@/types';
import { Filter } from 'lucide-react';

export default function AircraftList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredAircraft, selectedGeneration, setSelectedGeneration } = useAircraftStore();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const gen = searchParams.get('generation');
    if (gen) {
      setSelectedGeneration(parseInt(gen) as Generation);
    }
  }, [searchParams]);

  const handleGenerationClick = (gen: Generation) => {
    if (selectedGeneration === gen) {
      setSelectedGeneration(null);
      setSearchParams({});
    } else {
      setSelectedGeneration(gen);
      setSearchParams({ generation: gen.toString() });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            搜索战机
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-military-800/50 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all"
            >
              <Filter className="w-4 h-4" />
              筛选
            </button>
          </div>
        </div>

        {/* Generation Filter */}
        {showFilters && (
          <div className="mb-6 p-4 bg-military-800/30 rounded-lg border border-gray-800 animate-fade-in">
            <p className="text-sm text-gray-400 mb-3">选择代际：</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(generationNames) as unknown as Generation[]).map((gen) => (
                <button
                  key={gen}
                  onClick={() => handleGenerationClick(gen)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedGeneration === gen
                      ? 'bg-military-accent/20 border-military-accent text-military-accent'
                      : 'bg-military-800/50 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {generationNames[gen]}
                </button>
              ))}
              {selectedGeneration && (
                <button
                  onClick={() => {
                    setSelectedGeneration(null);
                    setSearchParams({});
                  }}
                  className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  清除筛选
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            共找到 <span className="text-white font-semibold">{filteredAircraft.length}</span> 款战机
            {selectedGeneration && (
              <span className="ml-2 text-military-accent">
                （{generationNames[selectedGeneration]}）
              </span>
            )}
          </p>
        </div>

        {filteredAircraft.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">未找到匹配的战机</p>
            <p className="text-gray-600 text-sm mt-2">请尝试调整搜索条件</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAircraft.map((aircraft) => (
              <AircraftCard key={aircraft.id} aircraft={aircraft} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
