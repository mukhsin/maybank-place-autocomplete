import { searchPlacePredictions } from "@store/thunks";
import { placesSliceReducer } from "./placesSlice";

export {
  clearError,
  clearPredictions,
  setSearchQuery,
  setSelectedPlace,
} from "./placesSlice";
export { placesSliceReducer, searchPlacePredictions };
