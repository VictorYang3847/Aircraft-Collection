import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import AircraftList from '@/pages/AircraftList';
import AircraftDetail from '@/pages/AircraftDetail';
import QuizPage from '@/pages/QuizPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-military-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aircraft" element={<AircraftList />} />
          <Route path="/aircraft/:id" element={<AircraftDetail />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
