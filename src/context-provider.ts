import { createContext } from "react";
import { Location } from "./types/location-types";

export const LocationContext = createContext<Location | undefined>(undefined);
