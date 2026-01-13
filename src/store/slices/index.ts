import { searchPlacePredictions } from "@store/thunks";
import { placesSliceReducer } from "./placesSlice";

export {
  clearError,
  clearPredictions,
  setSearchQuery,
  setSelectedPlace,
  setUseGoogleApi,
} from "./placesSlice";
export { placesSliceReducer, searchPlacePredictions };
