import React, { useState } from 'react';
import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();

  const handleAboutOpen = () => {
    setAboutOpen(true);
  };

  const handleAboutClose = () => {
    setAboutOpen(false);
    navigate('/');
  };

  const handleContactOpen = () => {
    setContactOpen(true);
  };

  const handleContactClose = () => {
    setContactOpen(false);
    navigate('/');
  };

  return (
    <div className="App">
      <NavBar onAboutClick={handleAboutOpen} onContactClick={handleContactOpen} />

      <div className="app-container">
        <SearchComponent />
        <Routes>
          <Route path="/contact" element={<div />} />
          <Route path="/about" element={<div />} />
        </Routes>
      </div>

      <AboutPage open={aboutOpen} handleClose={handleAboutClose} />
      <ContactPage open={contactOpen} onClose={handleContactClose} />
    </div>
  );
}

export default App;

//python3 ./sf.py -l  127.0.0.1:5001