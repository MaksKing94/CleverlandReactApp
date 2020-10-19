import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route, useRouteMatch } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';

import { Mycities } from './mycities';
import { SelectedCity } from './selectedCity';

import './weather.css';

export const Weather = () => {
  const [city, setCity] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [isError, setIsError] = useState(false);
  const [myCities, setCities] = useState([{ cityName: 'Орша', key: 'Orsha' }])

  const onCityChange = (event) => (setCity(event.target.value))

  const onShowClick = async () => {
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
  };

  const onFavButtonClick = () => {
    let cityContain = false;
    myCities.forEach(item => {
      if (item.cityName === city) cityContain = true;
    });
    if (!cityContain) {
      let item = {
        cityName: city,
        key: weather.name,
      };
      setCities([...myCities, item]);
    };
    setIsLoaded(false);
    setCity('');
  }

  const deleteCity = (key) => {
    const filteredCities = myCities.filter(item => item.key !== key);
    setCities(filteredCities);
  };

  let match = useRouteMatch();

  return (
    <div className="Weather">
      <div className="current-weather">
        <TextField
          value={city}
          onChange={onCityChange}
          placeholder="Город"
          id="outlined-helperText"
          helperText="Введите название города"
          variant="outlined"
        />
        <Button onClick={onShowClick} variant="contained" color="primary">Показать погоду</Button>
        {isLoading && (<CircularProgress />)}
        {isLoaded && !isError && (
          <div className='city-wether'>
            <div>Температура в {weather.name}: {weather.main.temp} &deg;C</div>
            <div>Скорость ветра: {weather.wind.speed} м/с</div>
            <div>Влажность: {weather.main.humidity} %</div>
            <div>Давление: {weather.main.pressure} hPa</div>
            <Button onClick={onFavButtonClick} variant="contained" color="secondary">Добавить в избранные</Button>
          </div>
        )}
        {isError && (<div>Произошла ошибка</div>)}
      </div>
      <div className="cities-list">
        <h3>Список избранных городов</h3>
        <Mycities myCities={myCities} deleteCity={deleteCity} onShowClick={onShowClick} />
      </div>
      <div>
        <Route path={`${match.path}/:city`}>
          <SelectedCity />
        </Route>
      </div>
    </div>
  );
}