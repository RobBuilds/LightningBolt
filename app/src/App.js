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

  // When the About button is clicked, the AboutPage component is displayed
  const handleAboutOpen = () => {
    setAboutOpen(true);
  };

  // When the AboutPage component is closed, the user is navigated back to the home page
  const handleAboutClose = () => {
    setAboutOpen(false);
    navigate('/');
  };

  // When the Contact button is clicked, the ContactPage component is displayed
  const handleContactOpen = () => {
    setContactOpen(true);
  };

  // When the ContactPage component is closed, the user is navigated back to the home page
  const handleContactClose = () => {
    setContactOpen(false);
    navigate('/');
  };

  return (
    <div className="App">
<div style={{ position: 'fixed', width: '100%', height: '100%' }}>
  <NavBar onAboutClick={handleAboutOpen} onContactClick={handleContactOpen} />
  <SearchComponent />
</div>
      <div className="app-container">

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