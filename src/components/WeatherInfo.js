import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current, forecast } = weatherData;
  const today = forecast.forecastday[0];

  return (
    <div>
      <h2>Informações Climáticas</h2>
      <p><strong>Temperatura Atual:</strong> {current.temp_c}°C</p>
      <p><strong>Temperatura Máxima:</strong> {today.day.maxtemp_c}°C</p>
      <p><strong>Temperatura Mínima:</strong> {today.day.mintemp_c}°C</p>
      <p><strong>Umidade:</strong> {current.humidity}%</p>
      <p><strong>Precipitação:</strong> {today.day.totalprecip_mm} mm</p>
      <p><strong>Nuvens:</strong> {current.cloud}%</p>
      <p><strong>Índice UV:</strong> {current.uv}</p>
      <p><strong>Nascer do Sol:</strong> {today.astro.sunrise}</p>
      <p><strong>Pôr do Sol:</strong> {today.astro.sunset}</p>
    </div>
  );
};

export default WeatherInfo;
