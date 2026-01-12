import { configureStore } from "@reduxjs/toolkit";
import { placesSliceReducer } from "./slices";

export const store = configureStore({
  reducer: {
    places: placesSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
