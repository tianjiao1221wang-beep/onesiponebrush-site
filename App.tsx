import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DIYKit from './pages/DIYKit';
import CultureLab from './pages/CultureLab';
import About from './pages/About';
import Contact from './pages/Contact';
import CulturalEventCuration from './pages/CulturalEventCuration';
import CuratedEventDetail from './pages/CuratedEventDetail';
import CulturalPopups from './pages/CulturalPopups';
import CurationWeddings from './pages/CurationWeddings';
import CurationSchools from './pages/CurationSchools';
import CurationBrandProduction from './pages/CurationBrandProduction';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-stone-200 selection:text-stone-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/diy-kit" element={<DIYKit />} />
            <Route path="/shop" element={<DIYKit />} />
            <Route path="/cultural-event-curation" element={<CulturalEventCuration />} />
            <Route path="/curated-events/:slug" element={<CuratedEventDetail />} />
            <Route path="/cultural-event-curation/popups" element={<CulturalPopups />} />
            <Route path="/cultural-event-curation/weddings" element={<CurationWeddings />} />
            <Route path="/cultural-event-curation/schools" element={<CurationSchools />} />
            <Route path="/cultural-event-curation/brand-production" element={<CurationBrandProduction />} />
            <Route path="/culture-lab" element={<CultureLab />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Navigate to="/contact" replace />} />
            <Route path="/checkout" element={<Navigate to="/contact" replace />} />
            <Route path="/checkout-success" element={<Navigate to="/shop" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
