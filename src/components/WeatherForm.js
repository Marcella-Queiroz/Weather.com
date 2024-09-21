import React, { useState } from 'react';
import '../styles/App.css';

const cidadesPorEstado = {
  'Acre': ['Rio Branco', 'Cruzeiro do Sul'],
  'Alagoas': ['Maceió', 'Arapiraca'],
  'Amapá': ['Macapá', 'Santana'],
  'Amazonas': ['Manaus', 'Parintins'],
  'Bahia': ['Salvador', 'Feira de Santana'],
  'Ceará': ['Fortaleza', 'Juazeiro do Norte'],
  'Distrito Federal': ['Brasília'],
  'Espírito Santo': ['Vitória', 'Vila Velha'],
  'Goiás': ['Goiânia', 'Anápolis'],
  'Maranhão': ['São Luís', 'Imperatriz'],
  'Mato Grosso': ['Cuiabá', 'Várzea Grande'],
  'Mato Grosso do Sul': ['Campo Grande', 'Dourados'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlândia'],
  'Pará': ['Belém', 'Ananindeua'],
  'Paraíba': ['João Pessoa', 'Campina Grande'],
  'Paraná': ['Curitiba', 'Maringá'],
  'Pernambuco': ['Recife', 'Olinda'],
  'Piauí': ['Teresina', 'Parnaíba'],
  'Rio de Janeiro': ['Rio de Janeiro', 'Niterói'],
  'Rio Grande do Norte': ['Natal', 'Mossoró'],
  'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul'],
  'Rondônia': ['Porto Velho', 'Ji-Paraná'],
  'Roraima': ['Boa Vista'],
  'Santa Catarina': ['Florianópolis', 'Joinville'],
  'São Paulo': ['São Paulo', 'Campinas'],
  'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro'],
  'Tocantins': ['Palmas', 'Araguaína']
};

const API_KEY = '59615dbc619443e19d7223905242208';
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

const WeatherForm = ({ setWeatherData, setError, error }) => {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const handleEstadoChange = (e) => {
    const estadoSelecionado = e.target.value;
    setEstado(estadoSelecionado);
    setCidade(cidadesPorEstado[estadoSelecionado] || []);
    setCidadeSelecionada('');
    setWeatherData(null);
  };

  const handleCidadeChange = (e) => {
    setCidadeSelecionada(e.target.value);
  };

  const handleBuscarClima = async () => {
    if (!cidadeSelecionada) return;

    setLocalLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${cidadeSelecionada}&days=1`);
      if (!response.ok) {
        throw new Error('Erro ao buscar informações climáticas');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Weather.com</h1>
      <select value={estado} onChange={handleEstadoChange}>
        <option value="">Selecione um Estado</option>
        {Object.keys(cidadesPorEstado).map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>
      <select value={cidadeSelecionada} onChange={handleCidadeChange} disabled={!estado}>
        <option value="">Selecione uma Cidade</option>
        {cidade.map((cidade) => (
          <option key={cidade} value={cidade}>
            {cidade}
          </option>
        ))}
      </select>
      <button onClick={handleBuscarClima} disabled={localLoading}>
        {localLoading ? 'Buscando...' : 'Buscar Clima'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherForm;
