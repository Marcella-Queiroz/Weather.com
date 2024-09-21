import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const WeatherCharts = ({ weatherData }) => {
  if (!weatherData) return null;

  const hours = weatherData.forecast.forecastday[0].hour.map((hour) => hour.time.split(' ')[1]);
  const temperatures = weatherData.forecast.forecastday[0].hour.map((hour) => hour.temp_c);

  const data = {
    labels: hours,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temperatures,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora do Dia',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperatura (°C)',
        },
      },
    },
  };

  return (
    <div className="weather-chart-container">
      <h2>Gráfico de Temperatura</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherCharts;
