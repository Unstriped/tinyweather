import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import LocationInput from "../components/LocationForm";
import { useState } from "react";
import { Forecast } from "../types/forecast-types";
import { Location } from "../types/location-types";
import { Weather } from "../types/weather-types";
import WeatherBackground from "../components/WeatherBackground";
import CurrentWeather from "../components/CurrentWeather";
import CurrentLocation from "../components/CurrentLocation";
import LineChart from "../components/LineChart";
import { LocationContext } from "../context-provider";

const superSecretKey = process.env.GATSBY_MAP_KEY;

const IndexPage: React.FC<PageProps> = () => {
  // Loading is used to disable button while waiting for reply from backend
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationResult, setLocationResult] = useState<Location | null>(null);
  const [weatherResult, setWeatherResult] = useState<Weather | null>(null);
  const [forecastResult, setForecastResult] = useState<Forecast | null>(null);

  /* 
  Fetch weather data from WeatherApi.com
    Key is supplied through .env-file
    Call fetches Current weather as well as a 7 day forecast  and location data
  */
  async function fetchWeatherData(LocationInput: string) {
    setLoading(true);
    if (locationError) setLocationError(null);
    if (locationResult) setLocationResult(null);
    if (weatherResult) setWeatherResult(null);
    if (weatherResult) setForecastResult(null);

    if (!LocationInput) {
      setLoading(false);
      return;
    }

    const weatherURL = new URL(
      `http://api.weatherapi.com/v1/forecast.json?key=${superSecretKey}&q=${LocationInput}&days=7&aqi=no`
    );

    const result = await fetch(weatherURL).then((res) => res.json());

    if (result.error) setLocationError(result.error.message);
    else {
      setLocationResult(result.location);
      setWeatherResult(result.current);
      setForecastResult(result.forecast);
    }
    setLoading(false);
  }

  return (
    <main className="w-screen h-screen bg-base-100 relative flex flex-col px-4 items-center">
      <h1 className="main-title text-5xl md:text-7xl lg:text-9xl m-4 lg:mb-8 transition-all ease-in-out z-10">
        Tiny Weather
      </h1>
      {weatherResult && (
        <WeatherBackground imageLink={weatherResult.condition.icon} />
      )}
      <section className="card card-normal card-bordered bg-base-100 shadow-md w-full max-w-4xl">
        <div className="card-body">
          <LocationInput
            onInput={fetchWeatherData}
            disabled={loading}
            error={locationError}
          />
          {locationResult && (
            <LocationContext.Provider value={locationResult}>
              <div className="pl-4 mt-4">
                <div>
                  <CurrentLocation />
                  {weatherResult && <CurrentWeather weather={weatherResult} />}
                </div>
              </div>
            </LocationContext.Provider>
          )}
          {forecastResult?.forecastday &&
            forecastResult?.forecastday[0]?.hour && (
              <>
                <h2 className="ml-4 mt-4">Next Weeks Forecast</h2>
                <LineChart chartData={forecastResult.forecastday} />
              </>
            )}
        </div>
      </section>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <html lang="en" />
    <title>Tiny Weather</title>
  </>
);
