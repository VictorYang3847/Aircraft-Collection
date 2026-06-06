import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAircraftStore } from '@/store/aircraftStore';
import { generationNames } from '@/data/aircraftData';
import PerformanceTable from '@/components/PerformanceTable';
import PhotoGallery from '@/components/PhotoGallery';
import { ArrowLeft, Globe, Factory, Calendar, Shield, AlertTriangle, Rocket } from 'lucide-react';

export default function AircraftDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAircraftById, allAircraft } = useAircraftStore();
  
  const aircraft = id ? getAircraftById(id) : undefined;

  const relatedAircraft = aircraft
    ? allAircraft.filter(a => a.generation === aircraft.generation && a.id !== aircraft.id).slice(0, 5)
    : [];

  if (!aircraft) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">未找到该战机</h2>
          <Link to="/aircraft" className="btn-primary inline-flex">
            返回战机列表
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = {
    '服役中': { color: 'text-green-400', bg: 'bg-green-900/30', icon: <Shield className="w-4 h-4" /> },
    '已退役': { color: 'text-gray-400', bg: 'bg-gray-800/50', icon: <AlertTriangle className="w-4 h-4" /> },
    '研发中': { color: 'text-blue-400', bg: 'bg-blue-900/30', icon: <Rocket className="w-4 h-4" /> },
  };

  const status = statusConfig[aircraft.status];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="badge bg-military-accent/90 text-white">
              {generationNames[aircraft.generation]}
            </span>
            <span className={`badge border ${status.bg} ${status.color}`}>
              {status.icon}
              <span className="ml-1">{aircraft.status}</span>
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">
            {aircraft.name}
          </h1>
          <p className="text-xl text-gray-500">{aircraft.nameEn}</p>
          
          <p className="text-gray-400 mt-6 max-w-3xl leading-relaxed">
            {aircraft.description}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="flex items-center gap-4 p-4 bg-military-800/50 rounded-lg border border-gray-700/50">
            <div className="w-10 h-10 rounded-lg bg-military-accent/20 flex items-center justify-center text-military-accent">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">国家</p>
              <p className="text-sm font-semibold text-white">{aircraft.country}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-military-800/50 rounded-lg border border-gray-700/50">
            <div className="w-10 h-10 rounded-lg bg-military-accent/20 flex items-center justify-center text-military-accent">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">制造商</p>
              <p className="text-sm font-semibold text-white">{aircraft.manufacturer}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-military-800/50 rounded-lg border border-gray-700/50">
            <div className="w-10 h-10 rounded-lg bg-military-accent/20 flex items-center justify-center text-military-accent">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">首飞 / 服役</p>
              <p className="text-sm font-semibold text-white">
                {aircraft.firstFlight} / {aircraft.serviceEntry}
              </p>
            </div>
          </div>
        </div>

        {/* Service Timeline */}
        <div className="mb-10 p-6 bg-military-800/30 rounded-xl border border-gray-800">
          <h3 className="font-display text-lg font-bold text-white mb-4">服役时间线</h3>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-military-accent" />
              <div>
                <p className="text-xs text-gray-500">首飞时间</p>
                <p className="text-sm text-white">{aircraft.firstFlight}</p>
              </div>
            </div>
            <div className="w-12 h-px bg-gray-700" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div>
                <p className="text-xs text-gray-500">服役时间</p>
                <p className="text-sm text-white">{aircraft.serviceEntry}</p>
              </div>
            </div>
            {aircraft.退役Date && (
              <>
                <div className="w-12 h-px bg-gray-700" />
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">退役时间</p>
                    <p className="text-sm text-gray-400">{aircraft.退役Date}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-10">
          <h3 className="font-display text-2xl font-bold text-white mb-6">多角度视图</h3>
          <PhotoGallery photos={aircraft.photos} name={aircraft.name} />
        </div>

        {/* Performance Parameters */}
        <div className="mb-10">
          <h3 className="font-display text-2xl font-bold text-white mb-6">性能参数</h3>
          <PerformanceTable performance={aircraft.performance} />
        </div>

        {/* Related Aircraft */}
        {relatedAircraft.length > 0 && (
          <div className="mb-10">
            <h3 className="font-display text-xl font-bold text-white mb-4">同代战机</h3>
            <div className="flex flex-wrap gap-2">
              {relatedAircraft.map(a => (
                <Link
                  key={a.id}
                  to={`/aircraft/${a.id}`}
                  className="px-4 py-2 bg-military-800/50 border border-gray-700 rounded-lg text-gray-300 hover:border-military-accent hover:text-military-accent transition-all"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
