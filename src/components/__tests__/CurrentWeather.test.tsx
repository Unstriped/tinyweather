import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import CurrentWeather from "../CurrentWeather";
import { Weather } from "../../types/weather-types";

describe("Test if the LocationInput component is working as expected", () => {
  const weather = {
    condition: {
      text: "windy",
      icon: "//cdn.weatherapi.com/weather/64x64/night/116.png",
    },
    temp_c: 25.6,
    wind_kph: 16.9,
    humidity: 4,
  } as Weather;

  it("<CurrentWeather /> matches snapshot", () => {
    const component = render(<CurrentWeather weather={weather} />);
    expect(component.container).toMatchSnapshot();
  });

  it("<CurrentWeather /> renders without exploding", () => {
    const component = render(<CurrentWeather weather={weather} />);
    expect(component.getByText("Wind Speed: 16.9 km/h")).toBeInTheDocument();
  });
});
