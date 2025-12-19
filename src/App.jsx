
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IPO from './components/ipo-page';
import IPODetailsPage from './components/ipo-details-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IPO />} />
        <Route path="/ipo/:ipoId" element={<IPODetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

