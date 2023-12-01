import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
//import './Weather.css'; // Import the stylesheet

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('Toronto');

  useEffect(() => {
    const apiKey = 'ca60c5defb80ab9544d53a642b9ce06f';

    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [searchCity]);

  const handleSearch = (newCity) => {
    setSearchCity(newCity);
  };

  return (
    <div className="weather-container">
      <h2>Weather Information</h2>

      <SearchBar onSearch={handleSearch} />

      {weatherData && (
        <div className="weather-details">
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>Temperature: {weatherData.main.temp} &#176;C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
