import { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorNotification from './ErrorNotification';

const WeatherData = ({ latlng, header }) => {
    
    const [temp, setTemp] = useState(null);
    const [wind, setWind] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [errorWeather, setErrorWeather] = useState(null);
    
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const longitude = latlng[1];
    const latitude = latlng[0];  

    useEffect(() => {

        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
          .then(response => {
            
            const temperature = (response.data.main.temp - 273).toFixed(2);
            setTemp(temperature);
            
            const windSpeed = response.data.wind.speed;
            setWind(windSpeed);
            
            const iconCode = response.data.weather[0].icon;
            setWeatherIcon(iconCode);
        })
        .catch(error => {
            setErrorWeather('Weather data has failed to load. Please try again later.')
        })

    }, []);

    
    return (
        <div>
            <h2>Weather in {header}</h2>   
            <ErrorNotification message={errorWeather} />
            <p><strong>Temperature </strong>{temp} °Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} />
            <p><strong>Wind</strong> {wind} m/s</p>

        </div>

    );
};

export default WeatherData;