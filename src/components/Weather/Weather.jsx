import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./index.css";
const API_KEY = "4de595961f2877ca4e2a38d1220da813";

const WeatherMenu = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("YourCityName");
  const [isValidCity, setIsValidCity] = useState(true); // Added state to track city validity

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (response.status === 200) {
        setWeatherData(response.data);
        setIsValidCity(true);
      } else {
        setIsValidCity(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsValidCity(false);
    }
  };

  useEffect(() => {
    if (isValidCity) {
      fetchData();
      const interval = setInterval(fetchData, 300000);
      return () => clearInterval(interval);
    }
  }, [cityName, isValidCity]);

  const renderWeatherData = () => {
    if (!isValidCity)
      return <div className="loading">Please enter a valid city name</div>;

    if (!weatherData)
      return <div className="loading">Search the name of any city</div>;

    const dailyData = weatherData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    return dailyData.map((day) => (
      <div key={day.dt} className="weather-card">
        <h3 style={{textAlign: "left"}}>{cityName}'s Weather!</h3>
        <h2>{moment(day.dt_txt).format("dddd")}</h2>
        <p>Temperature: {day.main.temp} °C</p>
        <p>Humidity: {day.main.humidity}%</p>
        <p>Wind Speed: {day.wind.speed} m/s</p>
        <img
          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
          alt={day.weather[0].description}
        />
      </div>
    ));
  };

  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };



  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="weather-menu">
      <h1 className="headingforecast">5 DAYS WEATHER FORECAST</h1>
      <div className="search-container">
        <input
          id="inputweather"
          type="text"
          placeholder="Enter city name"
          onChange={handleCityChange}
        />
        <button className="buttonweather" onClick={handleSearch}>Search</button>
      </div>
      <div className="cards-container">{renderWeatherData()}</div>
    </div>
  );
};

export default WeatherMenu;
