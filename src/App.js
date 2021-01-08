import React, {useState, useEffect} from 'react';
import './App.css';

const api = {
  key: '3a05794c41c6620fe2db9b4e37e53930',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'

}


function App() {

const [query, setQuery] = useState('');
const [weather, setWeather] = useState({});

const search = evt => {
  if(evt.key === 'Enter'){
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setQuery('');console.log(result);
      setWeather(result)});
      
  }
}


  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo-Feira", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado-Feira"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day},  ${date} de ${month}, ${year} `
  }



  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      
     { /* <h2>Header</h2>
      <h1>ClimaVis</h1>*/} 
      <main>
        <div className='search-box'>
          <input type='text' className='search-bar' placeholder='Pesquise uma cidade!'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          >
          </input>
          
        </div>
        {(typeof weather.main != 'undefined') ? (
            <div>
              <div className='location-box'>
          <div className='location'>
          {weather.name} - {weather.sys.country}
        <div className='date'>
          {dateBuilder(new Date())}
        </div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
             {Math.round(weather.main.temp)}
            </div>
            <div className='weather'>
              {weather.weather[0].main}
            </div>
          </div>

        </div>
            </div>


        ) : ('')}
       {/* <div className='location-box'>
          <div className='location'>
          {weather.name}
        <div className='date'>
          {dateBuilder(new Date())}
        </div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              15°C
            </div>
            <div className='weather'>
              Ensolarado
            </div>
          </div>

        </div> */}  

      </main>
    </div>
  );
}

export default App;
