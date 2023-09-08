import React, { useContext } from "react";
import SaveLocation from "../components/SaveLocation";
import { Location } from "../types/location-types";
import { LocationContext } from "../context-provider";

const CurrentLocation: React.FC = () => {
  const currentLocation = useContext<Location | undefined>(LocationContext);
  if (!currentLocation) return;

  return (
    <div className="flex justify-between">
      <div className="mr-4">
        <h2 className="text-xl">
          {currentLocation.name}, {currentLocation.country}
        </h2>
        <p className="text-xs">{currentLocation.localtime}</p>
      </div>
      <SaveLocation />
    </div>
  );
};

export default CurrentLocation;
