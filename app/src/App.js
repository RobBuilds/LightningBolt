import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="app-container">
        <SearchComponent />
      </div>
    </div>
  );
}

export default App;
