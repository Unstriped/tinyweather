import React from "react";
import { Weather } from "../types/weather-types";

interface WeatherProps {
  weather: Weather;
}

// Shows weather information and an matching image
const CurrentWeather: React.FC<WeatherProps> = ({ weather }) => {
  return (
    <>
      <div className="flex -ml-4">
        <img src={weather.condition.icon} alt={weather.condition.text} />
        <span className="text-4xl mt-2 mr-2 flex">
          {weather.temp_c}
          <span className="text-sm">°C</span>
        </span>
        <ul className="text-xs mt-2">
          <li>Wind Speed: {weather.wind_kph} km/h</li>
          <li>Humidity {weather.humidity}</li>
        </ul>
      </div>
      <p className="-mt-2 text-sm">{weather.condition.text}</p>
    </>
  );
};

export default CurrentWeather;
