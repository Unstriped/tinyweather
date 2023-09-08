import React, { useContext } from "react";
import { Location } from "../types/location-types";
import { LocationContext } from "../context-provider";

const SaveLocation: React.FC = () => {
  const currentLocation = useContext<Location | undefined>(LocationContext);

  function saveAsFavourite() {
    if (!currentLocation) return;

    const locationString =
      currentLocation.name + ", " + currentLocation.country;

    let storedLocations = localStorage.storedLocations;
    if (storedLocations) {
      const storedLocationArray = JSON.parse(storedLocations);
      const hasLocationStored = storedLocationArray.some(
        (location: string) => location === locationString
      );
      if (!hasLocationStored) {
        storedLocationArray.push(locationString);
        localStorage.setItem(
          "storedLocations",
          JSON.stringify(storedLocationArray)
        );
        window.dispatchEvent(new Event("storage"));
      }
    } else {
      let locations = [locationString];
      localStorage.setItem("storedLocations", JSON.stringify(locations));
      window.dispatchEvent(new Event("storage"));
    }
  }
  return (
    <button
      type="button"
      className="btn btn-secondary btn-xs mt-1"
      aria-label="Save as Favourite"
      title="Save as Favourite"
      onClick={saveAsFavourite}
    >
      ★
    </button>
  );
};

export default SaveLocation;
