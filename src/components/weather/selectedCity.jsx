import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

export const SelectedCity = () => {
  let { city } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4a3e13f259dfdbd23f06c3973018636&units=metric`);
        const cityWeather = await response.json();
        setIsLoading(false);
        if (cityWeather.cod === '404') {
          setIsLoaded(false);
          throw new Error("Данные некорректны");
        }
        setWeather(cityWeather);
        setIsLoaded(true);
      } catch (err) {
        setIsError(true);
      }
    })();
  }, [city]);

  return (
    <div className="selectedCity">
      <h3>Погода в городе</h3>
      { isLoading && (<CircularProgress />)}
      { isLoaded && !isError && (
        <div className='city-wether'>
          <div>Температура в {weather.name}: {weather.main.temp} &deg;C</div>
          <div>Скорость ветра: {weather.wind.speed} м/с</div>
          <div>Влажность: {weather.main.humidity} %</div>
          <div>Давление: {weather.main.pressure} hPa</div>
        </div>
      )}
      { isError && (<div>Произошла ошибка</div>)}
    </div>
  )
}
