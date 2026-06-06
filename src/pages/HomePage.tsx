import { Link } from 'react-router-dom';
import GenerationNav from '@/components/GenerationNav';
import AircraftCard from '@/components/AircraftCard';
import { useAircraftStore } from '@/store/aircraftStore';
import { ArrowRight, Plane } from 'lucide-react';

export default function HomePage() {
  const { allAircraft } = useAircraftStore();

  // Get featured aircraft (latest generation)
  const featured = allAircraft
    .filter(a => a.generation === 5)
    .slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-military-900 via-military-800/50 to-military-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(194, 65, 12, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Plane className="w-20 h-20 text-military-accent mx-auto mb-8" />
            <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-4 tracking-wider">
              战斗机图鉴
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-2 font-light">
              GLOBAL FIGHTER JET DATABASE
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              从第一代到第六代，探索全球主流战斗机的性能参数与历史沿革
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/aircraft" className="btn-primary flex items-center gap-2 justify-center">
              浏览全部战机
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/aircraft?generation=5" className="btn-secondary">
              查看五代机
            </Link>
          </div>
        </div>
      </section>

      {/* Generation Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            按代际浏览
          </h2>
          <p className="text-gray-400">
            从早期喷气机到未来隐身战机，了解战斗机发展的六个时代
          </p>
        </div>
        <GenerationNav showAll />
      </section>

      {/* Featured Aircraft */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              第五代隐身战机
            </h2>
            <p className="text-gray-400">当代空中优势的核心力量</p>
          </div>
          <Link
            to="/aircraft?generation=5"
            className="flex items-center gap-2 text-military-accent hover:underline"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {featured.map((aircraft) => (
            <AircraftCard key={aircraft.id} aircraft={aircraft} />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-military-800/30 rounded-xl border border-gray-800">
            <div className="font-display text-4xl font-black text-military-accent">
              {allAircraft.length}+
            </div>
            <div className="text-sm text-gray-400 mt-2">收录战机</div>
          </div>
          <div className="text-center p-6 bg-military-800/30 rounded-xl border border-gray-800">
            <div className="font-display text-4xl font-black text-military-accent">6</div>
            <div className="text-sm text-gray-400 mt-2">代际覆盖</div>
          </div>
          <div className="text-center p-6 bg-military-800/30 rounded-xl border border-gray-800">
            <div className="font-display text-4xl font-black text-military-accent">
              {new Set(allAircraft.map(a => a.country)).size}+
            </div>
            <div className="text-sm text-gray-400 mt-2">国家/地区</div>
          </div>
          <div className="text-center p-6 bg-military-800/30 rounded-xl border border-gray-800">
            <div className="font-display text-4xl font-black text-military-accent">10+</div>
            <div className="text-sm text-gray-400 mt-2">性能参数</div>
          </div>
        </div>
      </section>
    </div>
  );
}
