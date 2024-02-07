import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import NavBar from './components/NavBar';
import ScrapeComponent from './components/ScrapeComponent';

function App() {
  return (
    <div className="App">
      <NavBar />

      <div className="app-container">
        <SearchComponent />
      </div>

      <ScrapeComponent />

    </div>
  );
}

export default App;
