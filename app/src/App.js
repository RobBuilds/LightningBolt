import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />

      <div className="app-container">
        <SearchComponent />
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

