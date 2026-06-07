import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GenerationNav from '@/components/GenerationNav';
import AircraftCard from '@/components/AircraftCard';
import { useAircraftStore } from '@/store/aircraftStore';
import { ArrowRight, Plane, Zap, Trophy } from 'lucide-react';

export default function HomePage() {
  const { allAircraft } = useAircraftStore();
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('quiz-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

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

          {/* Quiz module entry */}
          <div className="mt-8">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl text-orange-400 hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-500/50 transition-all duration-200 group"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold">猜战机挑战</span>
              <span className="text-sm text-military-400 hidden sm:inline">· 看图片识别战斗机</span>
              <Trophy className="w-4 h-4 ml-2 opacity-50" />
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
        {/* Quiz teaser */}
        <div className="mb-16">
          <Link
            to="/quiz"
            className="block group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/20 p-8 hover:border-orange-500/40 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    🎮 猜战机挑战
                  </h3>
                  <p className="text-gray-400">
                    看图片识别战斗机，每轮 10 题，限时 15 秒。测测你的军事知识！
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <span className="text-sm text-military-400">最高分</span>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-xl font-bold text-yellow-400">{highScore}</span>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-orange-400 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>

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
