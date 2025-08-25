import { configureStore } from "@reduxjs/toolkit";
import { characterApi } from "../features/characters/characterApi";
import { countriesApi } from "../services/countriesApi";
import { commentsApi } from "../features/comments/commentsApi";

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
