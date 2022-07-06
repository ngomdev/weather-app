import React, { useState } from 'react';
import './App.css';

function App() {
  const [weather, setweather] = useState({});
  const [city, setcity] = useState('');
  const apiKey = "a8e575dd367353704544e80de9e155c5";

  const getWeather = (e) => {
    if (e.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setweather(result);
          setcity('');
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "Jun", "July",
      "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    return `${day} ${date} ${month}, ${year}`
  }

  return (
    <div className="App">
      <div className="container">
        <h2 className="text">Weather App🌤️</h2>
        <input type="text"
          placeholder='Seach for a city....'

          onChange={(e) => setcity(e.target.value)}
          onKeyPress={getWeather}




        />
        <div className='date'><i class="fa-solid fa-calendar-days"></i>{dateBuilder(new Date())}</div>
        {
          typeof weather.main != "undefined" ?
            (
              <div className="weather-container">
                <div className="location">
                  <i class="fa-solid fa-city"></i>{weather.name}, {weather.sys.country}

                </div>
                <div className="temp">
                  <i class="fa-solid fa-sun"></i>{Math.round(weather.main.temp)} °C
                </div>
                <div className="weather">
                  <i class="fa-solid fa-cloud"></i>{weather.weather[0].main}
                </div>
                <div className="wind">
                  <i class="fa-solid fa-wind"></i>{weather.wind.speed} m/s
                </div>
              </div>)

            :
            (
              <div className="weather-container">
                <h2 className='text-1'>Welcome to weather app 😉</h2>
              </div>

            )


        }




      </div>

    </div>
  );
}

export default App;
