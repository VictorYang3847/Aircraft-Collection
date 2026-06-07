import { Link, useLocation } from 'react-router-dom';
import { Plane, Search, Gamepad2 } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-military-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <Plane className="w-8 h-8 text-military-accent group-hover:rotate-[-12deg] transition-transform duration-300" />
            <div>
              <h1 className="font-display text-xl font-bold text-white tracking-wider">
                战斗机图鉴
              </h1>
              <p className="text-xs text-gray-500 -mt-1 hidden sm:block">GLOBAL FIGHTER JET DATABASE</p>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-military-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              首页
            </Link>
            <Link
              to="/aircraft"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                location.pathname.startsWith('/aircraft')
                  ? 'text-military-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              搜索战机
            </Link>
            <Link
              to="/quiz"
              className={`flex items-center gap-2 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                location.pathname === '/quiz'
                  ? 'text-orange-400 bg-orange-400/10'
                  : 'text-gray-400 hover:text-white hover:bg-military-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              猜战机
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
