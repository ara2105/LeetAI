import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import WeeklyReport from './pages/WeeklyReport';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/weekly-report" element={<WeeklyReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
