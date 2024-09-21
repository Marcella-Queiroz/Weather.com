import React, { useEffect, useState } from 'react';
import '../styles/Capitals.css';

const capitals = [
  { name: 'Brasília', state: 'Distrito Federal' },
  { name: 'Maceió', state: 'Alagoas' },
  { name: 'Fortaleza', state: 'Ceará' },
  { name: 'Natal', state: 'Rio Grande do Norte' },
  { name: 'João Pessoa', state: 'Paraíba' },
  { name: 'Curitiba', state: 'Paraná' },
  { name: 'Cuiabá', state: 'Mato Grosso' },
  { name: 'Rio de Janeiro', state: 'Rio de Janeiro' },
  { name: 'São Paulo', state: 'São Paulo' },
  { name: 'Porto Alegre', state: 'Rio Grande do Sul' }
];

const API_KEY = '59615dbc619443e19d7223905242208';
const API_URL = 'https://api.weatherapi.com/v1/current.json';

const Capitals = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(
        capitals.map(async (capital) => {
          const response = await fetch(`${API_URL}?key=${API_KEY}&q=${capital.name}`);
          const result = await response.json();
          return {
            name: capital.name,
            state: capital.state,
            temperature: result.current.temp_c,
            time: result.location.localtime,
          };
        })
      );
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="capitals-container">
      <h1>Capitais e suas Informações Climáticas</h1>
      <ul>
        {weatherData.map((capital) => (
          <li key={capital.name}>
            <h2>{capital.name}, {capital.state}</h2>
            <p>Temperatura: {capital.temperature}°C</p>
            <p>Horário Atual: {capital.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Capitals;
