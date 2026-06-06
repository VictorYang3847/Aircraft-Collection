import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import AircraftList from '@/pages/AircraftList';
import AircraftDetail from '@/pages/AircraftDetail';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-military-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aircraft" element={<AircraftList />} />
          <Route path="/aircraft/:id" element={<AircraftDetail />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
