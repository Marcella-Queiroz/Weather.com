import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './styles/App.css';
import WeatherCharts from './components/WeatherChart.js';
import WeatherInfo from './components/WeatherInfo.js';
import WeatherForm from './components/WeatherForm.js';
import Map from './components/Map.js';
import WeatherAlerts from './components/WeatherAlerts.js';
import Capitals from './pages/Capitals.js';
import { useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Router>
      <WeatherForm setWeatherData={setWeatherData} setLoading={setLoading} setError={setError} />
      <div className="grid-container">
        {error && <p>{error}</p>}
        {weatherData && (
          <>
            <div className="card"><WeatherInfo weatherData={weatherData} /></div>
            <div className="card"><WeatherCharts weatherData={weatherData} /></div>
            <div className="card"><Map location={weatherData.location} /></div>
            <div className="weather-alerts-container"><WeatherAlerts weatherData={weatherData} /></div>
          </>
        )}
      </div>
      {weatherData && (
        <div className="navigation">
          <Link to="/capitals">
            <button>Capitais</button>
          </Link>
        </div>
      )}
      <Routes>
        <Route path="/capitals" element={<Capitals />} />
      </Routes>
    </Router>
  );
}

export default App;
