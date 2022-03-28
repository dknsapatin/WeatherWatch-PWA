import React, { useState } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  // Search async function that calls another function- fetchWeather
  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
      console.log(data);
    }
  };

  return (
    <div className="main-container">
      {/* Input Search Box */}
      <input
        type="type"
        className="search"
        placeholder="Search a city"
        value={query}
        // onChange={(e) => setQuery(e.target.value)}
        onChange={queryChangeHandler}
        //If key that is pressed equals to "ENTER" call search function
        onKeyPress={search}
      />

      {/* If main property exists inside weather, Display  */}
      {weather.main && (
        // Display the city name
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          {/* Display The temperature of the city */}
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;F</sup>
          </div>
          {/* Displays Icon and description */}
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="high">
              <strong>High</strong> {weather.main.temp_max} deg
            </p>
            <p className="low">
              <strong>Low</strong> {weather.main.temp_min} deg
            </p>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
