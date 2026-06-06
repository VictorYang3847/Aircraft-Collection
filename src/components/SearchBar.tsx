import { Search } from 'lucide-react';
import { useAircraftStore } from '@/store/aircraftStore';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useAircraftStore();

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="搜索机型、国家、制造商..."
        className="w-full pl-10 pr-4 py-3 bg-military-800/50 border border-gray-700 rounded-lg
                   text-gray-200 placeholder-gray-500
                   focus:outline-none focus:border-military-accent focus:ring-1 focus:ring-military-accent/30
                   transition-all"
      />
    </div>
  );
}
