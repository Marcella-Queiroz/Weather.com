import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import '../styles/App.css';

const API_KEY = '59615dbc619443e19d7223905242208';
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

const WeatherAlerts = ({ weatherData }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (weatherData) {
      const fetchForecast = async () => {
        try {
          const response = await axios.get(`${API_URL}?key=${API_KEY}&q=${weatherData.location.name}&days=3`);
          setForecast(response.data.forecast.forecastday);
        } catch (error) {
          console.error('Error fetching the weather forecast:', error);
        }
      };

      fetchForecast();
    }
  }, [weatherData]);

  if (!weatherData) return null;

  const { current } = weatherData;
  const windSpeed = current.wind_kph;
  const temperature = current.temp_c;

  const beaufortScale = [
    { max: 1, description: 'Calmo' },
    { max: 5, description: 'Brisa leve' },
    { max: 11, description: 'Brisa suave' },
    { max: 19, description: 'Brisa moderada' },
    { max: 28, description: 'Brisa fresca' },
    { max: 38, description: 'Vento fresco' },
    { max: 49, description: 'Vento forte' },
    { max: 61, description: 'Ventania' },
    { max: 74, description: 'Ventania forte' },
    { max: 88, description: 'Tempestade' },
    { max: 102, description: 'Tempestade violenta' },
    { max: 117, description: 'Furacão' },
  ];

  const windAlert = beaufortScale.find(scale => windSpeed <= scale.max);
  const temperatureAlert = temperature > 35 ? 'Alerta de altas temperaturas' : null;

  const conditionTranslations = {
    'Sunny': 'Ensolarado',
    'Partly Cloudy': 'Parcialmente nublado',
    'Cloudy': 'Nublado',
    'Overcast': 'Encoberto',
    'Mist': 'Névoa',
    'Patchy rain possible': 'Possibilidade de chuva irregular',
    'Thundery outbreaks possible': 'Possibilidade de trovoadas',
    'Blowing snow': 'Neve soprando',
    'Blizzard': 'Nevasca',
    'Fog': 'Nevoeiro',
    'Freezing fog': 'Nevoeiro congelante',
    'Patchy light drizzle': 'Garoa leve irregular',
    'Light drizzle': 'Garoa leve',
    'Freezing drizzle': 'Garoa congelante',
    'Heavy freezing drizzle': 'Garoa congelante forte',
    'Patchy light rain': 'Chuva leve irregular',
    'Light rain': 'Chuva leve',
    'Moderate rain at times': 'Chuva moderada ocasional',
    'Moderate rain': 'Chuva moderada',
    'Heavy rain at times': 'Chuva forte ocasional',
    'Heavy rain': 'Chuva forte',
    'Light freezing rain': 'Chuva congelante leve',
    'Moderate or heavy freezing rain': 'Chuva congelante moderada ou forte',
    'Light sleet': 'Granizo leve',
    'Moderate or heavy sleet': 'Granizo moderado ou forte',
    'Patchy light snow': 'Neve leve irregular',
    'Light snow': 'Neve leve',
    'Patchy moderate snow': 'Neve moderada irregular',
    'Moderate snow': 'Neve moderada',
    'Patchy heavy snow': 'Neve forte irregular',
    'Heavy snow': 'Neve forte',
    'Ice pellets': 'Pelotas de gelo',
    'Light rain shower': 'Pancada de chuva leve',
    'Moderate or heavy rain shower': 'Pancada de chuva moderada ou forte',
    'Torrential rain shower': 'Pancada de chuva torrencial',
    'Light sleet showers': 'Pancadas de granizo leve',
    'Moderate or heavy sleet showers': 'Pancadas de granizo moderado ou forte',
    'Light snow showers': 'Pancadas de neve leve',
    'Moderate or heavy snow showers': 'Pancadas de neve moderada ou forte',
    'Light showers of ice pellets': 'Pancadas de pelotas de gelo leve',
    'Moderate or heavy showers of ice pellets': 'Pancadas de pelotas de gelo moderada ou forte',
    'Patchy light rain with thunder': 'Chuva leve irregular com trovoadas',
    'Moderate or heavy rain with thunder': 'Chuva moderada ou forte com trovoadas',
    'Patchy light snow with thunder': 'Neve leve irregular com trovoadas',
    'Moderate or heavy snow with thunder': 'Neve moderada ou forte com trovoadas',
    'Patchy rain nearby': 'Chuva irregular nas proximidades'
  };

  return (
    <div className="weather-alerts">
      {windAlert && <p className="alerta-ventania">Alerta de ventania: {windAlert.description}</p>}
      {<h3 className="forecastText">Previsão para os Próximos Dias</h3>}
      {temperatureAlert && <p>{temperatureAlert}</p>}
      {forecast && (
        <div className="forecast-container">
          {forecast.map(day => (
            <div key={day.date} className="forecast-day">
              <p><strong>Data:</strong> {format(new Date(day.date), 'dd/MM/yyyy', { locale: ptBR })}</p>
              <p><strong>Máxima:</strong> {day.day.maxtemp_c}°C</p>
              <p><strong>Mínima:</strong> {day.day.mintemp_c}°C</p>
              <p><strong>Condição:</strong> {conditionTranslations[day.day.condition.text] || day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherAlerts;
