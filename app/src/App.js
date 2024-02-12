// App.js
import React, { useState } from 'react';
import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import DatabaseFetch from './components/DatabaseFetch';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SearchAddress from './components/EmailSearch'

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
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
      <NavBar
        onAboutClick={handleAboutOpen}
        onContactClick={handleContactOpen}
        onDatabaseClick={() => navigate('/database')}
        onEmailClick={() => navigate('/emailsearch')}
      />
      <SearchComponent />
      <div className="app-container">
        <Routes>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/database" element={<DatabaseFetch />} />
          <Route path="/emailsearch" element={<SearchAddress />} />
        </Routes>
      </div>
      <AboutPage open={aboutOpen} handleClose={handleAboutClose} />
      <ContactPage open={contactOpen} onClose={handleContactClose} />
    </div>
  );
}

export default App;