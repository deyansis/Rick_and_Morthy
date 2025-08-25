// src/services/countriesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1",
  }),
  endpoints: (builder) => ({
    getCountryByName: builder.query({
      query: (name) => `/name/${encodeURIComponent(name)}?fullText=true`,
    }),
  }),
});

export const { useGetCountryByNameQuery } = countriesApi;
