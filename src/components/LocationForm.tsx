import React from "react";
import { useState, useEffect } from "react";

interface LocationInputProps {
  onInput(value: string | undefined): void;
  disabled: boolean;
  error: string | null;
}

// Input location and pass it to parent component thorugh onInput-function
const LocationInput: React.FC<LocationInputProps> = ({
  onInput,
  disabled,
  error,
}) => {
  const [inputText, setInputText] = useState("");
  const [favourites, setContent] = useState<string[]>([]);

  // Listen to storage events
  // Triggered everytime a user clicks the 'favourite-button' which updates the localStorage
  useEffect(() => {
    const handleStorageEvent = () => {
      let storedLocations = localStorage.storedLocations;
      if (storedLocations) {
        const storedLocationArray = JSON.parse(storedLocations);
        setContent(storedLocationArray);
      }
    };

    handleStorageEvent();

    window.addEventListener("storage", handleStorageEvent);
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  return (
    <>
      <form
        className="form-control"
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          onInput(inputText);
        }}
      >
        <label htmlFor="location" className="label">
          <span className="label-text">Enter a location</span>
        </label>
        <div className="join">
          <input
            id="location"
            autoFocus
            type="text"
            maxLength={50}
            className="input input-bordered w-full join-item"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={disabled}
            className="btn btn-primary join-item"
          >
            Go
          </button>
        </div>

        {error && (
          <p data-testid="error-msg" className="mx-4 mt-2 text-xs text-red-500">
            {error}
          </p>
        )}
      </form>
      {!!favourites.length && (
        // List all favourites if the user has any
        <ul className="flex gap-4 flex-wrap">
          {favourites.map((fav) => (
            <li key={fav}>
              <button
                type="button"
                className="btn btn-accent btn-sm whitespace-nowrap"
                onClick={() => onInput(fav)}
              >
                {fav} +
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LocationInput;
