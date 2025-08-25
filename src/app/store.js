import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../services/countriesApi";
import { characterApi } from "../services/characterApi";

import { commentsApi } from "../services/commentsApi";

export const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(characterApi.middleware)
      .concat(countriesApi.middleware)
      .concat(commentsApi.middleware),
});
