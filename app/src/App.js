import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from './src/components/NavBar';
import AboutPage from './src/components/AboutPage'
import ContactPage from './src/components/ContactPage'

function App() {
  return (
    <Router>
    <NavigationMenu />
    <Routes>
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      {/* Add more routes as needed */}
      <Route path="/" exact> {/* Default or Home page content here */}</Route>
    </Routes>
  </Router>
  );
}

export default App;
