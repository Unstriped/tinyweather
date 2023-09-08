// Used to communicate the location objects between components

import { createContext } from "react";
import { Location } from "./types/location-types";

export const LocationContext = createContext<Location | undefined>(undefined);
