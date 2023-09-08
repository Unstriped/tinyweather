import React from "react";

interface WeatherBackgroundProps {
  imageLink: string;
}

/**
 * Displays the current weather as a background
 * Uses an gradient to keep the main title legible
 */
const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ imageLink }) => {
  return (
    <>
      <div
        className="absolute w-full h-full bg-repeat-space"
        style={{
          backgroundImage: `url(${imageLink})`,
        }}
      ></div>
      <div className="absolute w-full h-full bg-gradient-to-b from-base-100"></div>
    </>
  );
};

export default WeatherBackground;
